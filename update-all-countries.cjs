const fs = require('fs');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchBatch(countriesBatch) {
  const prompt = `
당신은 지리 전문가입니다. 주어진 국가들의 지리, 인구, 기후 정보를 가장 정확하고 세밀하게 작성해주세요. (한국어로 작성)

다음 국가들의 리스트에 대해, 각 국가의 정보를 채운 JSON 배열을 반환하세요.
반환할 배열의 각 요소는 다음 키를 모두 포함해야 합니다:
- "name": (입력받은 국가명 그대로)
- "capital": 수도 이름 (한국어)
- "population": 인구수 (예: "약 3억 3,300만 명", "약 510만 명")
- "language": 공식 언어 (예: "영어", "스페인어")
- "climate": 기후 대분류 (예: "다양한 기후대", "해양성 기후", "열대 사바나 기후")
- "climateDesc": 기후 상세 설명 (1~2문장)
- "geoFeatures": 지리/지형적 대분류 또는 특징 (예: "로키 산맥과 대평원", "두 개의 큰 섬과 화산 지형")
- "specialFeature": 특별한 지리적/문화적 특징 (1~2문장)
- "latitude": 위도 상세 (예: "북위 24° ~ 49°", "남위 34° ~ 47°")
- "longitude": 경도 상세 (예: "서경 66° ~ 125°", "동경 166° ~ 178°")
- "elevation": 고도 정보 (예: "평균 해발고도 760m", "최고점 6,190m (데날리 산)")
- "geographicRegion": 지형학적 상세 분류 (예: "북아메리카 대륙", "오세아니아 폴리네시아", "카리브해 대앤틸리스 제도")
- "hemisphere": 반구 위치 (예: "북반구, 서반구", "남반구, 동반구")
- "majorLandforms": 대표 3대 지형물 배열 (예: ["로키 산맥", "미시시피 강", "그랜드 캐니언"])
- "naturalEnvironment": 상세 자연 생태계, 해안 지형 정보, 수계 정보 등 (1~2문장)
- "famousLandmarks": 대표 유명 관광지, 랜드마크, 지형 유산 배열 (3가지, 한국어)

요청 국가들:
${JSON.stringify(countriesBatch.map(c => ({ name: c.name, englishName: c.englishName })), null, 2)}

응답은 오직 올바른 JSON 배열([]) 형식이어야 합니다. 마크다운(\`\`\`json)은 제외하고 순수 JSON만 출력하세요.
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
  if (data.error) {
    throw new Error(data.error.message);
  }
  
  let text = data.candidates[0].content.parts[0].text;
  return JSON.parse(text);
}

async function main() {
  const dataStr = fs.readFileSync('src/data/countries.ts', 'utf8');
  const match = dataStr.match(/export const countriesData: Country\[\] = (\[[\s\S]*\]);/);
  const fn = new Function('return ' + match[1]);
  const countries = fn();

  const batchSize = 15;
  const totalBatches = Math.ceil(countries.length / batchSize);
  
  console.log(`Starting update for ${countries.length} countries in ${totalBatches} batches...`);
  
  let updatedData = {};

  for (let i = 0; i < totalBatches; i++) {
    const batch = countries.slice(i * batchSize, (i + 1) * batchSize);
    console.log(`Processing batch ${i + 1}/${totalBatches}...`);
    
    let retries = 3;
    while (retries > 0) {
      try {
        const result = await fetchBatch(batch);
        result.forEach(item => {
          updatedData[item.name] = item;
        });
        break;
      } catch (err) {
        console.error(`Batch ${i + 1} failed: ${err.message}. Retrying...`);
        retries--;
        await sleep(3000);
      }
    }
    await sleep(2000); // polite delay
  }

  // Merge updates
  countries.forEach(c => {
    const update = updatedData[c.name];
    if (update) {
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
  console.log("All countries updated successfully!");
}

main().catch(console.error);
