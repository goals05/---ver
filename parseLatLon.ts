export const parseLatLon = (latStr: string, lonStr: string): [number, number] => {
  let lat = 0;
  let lon = 0;
  
  if (!latStr || !lonStr) return [0, 0];
  
  const latMatch = latStr.match(/(북위|남위)\s*(\d+)°(?:\s*(\d+)')?/);
  if (latMatch) {
    const dir = latMatch[1];
    const deg = parseInt(latMatch[2], 10);
    const min = latMatch[3] ? parseInt(latMatch[3], 10) : 0;
    lat = deg + min / 60;
    if (dir === '남위') lat = -lat;
  }
  
  const lonMatch = lonStr.match(/(동경|서경)\s*(\d+)°(?:\s*(\d+)')?/);
  if (lonMatch) {
    const dir = lonMatch[1];
    const deg = parseInt(lonMatch[2], 10);
    const min = lonMatch[3] ? parseInt(lonMatch[3], 10) : 0;
    lon = deg + min / 60;
    if (dir === '서경') lon = -lon;
  }
  
  return [lon, lat];
};
