const fs = require('fs');

const file = 'src/data/countries.ts';
let content = fs.readFileSync(file, 'utf8');

// replace occurrences of "터키" in surroundingCountries and name
content = content.replace(/"터키"/g, '"튀르키예"');
content = content.replace(/"터키어"/g, '"튀르키예어"');

fs.writeFileSync(file, content, 'utf8');
console.log("Done");
