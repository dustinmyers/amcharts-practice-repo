// var chartData = [
//   {
//     "country": "USA",
//     "visits": 4252
//   }, {
//     "country": "China",
//     "visits": 1882
//   }, {
//     "country": "Japan",
//     "visits": 1809
//   }, {
//     "country": "Germany",
//     "visits": 1322
//   }, {
//     "country": "UK",
//     "visits": 1122
//   }, {
//     "country": "France",
//     "visits": 1114
//   }, {
//     "country": "India",
//     "visits": 984
//   }, {
//     "country": "Spain",
//     "visits": 711
//   }, {
//     "country": "Netherlands",
//     "visits": 665
//   }, {
//     "country": "Russia",
//     "visits": 580
//   }, {
//     "country": "South Korea",
//     "visits": 443
//   }, {
//     "country": "Canada",
//     "visits": 441
//   }, {
//     "country": "Brazil",
//     "visits": 395
//   }, {
//     "country": "Italy",
//     "visits": 386
//   }, {
//     "country": "Australia",
//     "visits": 384
//   }, {
//     "country": "Taiwan",
//     "visits": 338
//   }, {
//     "country": "Poland",
//     "visits": 328
//   }
// ];
var chartData = getChartData();

function getChartData() {
  var dataArray = [];
  var today = new Date();

  for ( var i = 0; i < 30; i++ ) {
    var dataObj = {};
    var visits;
    var hits;
    var views;

    var dateForGraph = new Date(new Date().setDate(today.getDate()-(30 - i)));
    visits = getRandomArbitrary(580, 640);
    hits = getRandomArbitrary(580, 640);
    views = getRandomArbitrary(580, 640);

    dataObj.date = dateForGraph;
    dataObj.visits = visits;
    dataObj.hits = hits;
    dataObj.views = views;

    dataArray.push(dataObj);
  }

  return dataArray;
}

function getRandomArbitrary(min, max) {
  var randomNum = Math.random() * (max - min) + min;
  return Math.round(randomNum);
}
// AmCharts.makeChart( 'chartdiv', {
//   'type': 'serial',
//   'dataProvider': chartData,
//   'categoryField': 'country',
//   'categoryAxis': {
//     'labelRotation': 90,
//   },
//   'graphs': [{
//     'valueField': 'visits',
//     'type': 'line',
//     'fillAlphas': 0,
//     'ballonText': '[[category]]: <b>[[value]]</b>',
//     'bullet': 'round',
//     'lineColor': '#8d1cc6'
//   }]
// });

AmCharts.ready(function() {
  var Amcharts = window.AmCharts;
  var chart = new Amcharts.AmSerialChart();
  chart.dataProvider = chartData;
  // chart.categoryAxis = categoryAxis;
  chart.categoryField = "date";
  chart.mouseWheelZoomEnabled = false;
  chart.marginTop = 10;
  chart.marginBottom = 0;
  chart.marginRight = 0;
  chart.marginLeft = 0;
  chart.autoMarginOffset = 0;

  var graph1 = new Amcharts.AmGraph();
  graph1.type = 'line';
  graph1.title = "Relationships";
  graph1.valueField = "visits";
  graph1.fillAlphas = 0.2;
  graph1.lineColor = "#7CAFD6";

  var graph2 = new Amcharts.AmGraph();
  graph2.type = 'line';
  graph2.title = "Profile";
  graph2.valueField = "views";
  graph2.fillAlphas = 0.2;
  graph2.lineColor = "#00B26A";

  var graph3 = new Amcharts.AmGraph();
  graph3.type = 'line';
  graph3.title = "Control";
  graph3.valueField = "hits";
  graph3.fillAlphas = 0.2;
  graph3.lineColor = "#2A5E89";

  var categoryAxis = chart.categoryAxis;
  categoryAxis.parseDates = true;
  categoryAxis.minPeriod = 'DD';
  categoryAxis.minorGridEnabled = true;
  categoryAxis.axisColor = "#DADADA";
  categoryAxis.twoLineMode = true;

  var valueAxis = chart.valueAxes;
  valueAxis.axisColor = "#DADADA";
  valueAxis.axisThickness = 2;
  valueAxis.minimum = 550;
  valueAxis.maximum = 700;

  var newValueAxis = new Amcharts.ValueAxis();
  newValueAxis.axisAlpha = 0.2;
  newValueAxis.dashLength = 1;
  newValueAxis.position = "left";
  chart.addValueAxis(newValueAxis);

  var chartCursor = new Amcharts.ChartCursor();
  chartCursor.cursorAlpha = 0.1;
  chartCursor.fullWidth = true;
  chartCursor.valueLineBalloonEnabled = true;
  // chartCursor.limitToGraph = graph;
  chartCursor.cursorPosition = "middle";
  chart.addChartCursor(chartCursor);

  var chartScrollBar = new Amcharts.ChartScrollbar();
  chartScrollBar.autoGridCount = true;
  // chartScrollBar.graph = graph;graph
  chartScrollBar.scrollbarHeight = 20;
  chart.addChartScrollbar(chartScrollBar);

  var legend = new Amcharts.AmLegend();
  legend.marginLeft = 110;
  legend.useGraphSettings = false;
  chart.addLegend(legend);

  chart.addGraph( graph1 );
  chart.addGraph( graph2 );
  chart.addGraph( graph3 );
  chart.addValueAxis(valueAxis);
  chart.write('chartdiv');
  chart.zoomToIndexes(20, 29);
});