import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const mouseUpReplacement = `  const handleMouseUp = () => {
    setIsDragging(false);
    // Wrap around for infinite scroll
    const mapCircumferenceScreen = 753.9822368615503 * scale;
    let newX = position.x;
    let wrapped = false;
    while (newX > mapCircumferenceScreen / 2) { newX -= mapCircumferenceScreen; wrapped = true; }
    while (newX < -mapCircumferenceScreen / 2) { newX += mapCircumferenceScreen; wrapped = true; }
    if (wrapped) setPosition(p => ({ ...p, x: newX }));
  };`;

content = content.replace(/  const handleMouseUp = \(\) => \{\n    setIsDragging\(false\);\n  \};/g, mouseUpReplacement);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Done replacing handleMouseUp');
