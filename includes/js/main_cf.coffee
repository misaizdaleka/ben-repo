jQuery(document).ready ($) ->
  monthPath = (t0) ->
    t1 = new Date(t0.getFullYear(), t0.getMonth() + 1, 0)
    d0 = +day(t0)
    w0 = +week(t0)
    d1 = +day(t1)
    w1 = +week(t1)
    "M" + (w0 + 1) * cellSize + "," + d0 * cellSize + "H" + w0 * cellSize + "V" + 7 * cellSize + "H" + w1 * cellSize + "V" + (d1 + 1) * cellSize + "H" + (w1 + 1) * cellSize + "V" + 0 + "H" + (w0 + 1) * cellSize + "Z"

  processTemplate = (template, params) ->
    template
          .replace(/{{opportunities}}/ig, params.opportunities)
          .replace(/{{tNum1}}/ig, params.tNum1)
          .replace(/{{tNum2}}/ig, params.tNum2)
          .replace(/{{tNum3}}/ig, params.tNum3)
          .replace(/{{eNum1}}/ig, params.eNum1)
          .replace(/{{eNum2}}/ig, params.eNum2)
          .replace(/{{eNum3}}/ig, params.eNum3)
         

  width       = 800
  height      = 136
  cellSize    = 15 # cell size
  cellPadding = 1.2
  day         = d3.time.format("%w")
  dayOfMonth  = d3.time.format("%d")
  week        = d3.time.format("%U")
  month       = d3.time.format("%b")
  percent     = d3.format(".1%")
  format      = d3.time.format("%Y-%m-%d")

  color = d3.scale.quantize().domain([0, 100]).range(d3.range(5).map((d) ->
    "q" + d + "-11"
  ))

  barData = [
    opportunities: 3
    tNum1: 50478
    tNum2: 15300
    tNum3: 5800
    eNum1: 10500
    eNum2: 55300
    eNum3: 4300
  ,
    opportunities: 5
    tNum1: 98675
    tNum2: 15300
    tNum3: 5800
    eNum1: 10500
    eNum2: 55300
    eNum3: 4300
  ,
    opportunities: 2
    tNum1: 17456
    tNum2: 15300
    tNum3: 5800
    eNum1: 10500
    eNum2: 55300
    eNum3: 4300
  ]

  barWidth = d3.scale.linear().domain([0, d3.sum(barData.map((d) ->
     d.tNum1))]).range([0, 100]);
  barClasses = d3.scale.quantize().domain([0, 2]).range(['success', 'warning', 'danger']);

  bars = d3.select('body>div.container')
           .insert("div", "body>div.main-container")
           .attr('class', 'progress progress-striped')

  bars.selectAll('div').data(barData)
          .enter()
          .append("div")
          .attr("class", (d,i) ->
            "row-fluid item bar bar-" + barClasses i
            )
          .style('width', (d,i) ->
              barWidth(d.tNum1) + "%"
          )
          .html((d,i) -> 
              processTemplate $("#barData").html(), barData[i]
          );

  svg = d3.select("body>div.main-container")
  			.append("svg")
  			.data(d3.range(2013, 2014))
  			.enter()
  			.append("svg")
  			.attr("width", width)
  			.attr("height", height)
  			.attr("class", "RdYlGn")
  			.append("g")
  			.attr("transform", "translate(" + ((width - cellSize * 53) / 2) + "," + (height - cellSize * 7 - 1) + ")")

  svg.append("text")
  	 .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
  	 .attr("class", "text-month").style("text-anchor", "middle")
  	 .text (d) -> d

  rect = svg.selectAll(".day").data((d) ->
		    d3.time.days new Date(d, 0, 1), new Date(d + 1, 0, 1)
		  )
		  .enter().append("rect").attr("class", (d, i) ->
		    "day " + color(bData[i].value)
		  )
		  .attr("width", cellSize - cellPadding * 2).attr("height", cellSize - cellPadding * 2).attr("x", (d) ->
		    week(d) * cellSize + cellPadding
		  )
		  .attr("y", (d) ->
		    day(d) * cellSize + cellPadding
		  )
		  .each((d) ->
		    if day(d) * cellSize is 0 and dayOfMonth(d) <= 7
		      svg.append("text").text(month(d)).attr("class", "text-month").attr("x", ->
		        week(d) * cellSize + 5
		      ).attr "y", -5
		  )
      .attr("data-title", (d, i) ->
        "Date: " + bData[i].date + "<br/> Percentage: " + bData[i].value
      )
		  .datum(format)

  $("div.main-container").append $("svg")

  $("rect.day").qtip
    content:
      text: (api) ->
        $(this).data("title")

    position:
      my: "bottom center"
      at: "top center"

    hide:
      fixed: false

    style: "qtip-dark custom-tooltip qtip-rounded"

