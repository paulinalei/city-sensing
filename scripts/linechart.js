var lineData = [
    {date: new Date(2012, 09, 22), ws: 85},
    {date: new Date(2012, 09, 23), ws: 85},
    {date: new Date(2012, 09, 24), ws: 115},
    {date: new Date(2012, 09, 25), ws: 105},
    {date: new Date(2012, 09, 26), ws: 80},
    {date: new Date(2012, 09, 27), ws: 75},
    {date: new Date(2012, 09, 28), ws: 77},
    {date: new Date(2012, 09, 29), ws: 90},
    {date: new Date(2012, 09, 30), ws: 72},
    {date: new Date(2012, 09, 31), ws: 70},
    {date: new Date(2012, 10, 01), ws: 65},
    {date: new Date(2012, 10, 02), ws: 64}
];

lineData.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
});

var height = 500;
var width = window.innerWidth/2 - 10;

var margin = {top: 10, right: 30, bottom: 25, left: 30};

width = width - margin.left - margin.right;
height = height - margin.top - margin.bottom;

var svg = d3.select('#linechart')
    .attr('width',  width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', "translate(" + margin.left + "," + margin.top + ")");

// set the ranges
var x = d3.scaleTime()
    .range([0, width]);
x.domain(d3.extent(lineData, function(d) { return d.date; }));

var y = d3.scaleLinear().range([height, 0]);

y.domain([d3.min(lineData, function(d) { return d.ws; }) - 5, 120]);

var valueline = d3.line()
    .x(function(d) { 
        return x(d.date); 
    })
    .y(function(d) { 
        return y(d.ws);  
    })
    .curve(d3.curveMonotoneX);

svg.append("path")
    .data([lineData]) 
    .attr("class", "line")  
    .attr("d", valueline); 

 var xAxis = d3.axisBottom(x)
    .tickFormat(d3.timeFormat("%m/%d/%Y"))
    .tickValues(lineData.map(d=>d.date));

svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

// uncomment to add y axis
svg.append("g")
    .call(d3.axisLeft(y));

svg.selectAll(".dot")
    .data(lineData)
    .enter()
    .append("circle") 
    .attr("class", "dot") 
    .attr("cx", function(d) { return x(d.date) })
    .attr("cy", function(d) { return y(d.ws) })
    .attr("r", 3);  

svg.selectAll(".text")
    .data(lineData)
    .enter()
    .append("text")
    .attr("class", "label")
    .attr("x", function(d, i) { return x(d.date) })
    .attr("y", function(d) { return y(d.ws) })
    .attr("dy", "-5")
    .text(function(d) {return d.ws; });