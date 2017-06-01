/**
 * Created by jaysonojeda on 2/1/17.
 */

function GradientUtil() {

    var self = this;

    // Sample the SVG path string "d" uniformly with the specified precision.
    self.sample = function (d, precision) {

        var path = document.createElementNS(d3.namespaces.svg, "path");

        path.setAttribute("d", d);

        var n = path.getTotalLength(),
            t = [0],
            i = 0,
            dt = precision;

        while ((i += dt) < n) {
            t.push(i);
        }

        t.push(n);

        return t.map(function (t) {

            var p = path.getPointAtLength(t),
                a = [p.x, p.y];

            a.t = t / n; // normalize by segment path length

            return a;
        });
    }

    // Compute quads of adjacent points [p0, p1, p2, p3].
    // WHAT ARE QUADS?
    // TODO: Document and fix me
    self.quad = function (points) {

        return d3.range(points.length - 1).map(function (i) {

            var a = [points[i - 1], points[i], points[i + 1], points[i + 2]];

            a.t = Math.log(points[i].t + points[i + 1].t) / Math.log(30);

            return a;
        });
    }

    // Compute stroke outline for segment p12.
    self.lineJoin = function (p0, p1, p2, p3, width) {

        var u12 = self.perp(p1, p2),
            r = width / 2,
            a = [p1[0] + u12[0] * r, p1[1] + u12[1] * r],
            b = [p2[0] + u12[0] * r, p2[1] + u12[1] * r],
            c = [p2[0] - u12[0] * r, p2[1] - u12[1] * r],
            d = [p1[0] - u12[0] * r, p1[1] - u12[1] * r];

        return "M" + a + "L" + b + " " + c + " " + d + "Z";
    }

    // Compute unit vector perpendicular to p01.
    self.perp = function (p0, p1) {

        var u01x = p0[1] - p1[1],
            u01y = p1[0] - p0[0],
            u01d = Math.sqrt(u01x * u01x + u01y * u01y);

        return [u01x / u01d, u01y / u01d];
    }
}
