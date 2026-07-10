import fs from 'fs';
let content = fs.readFileSync('src/App.tsx', 'utf-8');

const touchEventsReplacement = `  const [pinchStart, setPinchStart] = useState<{ dist: number, scale: number, pos: {x: number, y: number} } | null>(null);

  const getDistance = (touches: React.TouchList) => {
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const getCenter = (touches: React.TouchList) => {
    return {
      x: (touches[0].clientX + touches[1].clientX) / 2,
      y: (touches[0].clientY + touches[1].clientY) / 2,
    };
  };

  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setDragged(false);
      const touch = e.touches[0];
      setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
      setPinchStart(null);
    } else if (e.touches.length === 2) {
      setIsDragging(false);
      setDragged(true);
      setPinchStart({
        dist: getDistance(e.touches),
        scale: scale,
        pos: { ...position }
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 1 && isDragging) {
      const touch = e.touches[0];
      const newX = touch.clientX - dragStart.x;
      const newY = touch.clientY - dragStart.y;
      
      const dx = newX - position.x;
      const dy = newY - position.y;
      if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
        setDragged(true);
      }
      setPosition({ x: newX, y: newY });
    } else if (e.touches.length === 2 && pinchStart) {
      e.preventDefault(); // Prevent page scroll while zooming
      const currentDist = getDistance(e.touches);
      const center = getCenter(e.touches);
      
      const zoomFactor = currentDist / pinchStart.dist;
      let newScale = pinchStart.scale * zoomFactor;
      newScale = Math.min(Math.max(newScale, 0.6), 5); // clamp

      const svgRect = e.currentTarget.getBoundingClientRect();
      const mouseX = center.x - svgRect.left;
      const mouseY = center.y - svgRect.top;

      const dx = mouseX - pinchStart.pos.x;
      const dy = mouseY - pinchStart.pos.y;
      
      setPosition({
        x: mouseX - dx * (newScale / pinchStart.scale),
        y: mouseY - dy * (newScale / pinchStart.scale)
      });
      setScale(newScale);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setPinchStart(null);
    
    // Wrap around for infinite scroll
    const mapCircumferenceScreen = 753.9822368615503 * scale;
    let newX = position.x;
    let wrapped = false;
    while (newX > mapCircumferenceScreen / 2) { newX -= mapCircumferenceScreen; wrapped = true; }
    while (newX < -mapCircumferenceScreen / 2) { newX += mapCircumferenceScreen; wrapped = true; }
    if (wrapped) setPosition(p => ({ ...p, x: newX }));
  };`;

// replace handleTouchStart to handleTouchEnd
content = content.replace(/  const handleTouchStart = [\s\S]*?  const handleTouchEnd = \(\) => \{\n    setIsDragging\(false\);\n  \};/g, touchEventsReplacement);

fs.writeFileSync('src/App.tsx', content, 'utf-8');
console.log('Done replacing touch events');
