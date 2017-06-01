/**
 * Created by jaysonojeda on 2/2/17.
 */


function ProgressCircle() {

    var self = this;

    self.gradientUtil = new GradientUtil();

    self.initProgressCircle = function (containerId, percent) {

        var percent = percent ? percent : 1;

        var parent = document.getElementById(containerId);
        var width = parent.offsetWidth;
        var height = parent.offsetHeight;

        var innerRadius = 90;
        var outerRadius = 85;

        var container = d3.select(parent);
        var svgContainer = container.select('svg');

        var tau = 2 * Math.PI; // http://tauday.com/tau-manifesto

        var arc = d3.arc()
            .innerRadius(Math.floor(innerRadius))
            .outerRadius(Math.floor(outerRadius))
            .startAngle(0);

        var g = svgContainer
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        g.selectAll("*").remove();

        var background = g.append("path")
            .datum({endAngle: tau})
            .style("fill", "#f6f6f6")
            .attr("d", arc);

        var points = self.computePoints(percent);

        var range = d3.scaleLinear()
            .domain([0, 1.2])
            .range(
                []
                    .concat(this.createDuplicateColors("#9F2064", 10))
                    .concat(this.createDuplicateColors("#1476BB", 5))
                    .concat(this.createDuplicateColors("#41A8C6", 5))
                    .concat(this.createDuplicateColors("#3F9D48", 1))
                    .concat(this.createDuplicateColors("#C1D62E", 1))
                    .concat(this.createDuplicateColors("#BDC631", 1))
                    .concat(this.createDuplicateColors("#FADF06", 1))
                    .concat(this.createDuplicateColors("#BDC631", 1))
                    .concat(this.createDuplicateColors("#C1D62E", 1))
                    .concat(this.createDuplicateColors("#3F9D48", 1))
                    .concat(this.createDuplicateColors("#41A8C6", 5))
                    .concat(this.createDuplicateColors("#1476BB", 5))
            );

        var color = d3.interpolateRgbBasis(range.range());

        // var color = d3.interpolateRainbow;

        var line = d3.line().curve(d3.curveBasis);

        var sample = this.gradientUtil.sample(line(points), 5);
        var data = this.gradientUtil.quad(sample);

        var foreground = g.selectAll("path")
            .data(data)
            .enter()
            .append("path")
            .style("fill", function (d) {

                return color(d.t + 0.5);
            })
            .style("stroke", function (d) {
                return color(d.t + 0.5);
            })
            .attr("d", function (d) {
                return self.gradientUtil.lineJoin(d[0], d[1], d[2], d[3], 3);
            });

        return {
            arc: arc,
            foreground: foreground,
            background: background
        }
    };

    self.createDuplicateColors = function(color, count) {

        var list = [];

        for(var i = 0; i < count; i++) {
            list.push(color);
        }

        return list;
    };

    self.computePoints = function(percent) {

        var centerX = 0;
        var centerY = 0;
        var radius = 88;
        var segments = 360;

        var points = new Array();

        for (var i = 0; i < segments; i++) {

            var x = centerX + radius * Math.cos(i * 2 * Math.PI * percent / segments - Math.PI / 2);
            var y = centerY + radius * Math.sin(i * 2 * Math.PI * percent / segments - Math.PI / 2);

            points.push([x, y]);
        }

        return points;
    }
}