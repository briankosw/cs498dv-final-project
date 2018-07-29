var marg = {
    t: 30,
    r: 250,
    b: 40,
    l: 100
};
var wid = 1100 - marg.l - marg.r;
var hei = 450 - marg.t - marg.b;

var svg3 = d3.select(".slide3")
    .append("svg")
    .attr("width", wid + marg.l + marg.r)
    .attr("height", hei + marg.t + marg.b)
    .append("g")
    .attr("transform", "translate(" + marg.l + "," + marg.t + ")");

var xscale = d3.scaleLinear()
    .domain([0, 1.9])
    .range([0, wid]);

var yscale = d3.scaleLinear()
    .range([hei, 0]);

var radius = d3.scaleSqrt()
    .range([2, 8]);

var xAxis = d3.axisBottom()
    .tickSize(-hei)
    .scale(xscale);

var yAxis = d3.axisLeft()
    .tickSize(-wid)
    .scale(yscale)

var color1 = d3.scaleOrdinal(d3.schemeCategory20);

var tip3 = d3.tip()
            .attr("class", "d3-tip")
            .offset([-10, 30])
            .html(function(d) {
                console.log(d);
                return "<strong>Country: </strong>" + d.Country +
                       "<br><strong>Region: </strong>" + d.Region +
                       "<br><strong>Happiness Score: </strong>" + d.HappinessScore +
                       "<br><strong>Economy: </strong>" + d.Economy;
            });

svg.call(tip3);

d3.csv("data/2015.csv", function(error, data) {
    data.forEach(function(d) {
        d.y = +d.HappinessScore
        d.x = +d.Economy;
        console.log(+d.Economy);
        d.r = +d.Economy;
    });

    data.sort(function(a, b) {
        return b.r - a.r;
    });

    yscale.domain(d3.extent(data, function(d) {
        return d.y;
    })).nice();

    radius.domain(d3.extent(data, function(d) {
        return d.r;
    })).nice();

    svg3.append("g")
        .attr("transform", "translate(0," + hei + ")")
        .attr("class", "x axis")
        .call(xAxis);

    svg3.append("g")
        .attr("transform", "translate(0,0)")
        .attr("class", "y axis")
        .call(yAxis);

    svg3.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - 50)
        .attr("x",0 - (height / 2))
        .attr("dy", "1em")
        .style("text-anchor", "middle")
        .text("Happiness Score");   

    svg3.append("text")             
      .attr("x", wid/2 - 20)
      .attr("y", hei + 35)
      .style("text-anchor", "middle")
      .text("GDP per Capita scaled");

    svg3.append("text")             
      .attr("x", wid + 100)
      .attr("y", hei/2 + 35)
      .style("text-anchor", "middle")
      .text("Hover over the legend!");

    var group = svg3.selectAll("g.bubble")
        .data(data)
        .enter().append("g")
        .attr("class", "bubble")
        .attr("transform", function(d) {
            return "translate(" + xscale(d.x) + "," + yscale(d.y) + ")"
        });

    group
        .append("circle")
        .attr("r", 9)
        .style("fill", function(d) {
            return color1(d.Region);
        }).on("mouseover", tip3.show)
        .on("mouseout", tip3.hide);

    var legend1 = svg3.selectAll(".legend")
        .data(color1.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function(d, i) {
            return "translate(2," + i * 14 + ")";
        });

    legend1.append("rect")
        .attr("x", wid + 8)
        .attr("width", 12)
        .attr("height", 12)
        .style("fill", color1);

    legend1.append("text")
        .attr("x", wid + 24)
        .attr("y", 6)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(function(d) {
            return d;
        });

    legend1.on("mouseover", function(type) {
            d3.selectAll(".legend")
                .style("opacity", 0.1);
            d3.select(this)
                .style("opacity", 1);
            d3.selectAll(".bubble")
                .style("opacity", 0.1)
                .filter(function(d) {
                    return d.Region == type;
                })
                .style("opacity", 1);
        })
        .on("mouseout", function(type) {
            d3.selectAll(".legend")
                .style("opacity", 1);
            d3.selectAll(".bubble")
                .style("opacity", 1);
        });
});