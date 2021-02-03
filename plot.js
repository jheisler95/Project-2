// Chart Params
var svgWidth = 960;
var svgHeight = 500;

var margin = { top: 20, right: 40, bottom: 60, left: 50 };

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Import data from an external CSV file
d3.api("TSLA.csv").then(function(stockData) {
  console.log(stockData);
  console.log([stockData]);

  // Create a function to parse date and time
  var parseTime = d3.timeParse("%d-%b-%Y");

  // Format the data
  stockData.forEach(function(data) {
    data.Date = parseTime(data.Date);
    data.Close = +data.Close;
  });

  // Create scaling functions
  var xTimeScale = d3.scaleTime()
    .domain(d3.extent(stockData, d => d.Date))
    .range([0, width]);

  var yStockScale = d3.scaleLinear()
    .domain([0, d3.max(stockData, d => d.Close)])
    .range([height, 0]);

  //var yChargerScale = d3.scaleLinear()  NEED CHARGER DATA HERE
    //.domain([0, d3.max(stockData, d => d.stock_sightings)])
    //.range([height, 0]);

  // Create axis functions
  var bottomAxis = d3.axisBottom(xTimeScale)
    .tickFormat(d3.timeFormat("%d-%b-%Y"));
  var leftAxis = d3.axisLeft(yStockScale);
  var rightAxis = d3.axisRight(yChargerScale);

  // Add x-axis
  chartGroup.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(bottomAxis);

  // Add y1-axis to the left side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("green", true)
    .call(leftAxis);

  // Add y2-axis to the right side of the display
  chartGroup.append("g")
    // Define the color of the axis text
    .classed("blue", true)
    .attr("transform", `translate(${width}, 0)`)
    .call(rightAxis);

  // Line generators for each line
  var line1 = d3.line()
    .x(d => xTimeScale(d.Date))
    .y(d => yLinearScale1(d.Close));

  var line2 = d3.line()
    .x(d => xTimeScale(d.Date))
    .y(d => yLinearScale2(d.Chargers));

  // Append a path for line1
  chartGroup.append("path")
    .data([stockData])
    .attr("d", line1)
    .classed("line green", true);

  // Append a path for line2
  chartGroup.append("path")
    .data([stockData])
    .attr("d", line2)
    .classed("line blue", true);

  // Append axes titles
  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 20})`)
    .classed("dow-text text", true)
    .text("Stock Price (usd)");

  chartGroup.append("text")
  .attr("transform", `translate(${width / 2}, ${height + margin.top + 37})`)
    .classed("smurf-text text", true)
    .text("Number of Supercharging Stations");
}).catch(function(error) {
  console.log(error);
});
