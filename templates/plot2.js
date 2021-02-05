var margin = {top: 30, right: 40, bottom: 30, left: 50},
    width = 600 - margin.left - margin.right,
    height = 270 - margin.top - margin.bottom;

var parseDate = d3.time.format("%d-%b-%y").parse;

var x = d3.time.scale().range([0, width]);
var y0 = d3.scale.linear().range([height, 0]);
var y1 = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
    .orient("bottom").ticks(12);

var yAxisLeft = d3.svg.axis().scale(y0)
    .orient("left").ticks(8);

var yAxisRight = d3.svg.axis().scale(y1)
    .orient("right").ticks(8); 

var valueline = d3.svg.line()
    .x(function(stock) { return x(stock.date); })
    .y(function(stock) { return y0(stock.close); });
    
var valueline2 = d3.svg.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.open); });
  
var svg = d3.select("body")
    .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
    .append("g")
        .attr("transform", 
              "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("clean_stock_data.csv", function(error, data) {
    data.forEach(function(stock) {
        stock.date = parseDate(stock.date);
        stock.close = +stock.close;
        
});

d3.csv("clean_charger_data.csv", function(error, data) {
    data.forEach(function(charge) {
        charge.date = parseDate(charge.date);
        charge.index = +charge.index;
    });

    // Scale the range of the data
    x.domain(d3.extent(data, function(stock) { return stock.date; }));
    y0.domain([0, d3.max(data, function(stock) {
		return Math.max(stock.close); })]); 
    y1.domain([0, d3.max(data, function(charger) { 
		return Math.max(charger.scale); })]);
    
    // Add the valueline path.
    svg.append("path")        
        .attr("d", valueline(data));

    // Add the valueline2 path.    
    svg.append("path")        
        .style("stroke", "red")
        .attr("d", valueline2(data));
    
    // Add the X Axis
    svg.append("g")            
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .style("fill", "steelblue")
        .call(yAxisLeft);	

    svg.append("g")				
        .attr("class", "y axis")	
        .attr("transform", "translate(" + width + " ,0)")	
        .style("fill", "red")		
        .call(yAxisRight);

});