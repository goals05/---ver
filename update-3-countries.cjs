const fs = require('fs');

async function main() {
  const dataStr = fs.readFileSync('src/data/countries.ts', 'utf8');
  const match = dataStr.match(/export const countriesData: Country\[\] = (\[[\s\S]*\]);/);
  const fn = new Function('return ' + match[1]);
  const countries = fn();

  const targetNames = ['미국', '뉴질랜드', '쿠바'];
  const targets = countries.filter(c => targetNames.includes(c.name));

  const prompt = `
당신은 최고의 지리 전문가입니다. 주어진 국가들의 상세 정보를 한국어로 작성하여 JSON 배열로 반환하세요.
반환할 배열의 요소는 다음 키를 모두 포함해야 합니다:
- "name": 입력받은 국가명 그대로
- "continent": 대륙 ('유럽', '아프리카', '아시아', '북아메리카', '남아메리카', '오세아니아' 중 하나)
- "capital": 수도 (한국어)
- "population": 인구수 (예: "약 3억 3,900만 명")
- "language": 공식 언어 (한국어)
- "climate": 기후 대분류 (예: "열대 사바나 기후")
- "climateDesc": 기후 상세 설명 (2문장 이내)
- "geoFeatures": 지형적 대분류 (예: "로키 산맥과 넓은 대평원")
- "specialFeature": 특별한 지리적/문화적 특징 (2문장 이내)
- "latitude": 위도 상세 (예: "북위 38° 53'")
- "longitude": 경도 상세 (예: "서경 77° 01'")
- "elevation": 고도 정보 (예: "평균 해발고도 760m")
- "geographicRegion": 지형학적 상세 분류 (예: "북아메리카", "서유럽", "카리브해 섬나라")
- "hemisphere": 반구 위치 (예: "북반구, 서반구")
- "majorLandforms": 대표 3대 지형물 배열 (3개 문자열 요소)
- "naturalEnvironment": 상세 자연 생태계, 해안 지형 정보, 수계 정보 (1~2문장)
- "famousLandmarks": 대표 유명 관광지, 랜드마크, 지형 유산 배열 (3개 문자열 요소)

요청 국가들:
${JSON.stringify(targets.map(c => ({ name: c.name, englishName: c.englishName })), null, 2)}

응답은 오직 올바른 JSON 배열([]) 형식이어야 합니다. 마크다운 제외.
`;

  const url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY;
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { 
        responseMimeType: "application/json",
        temperature: 0.1
      }
    })
  });
  
  const data = await response.json();
  let text = data.candidates[0].content.parts[0].text;
  let updatedData = JSON.parse(text);

  let updatedMap = {};
  updatedData.forEach(item => { updatedMap[item.name] = item; });

  countries.forEach(c => {
    const update = updatedMap[c.name];
    if (update) {
      c.continent = update.continent || c.continent;
      c.capital = update.capital || c.capital;
      c.population = update.population || c.population;
      c.language = update.language || c.language;
      c.climate = update.climate || c.climate;
      c.climateDesc = update.climateDesc || c.climateDesc;
      c.geoFeatures = update.geoFeatures || c.geoFeatures;
      c.specialFeature = update.specialFeature || c.specialFeature;
      c.latitude = update.latitude || c.latitude;
      c.longitude = update.longitude || c.longitude;
      c.elevation = update.elevation || c.elevation;
      c.geographicRegion = update.geographicRegion || c.geographicRegion;
      c.hemisphere = update.hemisphere || c.hemisphere;
      c.majorLandforms = update.majorLandforms || c.majorLandforms;
      c.naturalEnvironment = update.naturalEnvironment || c.naturalEnvironment;
      c.famousLandmarks = update.famousLandmarks || c.famousLandmarks;
    }
  });

  const splitIndex = dataStr.indexOf('export const countriesData: Country[] =');
  const firstPart = dataStr.substring(0, splitIndex);
  const newFile = firstPart + 'export const countriesData: Country[] = ' + JSON.stringify(countries, null, 2) + ';\n';
  fs.writeFileSync('src/data/countries.ts', newFile);
  console.log("Updated target countries successfully!");
}

main().catch(console.error);
