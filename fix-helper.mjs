import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const helperCorrect = `
  const getProjectedCoords = (country: Country) => {
    if (!country) return [0, 0];
    const [lon, lat] = parseLatLon(country.latitude, country.longitude);
    let [cx, cy] = projection([lon, lat]) || [0, 0];
    if (cx === 0 && cy === 0) {
      cx = country.mapCoords.x;
      cy = country.mapCoords.y;
    }
    return [cx, cy];
  };
`;

content = content.replace(/  const getProjectedCoords = \(country: Country\) => \{\n    const \[cx, cy\] = getProjectedCoords\(country\);\n    return \[cx, cy\];\n  \};/, helperCorrect);

// I also noticed:
// const [viewMode, setViewMode] = useState<'home' | 'map'>('home');| 'map'>('home');
content = content.replace(/const \[viewMode, setViewMode\] = useState<'home' \| 'map'>\('home'\);\| 'map'>\('home'\);/, "const [viewMode, setViewMode] = useState<'home' | 'map'>('home');");

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Fixed helper function');
