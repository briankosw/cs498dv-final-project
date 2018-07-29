var format = d3.format(",");

// Set tooltips
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([100, 0])
            .html(function(d) {
            return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Happiness Score: </strong><span class='details'>" + format(d.HappinessScore) +"</span>";
            });

var margin = {top: 0, right: 0, bottom: 0, left: 0},
        width = 1000 - margin.left - margin.right,
        height = 430 - margin.top - margin.bottom;

var projection = d3.geoMercator()
                    .scale(130)
                    .translate([width/2, height/1.5]);

var path = d3.geoPath().projection(projection);

var svg = d3.select(".slide1")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g");

var color = d3.scalePow()
    .domain([2, 8])
    .range(["white", "#bc2a66"]);

function get_map(val) {
    if(val == "2015") {
        document.getElementById("maptitle").innerHTML="2015 Happiness Score in Countries";
        queue()
            .defer(d3.json, "data/world_countries.json")
            .defer(d3.csv, "data/2015.csv")
            .await(ready);
    } else if(val == "2016") {
        document.getElementById("maptitle").innerHTML="2016 Happiness Score in Countries";
        queue()
            .defer(d3.json, "data/world_countries.json")
            .defer(d3.csv, "data/2016.csv")
            .await(ready);
    } else if(val == "2017") {
        document.getElementById("maptitle").innerHTML="2017 Happiness Score in Countries";
        queue()
            .defer(d3.json, "data/world_countries.json")
            .defer(d3.csv, "data/2017.csv")
            .await(ready);
    }
}

function ready(error, countries, data) {
    var happinessById = {};
    data.forEach(function(d) { happinessById[d.id] = +d.HappinessScore; });
    countries.features.forEach(function(d) { d.HappinessScore = happinessById[d.id] });

    svg.call(tip);

    d3.select("g")
      .selectAll("path")
      .remove();

    var appending = svg.selectAll("g")
                       .attr("class", "countries")
                         .data(countries.features)
                       .enter().append("path")
                         .attr("d", path)
                         .style("fill", function(d) { return color(happinessById[d.id]); })
                        .style('stroke', 'white')
                        .style('stroke-width', 1.5)
                        .style("opacity",0.8)
                        // tooltips
                            .style("stroke","white")
                            .style('stroke-width', 0.3)
                            .on('mouseover',function(d){
                            tip.show(d);

                            d3.select(this)
                                .style("opacity", 1)
                                .style("stroke","white")
                                .style("stroke-width",3);
                            })
                            .on('mouseout', function(d){
                            tip.hide(d);

                            d3.select(this)
                                .style("opacity", 0.8)
                                .style("stroke","white")
                                .style("stroke-width",0.3);
                            });
    appending.append("path")
      .datum(topojson.mesh(countries.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);
};

function init(error, countries, data) {
    var happinessById = {};
    data.forEach(function(d) { happinessById[d.id] = +d.HappinessScore; });
    countries.features.forEach(function(d) { d.HappinessScore = happinessById[d.id] });

    svg.call(tip);

    d3.select("g")
      .selectAll("path")
      .remove();

    var appending = svg.selectAll("g")
                       .attr("class", "countries")
                         .data(countries.features)
                       .enter().append("path")
                         .attr("d", path)
                         .style("fill", function(d) { return color(happinessById[d.id]); })
                        .style('stroke', 'white')
                        .style('stroke-width', 1.5)
                        .style("opacity",0.8)
                        // tooltips
                            .style("stroke","white")
                            .style('stroke-width', 0.3)
                            .on('mouseover',function(d){
                            tip.show(d);

                            d3.select(this)
                                .style("opacity", 1)
                                .style("stroke","white")
                                .style("stroke-width",3);
                            })
                            .on('mouseout', function(d){
                            tip.hide(d);

                            d3.select(this)
                                .style("opacity", 0.8)
                                .style("stroke","white")
                                .style("stroke-width",0.3);
                            });
    appending.append("path")
      .datum(topojson.mesh(countries.features, function(a, b) { return a.id !== b.id; }))
       // .datum(topojson.mesh(data.features, function(a, b) { return a !== b; }))
      .attr("class", "names")
      .attr("d", path);

    
    var w = 140, h = 300;

    var key = d3.select(".slide1")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .attr("class", "legend");

    var legend = key.append("defs")
        .append("svg:linearGradient")
        .attr("id", "gradient")
        .attr("x1", "100%")
        .attr("y1", "0%")
        .attr("x2", "100%")
        .attr("y2", "100%")
        .attr("spreadMethod", "pad");

    legend.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", "#bc2a66")
        .attr("stop-opacity", 1);
        
    legend.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", "white")
        .attr("stop-opacity", 1);

    key.append("rect")
        .attr("width", w - 100)
        .attr("height", h)
        .style("fill", "url(#gradient)")
        .attr("transform", "translate(0,10)");

    var y = d3.scaleLinear()
        .range([h, 0])
        .domain([2, 8]);

    var yAxis = d3.axisRight(y);

    key.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(41,10)")
        .call(yAxis)
};

queue()
.defer(d3.json, "data/world_countries.json")
.defer(d3.csv, "data/2015.csv")
.await(init);