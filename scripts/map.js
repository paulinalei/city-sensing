var height = 850;
var width = 960;
var margin = {top: 150, right: 25, bottom: 25, left: 30};

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var tooltip = d3.select("body").append("div").attr("class", "toolTip");
var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])    // translate to center of screen
    .scale([1000]);
var path = d3.geoPath().projection(projection);
active = d3.select(null);
var svg = d3.select('#map')
    .attr('width',  width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g');


d3.json("data-processing/us-states.json").then(function(us) {

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", 605)
        .attr("fill","white")
        .on("click", reset);

    var g = svg.append("g")
        .style("stroke-width", "1.5px");


    g.append("g")
        .attr("class", "states")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.states).features)
        .enter().append("path")
        .attr("d", path)
        .attr("fill","grey")
        .on("click", clicked);


    g.append("path")
        .attr("class", "state-borders")
        .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));

    function drawMap(twtData){
        g.selectAll("circle").remove();
        g.selectAll("circle")
            .data(twtData)
            .enter()
            .each( function(d, i) {
                if(projection([d.lon, d.lat]) != null){
                    count ++;
                    d3.select(this)
                        .append("circle")
                        .attr("cx", function (d) {
                            return projection([d.lon, d.lat])[0];
                        })
                        .attr("cy", function (d) {
                            return projection([d.lon, d.lat])[1];
                        })
                        .attr("r", "3px")
                        .attr("fill", "#ff140a")
                        .on("mousemove", function(d) {
                            tooltip
                                .style("left", d3.event.pageX - 20 + "px")
                                .style("top", d3.event.pageY + 30 + "px")
                                .style("display", "inline-block")
                                .style("background", "rgba(0, 0, 0, 0.8)")
                                .style("color", "white")
                                .html("@" + d.preferredUsername + ": " + d.body);
                        })
                        .on("mouseout", function(d) {
                            tooltip.style("display", "none");
                        })
                }
            });


    }

    var tweetset;
    d3.csv('data-processing/1pSample.csv').then(function (tweets) {
        tweetset = tweets;
        var parseDate = d3.timeParse("%m-%d %H:%M");
        var hourFormat = d3.timeFormat("")
        count = 0;
        tweets.sort(function(a,b){
            var dateA = new Date(a.postedTime), dateB = new Date(b.postedTime);
            return dateB - dateA;
        });
        tweets.forEach(function(datum) {

            datum.lat = +datum.lat;
            datum.lon = +datum.lon;

        });
        drawMap(tweets);
        // d3.select("body").append("svg")
        //     .attr("width", 900)
        //     .attr("height", 500)
        //     .attr("id", "wordcloud")
        //     .attr("transform", "translate(0,-750)")
        //     .append("g")
        //     .attr("transform", "translate(50,0)")

        // wordCloud(tweets);
        plotSlider();
    });
    function clicked(d) {
        if (active.node() === this) return reset();
        active.classed("active", false);
        active = d3.select(this).classed("active", true);

        var bounds = path.bounds(d),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = .9 / Math.max(dx / width, dy / height),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

        g.transition()
            .duration(750)
            .style("stroke-width", 1.5 / scale + "px")
            .attr("transform", "translate(" + translate + ")scale(" + scale + ")");
        //this will move the markers
        g.selectAll("circle")
            .attr("r", "0.5px");
    }
    function reset() {
        active.classed("active", false);
        active = d3.select(null);

        g.transition()
            .duration(750)
            .style("stroke-width", "1.5px")
            .attr("transform", "");
        g.selectAll("circle")
            .attr("r", "3px");
    }


    function plotSlider(){
    var formatDateIntoYear = d3.timeFormat("%m/%d/%Y");
    var formatDate = d3.timeFormat("%H:00");

    var startDate = new Date("2012-10-25T00:00:00.000Z"),
        endDate = new Date("2012-11-05T23:59:00.000Z");

    // var margin = {top:50, right:50, bottom:0, left:50};
        // width = 960 - margin.left - margin.right,
        // height = 500 - margin.top - margin.bottom;

    var svg = d3.select("#map");
        // .append("svg")
        // .attr("width", width + margin.left + margin.right)
        // .attr("height", height + margin.top + margin.bottom);

////////// slider //////////

    var moving = false;
    var currentValue = 0;
    var targetValue = width;

    // var playButton = d3.select("#play-button");


    var x = d3.scaleTime()
        .domain([startDate, endDate])
        .range([0, targetValue-20])
        .clamp(true);

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + 50 + "," + 650 + ")");

    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[1])
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
        .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
                currentValue = d3.event.x;
                update(x.invert(currentValue));
            })
        );

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
        .selectAll("text")
        .data(x.ticks(10))
        .enter()
        .append("text")
        .attr("x", x)
        .attr("y", 10)
        .attr("text-anchor", "middle")
        .attr("class", "map-dates")
        .text(function(d) { return formatDateIntoYear(d); });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    var label = slider.append("text")
        .attr("class", "label")
        .attr("text-anchor", "middle")
        .text(formatDate(startDate))
        .attr("transform", "translate(0," + (-25) + ")");

    var playbutton = svg.append("g")
        .attr("id", "playButton")
        .attr("transform", "translate(" + 50 + "," + 700 + ")");

    playbutton.append("rect")
        .attr("id", "button")
        .attr("width","60")
        .attr("height","30")
        .attr("x", 0)
        .attr("y", 0)
        .attr("cursor","pointer")
        .attr("fill", "#f08080");

    playbutton.append("text")
        .attr("id", "btnText")
        .attr("x", 15)
        .attr("y", 20)
        .attr("cursor","pointer")
        .attr("font-size","12")
        .attr("fill", "white")
        .text("PLAY");

    playbutton
        .on("click", function(d) {
            d3.select("#button")
                .attr("fill", "#356944")
        });


    //plot map
    var dataset;

    var plot = svg.append("g")
        .attr("class", "plot")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    playbutton
            .on("click", function() {
                var button = d3.select(this);
                if (d3.select("#btnText").text() == "PAUSE") {
                    moving = false;
                    clearInterval(timer);
                    // timer = 0;
                    d3.select("#btnText").text("PLAY");
                } else {
                    moving = true;
                    timer = setInterval(step, 100);
                    d3.select("#btnText").text("PAUSE");
                }
            })


    function step() {
        update(x.invert(currentValue));
        currentValue = currentValue + (targetValue/151);
        if (currentValue > targetValue) {
            moving = false;
            currentValue = 0;
            clearInterval(timer);
            // timer = 0;
            d3.select("#btnText").text("PLAY");
        }
    }

    function update(h) {
        // update position and text of label according to slider scale
        handle.attr("cx", x(h));
        label
            .attr("x", x(h))
            .text(formatDate(h));

        // filter data set and redraw plot
        var newData = tweetset.filter(function(d) {
            var check = new Date(d.postedTime);
            return  check < h;
        })

        drawMap(newData);
        //use wordcloud every 10 sets to avoid clustering.

        if (newData.length > 10 && (newData.length+10) % 20 == 0){
            wordCloud(newData);
        }
    }
}

    function wordCloud(tweetBody){
        var frequency_list =[];
        text = "";
        var length = tweetBody.length < 10 ? tweetBody.length : 10;
        for(i = 0; i< length; i++){
            text += tweetBody[i].body;
        }
        var innerArray = nlp(text).nouns().out('text');

        var fq = nlp(innerArray).ngrams().unigrams().list
        if(fq.length == 0)
            return;

        var length = fq.length < 10 ? fq.length : 10;
        for(i = 0; i < length; i++){
            frequency_list.push(fq[i].key)
        }

        d3.select("#map")
            .selectAll("nothing")
            .data(frequency_list)
            .enter()
            .append("text")
            .attr("class", "cloud-text")
            .style("font-size", 40)
            .style("fill", "black")
            .attr("id", function(d, i){
                return "cloud" + i;
            })
            .attr("transform", function(d, i) {
                return "translate(-300, " + 40*(i+1) + ")";
            })
            .transition()
            .duration(function(d,i){return 200*(Math.floor(Math.random()*70) + 70);})
            .attr("transform", function(d, i) {
                return "translate(1200, " + 40*(i+1) + ")";
            })
            .text(function(d, i) { return frequency_list[i]; });

    }
});