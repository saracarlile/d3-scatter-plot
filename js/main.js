(() => {

    var width = 900;
    var height = 538;
    var margin = { top: 25, bottom: 25, left: 35, right: 25 };


    fetch("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json")
        .then(function (response) {
            return response.json();
        })
        .then(function (dataset) {
            const data = dataset;
            console.log(data)

            // parse the data.Year
            var parseYear = d3.timeParse("%Y");

            // parse the data.Time
            var parseTime = d3.timeParse("%M:%S");

            // set the ranges
            var x = d3.scaleTime().range([margin.left, width - margin.right]);
            var y = d3.scaleTime().range([height - margin.bottom, margin.top]);

            // grab SVG element on index.html
            var svg = d3.select('svg');


            data.forEach(d => {
                d.Year = parseYear(d.Year);
                d.Time = parseTime(d.Time);
            });

            var maxY = d3.max(data, function (d) { return d.Time });
            var minY = d3.min(data, function (d) { return d.Time });


            // Scale the range of the data
            x.domain(d3.extent(data, function (d) { return d.Year; }));
            y.domain([maxY, minY]);

            // Define the div for the tooltip
            var div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


            var formatYear = d3.timeFormat("%Y");
            var formatTime = d3.timeFormat("%M:%S");

            // Add the scatterplot
            svg.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 5)
                .attr("cx", function (d) { return x(d.Year); })
                .attr("cy", function (d) { return y(d.Time); })
                // add this attribute to change the color of the rect
                .attr("fill", function (d) {
                    if (d["Doping"].length > 2) {
                        return "red";
                    }
                })
                .attr("data-doping", function (d) {
                    return d.Doping;
                })
                .on("mouseover", function (d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html(formatTime(d.Time) + "<br/>" + formatYear(d.Year))
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function (d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                });




            // Add the X Axis
            svg.append("g")
                .attr('transform', 'translate(' + [0, 513] + ')')
                .call(d3.axisBottom(x));

            //add the Y Axis

            var yScale = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.Time; }))
                // .range([height - margin.bottom, margin.top]);
                .range([margin.top, height - margin.bottom]);

            var yAxis = d3.axisLeft()
                .scale(yScale)
                .tickFormat(d3.timeFormat('%M:%S'));


            svg.append('g')
                .attr('transform', 'translate(' + [margin.left, 0] + ')')
                .call(yAxis);




        });




})();

//http://blockbuilder.org/rentzso/e98b3d5afdc34970d6298d491066adfe example using

//http://blockbuilder.org/sxywu/909992222842cdbda009006e456a23b0

//front-end masters code


///working and passing tests  https://codepen.io/HIC/pen/NLLmPp

//tooltips http://bl.ocks.org/d3noob/a22c42db65eb00d4e369