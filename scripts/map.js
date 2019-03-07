var height = 700;
var width = 960;

var margin = {top: 150, right: 25, bottom: 25, left: 30};

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var projection = d3.geoAlbersUsa()
    .translate([width/2, height/2])    // translate to center of screen
    .scale([1000]);
var path = d3.geoPath().projection(projection);
active = d3.select(null);
var svg = d3.select('#map')
    .attr('width',  width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', "translate(" + margin.left + "," + margin.top + ")");


d3.json("data-processing/us-states.json").then(function(us) {

    svg.append("rect")
        .attr("class", "background")
        .attr("width", width)
        .attr("height", height)
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

    d3.csv('data-processing/1pSample.csv').then(function (tweets) {
        count = 0;
        tweets.forEach(function(datum) {

            datum.lat = +datum.lat;
            datum.lon = +datum.lon;

        });
        g.selectAll("circle")
            .data(tweets)
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
                }
        });
        console.log("count: ", count);

    });
    function clicked(d) {
        console.log("clicked");
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
            .attr("r", "1px");
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
});