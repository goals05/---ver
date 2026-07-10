import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// In useEffect
content = content.replace(/const cx = selectedCountry\.mapCoords\.x;\n\s*const cy = selectedCountry\.mapCoords\.y;/, 'const [cx, cy] = getProjectedCoords(selectedCountry);');

// In selectedCountry ring
content = content.replace(/cx=\{selectedCountry\.mapCoords\.x\}/g, 'cx={getProjectedCoords(selectedCountry)[0]}');
content = content.replace(/cy=\{selectedCountry\.mapCoords\.y\}/g, 'cy={getProjectedCoords(selectedCountry)[1]}');

// In selectedCountry label transform
content = content.replace(/translate\(\$\{selectedCountry\.mapCoords\.x\}, \$\{selectedCountry\.mapCoords\.y \+ 26\}\)/g, 'translate(${getProjectedCoords(selectedCountry)[0]}, ${getProjectedCoords(selectedCountry)[1] + 26})');

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Fixed remaining mapCoords');
