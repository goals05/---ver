import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const helperStr = `
  const getProjectedCoords = (country: Country) => {
    const [lon, lat] = parseLatLon(country.latitude, country.longitude);
    let [cx, cy] = projection([lon, lat]) || [0, 0];
    if (cx === 0 && cy === 0) {
      cx = country.mapCoords.x;
      cy = country.mapCoords.y;
    }
    return [cx, cy];
  };
`;

content = content.replace(/const \[viewMode, setViewMode\] = useState<'home' | 'map'>\('home'\);/, helperStr + "\n  const [viewMode, setViewMode] = useState<'home' | 'map'>('home');");

// Now update the selectedCountry crosshairs:
content = content.replace(/x1="0"[\s\S]*?y1=\{selectedCountry\.mapCoords\.y\}/g, (match) => {
  return match.replace(/y1=\{selectedCountry\.mapCoords\.y\}/, 'y1={getProjectedCoords(selectedCountry)[1]}');
});
content = content.replace(/x2="754"[\s\S]*?y2=\{selectedCountry\.mapCoords\.y\}/g, (match) => {
  return match.replace(/y2=\{selectedCountry\.mapCoords\.y\}/, 'y2={getProjectedCoords(selectedCountry)[1]}');
});
content = content.replace(/x1=\{selectedCountry\.mapCoords\.x\}/g, 'x1={getProjectedCoords(selectedCountry)[0]}');
content = content.replace(/x2=\{selectedCountry\.mapCoords\.x\}/g, 'x2={getProjectedCoords(selectedCountry)[0]}');

// Update surrounding countries lines
content = content.replace(/x1=\{c\.mapCoords\.x\}[\s\S]*?y1=\{c\.mapCoords\.y\}[\s\S]*?x2=\{neigh\.mapCoords\.x\}[\s\S]*?y2=\{neigh\.mapCoords\.y\}/g, `x1={getProjectedCoords(c)[0]}
                            y1={getProjectedCoords(c)[1]}
                            x2={getProjectedCoords(neigh)[0]}
                            y2={getProjectedCoords(neigh)[1]}`);

// Update nodes map
content = content.replace(/const \[lon, lat\] = parseLatLon[\s\S]*?if \(cx === 0 && cy === 0\) \{[\s\S]*?cx = country\.mapCoords\.x;[\s\S]*?cy = country\.mapCoords\.y;[\s\S]*?\}/g, 'const [cx, cy] = getProjectedCoords(country);');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Fixed node coordinates!');
