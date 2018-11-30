(() => {

    var width = 900;
    var height = 700;
    var margin = { top: 35, bottom: 35, left: 35, right: 35 };


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

            // Scale the range of the data
            x.domain(d3.extent(data, function (d) { return d.Year; }));
            y.domain(d3.extent(data, function (d) { return d.Time; }));


            // Add the scatterplot
            svg.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 5)
                .attr("cx", function (d) { return x(d.Year); })
                .attr("cy", function (d) { return y(d.Time); });



            // Add the X Axis
            svg.append("g")
            .attr('transform', 'translate(' + [0, 482] + ')')
                .call(d3.axisBottom(x));

            //add the Y Axis

            var yScale = d3.scaleTime()
                .domain(d3.extent(data, function (d) { return d.Time; }))
                .range([height - margin.bottom, margin.top]);

            var yAxis = d3.axisLeft()
                .scale(yScale)
                .tickFormat(d3.timeFormat('%M:%S'));


            svg.append('g')
                .attr('transform', 'translate(' + [margin.left, 0] + ')')
                .call(yAxis);



            /*  for (var i = 0; i < data.length; i++) {
                  let time = data[i]["Time"];
                  var format = d3.timeFormat("%M:%S");
                  console.log(format(time));
              }

            // scales

            var xExtent = d3.extent(data, d => d.Year);
            var xScale = d3.scaleTime()
                .domain(xExtent)
                .range([margin.left, width - margin.right]);

            var yExtent = d3.extent(data => d.Time);
            var yScale = d3.scaleTime()
                .domain(yExtent)
                .range([height - margin.bottom, margin.top]);

            // create the circles
            var svg = d3.select('svg');

            svg.selectAll(".dot")
                .data(data)
                .enter().append("circle")
                .attr("class", "dot")
                .attr("r", 5)
                .attr("cx", function (d) { return xScale(d.Year); })
                .attr("cy", function (d) { return yScale(d.Time); })
                .attr('fill', 'blue')
                .attr('stroke', 'white');


                  */




        });




})();

//http://blockbuilder.org/rentzso/e98b3d5afdc34970d6298d491066adfe example using

//http://blockbuilder.org/sxywu/909992222842cdbda009006e456a23b0

//front-end masters code


///working and passing tests  https://codepen.io/HIC/pen/NLLmPp