import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

// Find the start of the <svg ...> up to </svg>
const svgStartIdx = content.indexOf('{/* SVG Map Canvas */}');
const svgEndIdx = content.indexOf('</svg>', svgStartIdx) + 6;

const beforeSvg = content.slice(0, svgStartIdx);
const afterSvg = content.slice(svgEndIdx);

// We will keep the SVG attributes and the root group
const originalSvgText = content.slice(svgStartIdx, svgEndIdx);
const gRootStartIdx = originalSvgText.indexOf('<g transform={`translate(${position.x}, ${position.y}) scale(${scale})`}>');
const gRootEndIdx = originalSvgText.lastIndexOf('</g>');

const svgOpen = originalSvgText.slice(0, gRootStartIdx + '<g transform={`translate(${position.x}, ${position.y}) scale(${scale})`}>'.length);
const svgClose = originalSvgText.slice(gRootEndIdx);

const gInterior = originalSvgText.slice(gRootStartIdx + '<g transform={`translate(${position.x}, ${position.y}) scale(${scale})`}>'.length, gRootEndIdx);

const newGInterior = `
                    {(() => {
                      const mapCircumference = 753.9822368615503;
                      const mapCircumferenceScreen = mapCircumference * scale;
                      const centerK = Math.floor(-position.x / mapCircumferenceScreen);
                      const visibleKs = [centerK - 1, centerK, centerK + 1, centerK + 2];
                      return visibleKs.map(k => (
                        <g key={k} transform={\`translate(\${k * mapCircumference}, 0)\`}>
                          ${gInterior.replace(/x1="20"([\s\S]*?)x2="780"/g, 'x1="0"$1x2="754"')}
                        </g>
                      ));
                    })()}
`;

fs.writeFileSync('src/App.tsx', beforeSvg + svgOpen + newGInterior + svgClose + afterSvg, 'utf-8');
console.log('Done rewriting SVG map canvas');
