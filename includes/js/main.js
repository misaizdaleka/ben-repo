var graph = {
  day : null,
  dayOfMonth : null,
  week : null,
  month : null,
  percent : null,
  format : null,
  cellSize: null,

  init: function() 
  {
    var width = 960,
    height = 136;

    var _this = this;

    this.day        = d3.time.format("%w"),
    this.dayOfMonth = d3.time.format("%d")
    this.week       = d3.time.format("%U"),
    this.month      = d3.time.format("%b"),
    this.percent    = d3.format(".1%"),
    this.format     = d3.time.format("%Y-%m-%d");

    var color = d3.scale.quantize()
        .domain([0, 100])
        .range(d3.range(5).map(function(d) { return "q" + d + "-11"; }));

    var svg = d3.select("body>div.main-container").selectAll('svg')
        .data(d3.range(2013, 2014))
      .enter().append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "RdYlGn")
      .append("g")
        .attr("transform", "translate(" + ((width - _this.cellSize * 53) / 2) + "," + (height - _this.cellSize * 7 - 1) + ")");

        console.log(svg);

    svg.append("text")
        .attr("transform", "translate(-6," + _this.cellSize * 3.5 + ")rotate(-90)")
        .style("text-anchor", "middle")
        .text(function(d) { return d; });

    var rect = svg.selectAll(".day")
        .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
        .enter().append("rect")
        .attr("class", function(d, i) {
              return "day "+color(bData[i].value);
            })
        .attr("width", _this.cellSize)
        .attr("height", _this.cellSize)
        .attr("x", function(d) { return _this.week(d) * _this.cellSize; })
        .attr("y", function(d) { return _this.day(d) * _this.cellSize; })
        .each(function(d) {
           if (_this.day(d)*_this.cellSize == 0 && _this.dayOfMonth(d)<=7) {
              svg.append("text")
                  .text(_this.month(d))
                  .attr("x", function() {
                    return _this.week(d) * _this.cellSize + 5;
                  })
                  .attr("y", -5);
           }
        })
        .datum(_this.format);


      rect.append("title")
        .text(function(d, i) { return d+", "+bData[i].value; });

     /* svg.selectAll(".month")
        .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
       .enter().append("path")
        .attr("class", "month")
        .attr("d", _this.monthPath);*/

  },

  monthPath: function(t0)
  {
    var _this = this;

    console.log(this.day);

     var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
          d0 = _this.day(t0), w0 = _this.week(t0),
          d1 = _this.day(t1), w1 = _this.week(t1);
      return "M" + (w0 + 1) * _this.cellSize + "," + d0 * _this.cellSize
          + "H" + w0 * _this.cellSize + "V" + 7 * _this.cellSize
          + "H" + w1 * _this.cellSize + "V" + (d1 + 1) * _this.cellSize
          + "H" + (w1 + 1) * _this.cellSize + "V" + 0
          + "H" + (w0 + 1) * _this.cellSize + "Z";
  }
}

jQuery(document).ready(function($) {
  graph.init();
});
