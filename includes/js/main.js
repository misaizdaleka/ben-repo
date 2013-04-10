
jQuery(document).ready(function($) {
  function monthPath(t0) {
    var t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0),
        d0 = +day(t0), w0 = +week(t0),
        d1 = +day(t1), w1 = +week(t1);
    return "M" + (w0 + 1) * cellSize + "," + d0 * cellSize
        + "H" + w0 * cellSize + "V" + 7 * cellSize
        + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize
        + "H" + (w1 + 1) * cellSize + "V" + 0
        + "H" + (w0 + 1) * cellSize + "Z";
  }

  var width = 800,
      height = 136,
      cellSize = 15; // cell size
      cellPadding = 1.2;

  var day = d3.time.format("%w"),
      dayOfMonth = d3.time.format("%d")
      week = d3.time.format("%U"),
      month = d3.time.format("%b"),
      percent = d3.format(".1%"),
      format = d3.time.format("%Y-%m-%d");

  var color = d3.scale.quantize()
      .domain([0, 100])
      .range(d3.range(5).map(function(d) { return "q" + d + "-11"; }));

  var svg = d3.select("body>div.main-container").append("svg")
      .data(d3.range(2013, 2014))
    .enter().append("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("class", "RdYlGn")
    .append("g")
      .attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")");

  svg.append("text")
      .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
      .attr('class', 'text-month')
      .style("text-anchor", "middle")
      .text(function(d) { return d; });

  var rect = svg.selectAll(".day")
      .data(function(d) { return d3.time.days(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
      .enter().append("rect")
      .attr("class", function(d, i) {
            return "day "+color(bData[i].value);
          })
      .attr("width", cellSize-cellPadding*2)
      .attr("height", cellSize-cellPadding*2)
      .attr("x", function(d) { return week(d) * cellSize + cellPadding; })
      .attr("y", function(d) { return day(d) * cellSize + cellPadding; })
      .each(function(d) {
         if (day(d)*cellSize == 0 && dayOfMonth(d)<=7) {
            svg.append("text")
                .text(month(d))
                .attr('class', 'text-month')
                .attr("x", function() {
                  return week(d) * cellSize + 5;
                })
                .attr("y", -5);
         }
      })
      .datum(format);


    rect.append("title")
      .text(function(d, i) { return "Date: "+ d+"<br/> Percentage: "+bData[i].value; });

    /*svg.selectAll(".month")
      .data(function(d) { return d3.time.months(new Date(d, 0, 1), new Date(d + 1, 0, 1)); })
     .enter().append("path")
      .attr("class", "month")
      .attr("d", monthPath);*/

    $("div.main-container").append($('svg'));
    // $("rect.day").qtip();

    $("rect.day").qtip({
          content: {
        text: function(api) {
          return $(this).children('title').text();
        }
      },
          position: {
              my: 'bottom center',
              at: 'top center'
          },
          // hide: false,
          hide: {
              fixed: false
          },
          style: 'qtip-dark custom-tooltip qtip-rounded'
      }).qtip('hide').queue(function(){ $(this).qtip('destroy') });

});



