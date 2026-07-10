const fs = require('fs');
const data = fs.readFileSync('src/data/countries.ts', 'utf8');
const match = data.match(/export const countriesData: Country\[\] = (\[[\s\S]*\]);/);
const fn = new Function('return ' + match[1]);
const countries = fn();
console.log(Object.keys(countries[0]));
