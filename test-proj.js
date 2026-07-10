const { geoMercator } = require('d3-geo');
const proj = geoMercator().scale(120).translate([400, 355]);
console.log(proj([180, 0])[0] - proj([-180, 0])[0]);
