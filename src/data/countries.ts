export interface Country {
  id: string;
  name: string;
  englishName: string;
  continent: '유럽' | '아프리카' | '아시아' | '북아메리카' | '남아메리카' | '오세아니아';
  capital: string;
  population: string;
  language: string;
  flag: string;
  isoCode?: string;
  climate: string;
  climateDesc: string;
  geoFeatures: string;
  specialFeature: string;
  surroundingCountries: string[];
  mapCoords: { x: number; y: number };
  
  // 지리학 전문 속성 (안전정보 대체)
  latitude: string;       // 위도 구체 정보 (예: 북위 55° 22')
  longitude: string;      // 경도 구체 정보 (예: 서경 3° 26')
  elevation: string;      // 고도 정보 (평균 및 최고 고도)
  geographicRegion: string; // 지형학적 상세 분류 (예: 서유럽 섬나라)
  hemisphere: string;     // 적도/본초자오선 기준 반구 위치
  majorLandforms: string[]; // 대표적인 3대 지형물

  // 실시간 지리 교육 필수 항목 (자연 환경 & 유명 관광지/지리 유산)
  naturalEnvironment: string; // 상세 자연 생태계, 기후, 수계 정보
  famousLandmarks: string[]; // 대표 유명 관광지, 랜드마크, 지형 유산 3가지
}

export const countriesData: Country[] = [
  {
    "id": "uk",
    "name": "영국",
    "englishName": "United Kingdom",
    "continent": "유럽",
    "capital": "런던",
    "population": "약 6,700만 명",
    "language": "영어",
    "flag": "🇬🇧",
    "climate": "서안 해양성 기후",
    "climateDesc": "멕시코 만류의 영향으로 위도에 비해 겨울이 온화하고 여름이 서늘합니다. 연중 강수량이 고르게 분포하며 흐리고 비가 오는 날이 많습니다.",
    "geoFeatures": "그레이트브리튼섬의 구릉지와 스코틀랜드의 산악 지대",
    "specialFeature": "그리니치 천문대를 기준으로 본초 자오선이 통과하는 지리적 기준점입니다. 섬나라로서 독자적인 해양 문화를 발전시켰으며 산업 혁명의 발상지이기도 합니다.",
    "surroundingCountries": [
      "아일랜드",
      "프랑스"
    ],
    "mapCoords": {
      "x": 260,
      "y": 150
    },
    "latitude": "북위 51° 30'",
    "longitude": "서경 0° 07'",
    "elevation": "평균 해발고도 162m",
    "geographicRegion": "서유럽",
    "hemisphere": "북반구, 동반구 및 서반구",
    "majorLandforms": [
      "벤네비스산",
      "템스강",
      "로크 네스"
    ],
    "naturalEnvironment": "복잡한 해안선과 수많은 섬으로 이루어져 있으며, 템스강과 세번강 등 풍부한 수계를 가지고 있습니다. 온대 낙엽수림과 초지가 넓게 분포합니다.",
    "famousLandmarks": [
      "스톤헨지",
      "빅벤",
      "자이언트 코즈웨이"
    ],
    "isoCode": "gb"
  },
  {
    "id": "france",
    "name": "프랑스",
    "englishName": "France",
    "continent": "유럽",
    "capital": "파리",
    "population": "약 6,800만 명",
    "language": "프랑스어",
    "flag": "🇫🇷",
    "climate": "서안 해양성, 지중해성, 대륙성 기후",
    "climateDesc": "서부는 온화한 해양성 기후를 보이나 동부는 대륙성 기후로 겨울이 춥습니다. 남부 지중해 연안은 여름이 덥고 건조하며 겨울이 온화합니다.",
    "geoFeatures": "북부와 서부의 평원 및 남부와 동부의 높은 산맥",
    "specialFeature": "유럽 영토 중 영토 모양이 육각형에 가까워 '헥사곤'이라 불립니다. 농업과 공업이 균형 있게 발달한 서유럽의 중심국입니다.",
    "surroundingCountries": [
      "영국",
      "벨기에",
      "독일",
      "스위스",
      "이탈리아",
      "스페인"
    ],
    "mapCoords": {
      "x": 290,
      "y": 220
    },
    "latitude": "북위 48° 51'",
    "longitude": "동경 2° 21'",
    "elevation": "평균 해발고도 375m",
    "geographicRegion": "서유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "몽블랑산",
      "센강",
      "중앙고원"
    ],
    "naturalEnvironment": "대서양과 지중해에 면해 있어 다양한 해안 지형을 가지며, 센강과 루아르강이 비옥한 평야를 흐릅니다. 알프스와 피레네 산맥이 국경을 이룹니다.",
    "famousLandmarks": [
      "에펠탑",
      "몽생미셸",
      "베르사유 궁전"
    ],
    "isoCode": "fr"
  },
  {
    "id": "germany",
    "name": "독일",
    "englishName": "Germany",
    "continent": "유럽",
    "capital": "베를린",
    "population": "약 8,400만 명",
    "language": "독일어",
    "flag": "🇩🇪",
    "climate": "온대 대륙성 및 서안 해양성 기후",
    "climateDesc": "북부는 해양성 기후의 영향으로 비교적 온화하나, 남부로 갈수록 대륙성 기후가 강해져 겨울이 춥고 눈이 많이 내립니다. 연중 강수량이 비교적 고르게 분포합니다.",
    "geoFeatures": "북부 평원, 중부 구릉지, 남부 알프스 산악 지대",
    "specialFeature": "유럽의 중심부에 위치하여 수많은 이웃 나라와 국경을 접하고 있는 교통의 요충지입니다. 라인강을 중심으로 한 수운 교통과 공업이 매우 발달했습니다.",
    "surroundingCountries": [
      "덴마크",
      "폴란드",
      "체코",
      "오스트리아",
      "스위스",
      "프랑스",
      "룩셈부르크",
      "벨기에",
      "네덜란드"
    ],
    "mapCoords": {
      "x": 360,
      "y": 200
    },
    "latitude": "북위 52° 31'",
    "longitude": "동경 13° 24'",
    "elevation": "평균 해발고도 263m",
    "geographicRegion": "중부 유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "추크슈피체산",
      "라인강",
      "검은 숲(슈바르츠발트)"
    ],
    "naturalEnvironment": "북해와 발트해에 면한 북부 평야에서 남부 알프스로 고도가 높아지는 지형입니다. 라인강, 다뉴브강, 엘베강 등 대규모 수계가 발달해 있습니다.",
    "famousLandmarks": [
      "노이슈반슈타인 성",
      "브란덴부르크 문",
      "쾰른 대성당"
    ],
    "isoCode": "de"
  },
  {
    "id": "italy",
    "name": "이탈리아",
    "englishName": "Italy",
    "continent": "유럽",
    "capital": "로마",
    "population": "약 5,900만 명",
    "language": "이탈리아어",
    "flag": "🇮🇹",
    "climate": "지중해성 기후",
    "climateDesc": "여름은 고온 건조하고 겨울은 온화하고 다습한 전형적인 지중해성 기후를 보입니다. 북부 알프스 지역은 고산 기후가 나타납니다.",
    "geoFeatures": "장화 모양의 반도와 알프스 및 아펜니노 산맥",
    "specialFeature": "지중해 중앙에 위치하여 고대 로마 제국과 르네상스의 발상지가 되었습니다. 국토 내에 바티칸 시국과 산마리노라는 독립국을 품고 있습니다.",
    "surroundingCountries": [
      "프랑스",
      "스위스",
      "오스트리아",
      "슬로베니아"
    ],
    "mapCoords": {
      "x": 390,
      "y": 260
    },
    "latitude": "북위 41° 54'",
    "longitude": "동경 12° 29'",
    "elevation": "평균 해발고도 538m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "에트나 화산",
      "포강 평원",
      "아펜니노 산맥"
    ],
    "naturalEnvironment": "삼면이 지중해로 둘러싸인 반도국으로, 화산 활동이 활발하며 포강이 흐르는 북부 평야가 가장 비옥합니다. 해안선이 길고 복잡합니다.",
    "famousLandmarks": [
      "콜로세움",
      "피사의 사탑",
      "폼페이 유적지"
    ],
    "isoCode": "it"
  },
  {
    "id": "spain",
    "name": "스페인",
    "englishName": "Spain",
    "continent": "유럽",
    "capital": "마드리드",
    "population": "약 4,800만 명",
    "language": "스페인어",
    "flag": "🇪🇸",
    "climate": "지중해성 및 대륙성 기후",
    "climateDesc": "대부분 지역이 건조하고 온화한 지중해성 기후를 보이나, 내륙 고원 지대는 일교차가 큰 대륙성 기후를 나타냅니다. 북서부 지역은 비가 자주 내리는 해양성 기후입니다.",
    "geoFeatures": "메세타 고원과 피레네 산맥",
    "specialFeature": "이베리아반도의 대부분을 차지하며, 이슬람 문화와 기독교 문화가 융합된 독특한 문화적 유산을 보유하고 있습니다. 유럽에서 평균 고도가 두 번째로 높은 고원 국가입니다.",
    "surroundingCountries": [
      "포르투갈",
      "프랑스",
      "안도라",
      "모로코"
    ],
    "mapCoords": {
      "x": 220,
      "y": 270
    },
    "latitude": "북위 40° 25'",
    "longitude": "서경 3° 41'",
    "elevation": "평균 해발고도 660m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "테이데산",
      "타호강",
      "피레네 산맥"
    ],
    "naturalEnvironment": "중앙의 넓은 메세타 고원을 산맥들이 둘러싸고 있으며, 타호강과 에브로강이 흐릅니다. 남부와 동부는 지중해, 북서부는 대서양과 접해 다양한 해안 생태계를 이룹니다.",
    "famousLandmarks": [
      "사그라다 파밀리아 성당",
      "알함브라 궁전",
      "구엘 공원"
    ],
    "isoCode": "es"
  },
  {
    "id": "greece",
    "name": "그리스",
    "englishName": "Greece",
    "continent": "유럽",
    "capital": "아테네",
    "population": "약 1,040만 명",
    "language": "그리스어",
    "flag": "🇬🇷",
    "climate": "지중해성 기후",
    "climateDesc": "여름은 매우 덥고 건조하며 햇빛이 강하고, 겨울은 온화하며 비가 자주 내립니다. 산악 지대에는 겨울에 눈이 내리기도 합니다.",
    "geoFeatures": "수많은 섬과 반도, 그리고 험준한 산악 지형",
    "specialFeature": "유럽 문명의 발상지이자 민주주의의 고향으로, 수천 개의 섬이 지중해에 흩어져 있습니다. 국토의 약 80%가 산지로 이루어져 있어 평야가 적습니다.",
    "surroundingCountries": [
      "알바니아",
      "북마케도니아",
      "불가리아",
      "터키"
    ],
    "mapCoords": {
      "x": 450,
      "y": 280
    },
    "latitude": "북위 37° 58'",
    "longitude": "동경 23° 43'",
    "elevation": "평균 해발고도 498m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "올림포스산",
      "핀도스 산맥",
      "에게해"
    ],
    "naturalEnvironment": "에게해, 이오니아해, 지중해에 둘러싸여 있으며 세계에서 가장 긴 해안선 중 하나를 가집니다. 석회암 지형이 발달하여 카르스트 지형과 동굴이 많습니다.",
    "famousLandmarks": [
      "파르테논 신전",
      "산토리니 섬",
      "메테오라 수도원"
    ],
    "isoCode": "gr"
  },
  {
    "id": "norway",
    "name": "노르웨이",
    "englishName": "Norway",
    "continent": "유럽",
    "capital": "오슬로",
    "population": "약 550만 명",
    "language": "노르웨이어",
    "flag": "🇳🇴",
    "climate": "아한대 및 서안 해양성 기후",
    "climateDesc": "고위도에 위치하지만 따뜻한 북대서양 해류 덕분에 서해안은 겨울에도 얼지 않고 온화합니다. 내륙과 북부 지역은 겨울이 매우 길고 춥습니다.",
    "geoFeatures": "빙하 침식으로 형성된 피오르 해안과 스칸디나비아 산맥",
    "specialFeature": "세계에서 가장 복잡하고 아름다운 피오르 해안선을 자랑하며, 북극권에 속해 백야와 오로라 현상을 관찰할 수 있습니다. 풍부한 수자원과 석유 자원을 보유한 자원 부국입니다.",
    "surroundingCountries": [
      "스웨덴",
      "핀란드",
      "러시아"
    ],
    "mapCoords": {
      "x": 380,
      "y": 80
    },
    "latitude": "북위 59° 55'",
    "longitude": "동경 10° 45'",
    "elevation": "평균 해발고도 460m",
    "geographicRegion": "북유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "갈회피겐산",
      "송네 피오르",
      "스칸디나비아 산맥"
    ],
    "naturalEnvironment": "빙하가 깎아 만든 깊은 골짜기와 피오르가 발달해 있으며, 수많은 호수와 폭포가 있습니다. 침엽수림이 울창하며 북부에는 툰드라 지대가 나타납니다.",
    "famousLandmarks": [
      "송네 피오르",
      "게이랑에르 피오르",
      "프레이케스톨렌"
    ],
    "isoCode": "no"
  },
  {
    "id": "switzerland",
    "name": "스위스",
    "englishName": "Switzerland",
    "continent": "유럽",
    "capital": "베른",
    "population": "약 890만 명",
    "language": "독일어, 프랑스어, 이탈리아어, 로만슈어",
    "flag": "🇨🇭",
    "climate": "고산 기후 및 온대 대륙성 기후",
    "climateDesc": "고도에 따라 기후 변화가 심하며, 알프스 산맥 지역은 연중 눈과 빙하를 볼 수 있는 고산 기후를 나타냅니다. 평지 지대는 온화한 대륙성 기후를 보입니다.",
    "geoFeatures": "알프스 산맥과 쥐라 산맥, 그리고 중부 고원",
    "specialFeature": "국토의 대부분이 알프스 산맥에 걸쳐 있는 대표적인 산악 국가이자 영구 중립국입니다. 시계 제조 등 정밀 산업과 금융업, 관광업이 고도로 발달했습니다.",
    "surroundingCountries": [
      "독일",
      "프랑스",
      "이탈리아",
      "오스트리아",
      "리히텐슈타인"
    ],
    "mapCoords": {
      "x": 350,
      "y": 240
    },
    "latitude": "북위 46° 57'",
    "longitude": "동경 7° 26'",
    "elevation": "평균 해발고도 1,350m",
    "geographicRegion": "중부 유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "마터호른산",
      "레만호",
      "라인 폭포"
    ],
    "naturalEnvironment": "바다가 없는 내륙국이지만 알프스 빙하에서 발원한 라인강, 론강 등 유럽 주요 하천의 시발점입니다. 수많은 아름다운 빙하호와 침엽수림이 어우러져 있습니다.",
    "famousLandmarks": [
      "융프라우",
      "마터호른",
      "샤토 드 시옹"
    ],
    "isoCode": "ch"
  },
  {
    "id": "finland",
    "name": "핀란드",
    "englishName": "Finland",
    "continent": "유럽",
    "capital": "헬싱키",
    "population": "약 560만 명",
    "language": "핀란드어, 스웨덴어",
    "flag": "🇫🇮",
    "climate": "냉대 습윤 기후",
    "climateDesc": "겨울이 길고 매우 추우며 눈이 많이 내리고, 여름은 짧지만 비교적 따뜻하고 쾌적합니다. 북대서양 해류와 발트해의 영향으로 동위도의 다른 지역보다는 온화합니다.",
    "geoFeatures": "빙하가 남긴 수많은 호수와 평탄한 구릉지",
    "specialFeature": "약 18만 개가 넘는 호수가 있어 '호수의 나라'로 불리며, 사우나 문화의 발상지입니다. 국토의 70% 이상이 숲으로 덮여 있는 친환경 국가입니다.",
    "surroundingCountries": [
      "노르웨이",
      "스웨덴",
      "러시아"
    ],
    "mapCoords": {
      "x": 430,
      "y": 90
    },
    "latitude": "북위 60° 10'",
    "longitude": "동경 24° 56'",
    "elevation": "평균 해발고도 152m",
    "geographicRegion": "북유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "할티아산",
      "사이마호",
      "발트해"
    ],
    "naturalEnvironment": "빙하 침식으로 형성된 평탄한 지형에 수많은 호수와 늪지대가 분포합니다. 타이가라 불리는 울창한 침엽수림이 국토 전역을 뒤덮고 있습니다.",
    "famousLandmarks": [
      "산타클로스 마을",
      "수오멘린나 요새",
      "헬싱키 대성당"
    ],
    "isoCode": "fi"
  },
  {
    "id": "iceland",
    "name": "아이슬란드",
    "englishName": "Iceland",
    "continent": "유럽",
    "capital": "레이캬비크",
    "population": "약 39만 명",
    "language": "아이슬란드어",
    "flag": "🇮🇸",
    "climate": "한대 기후 및 서안 해양성 기후",
    "climateDesc": "북극권 바로 남쪽에 위치하지만 멕시코 만류의 영향으로 위도에 비해 겨울이 온화합니다. 연중 바람이 강하게 불고 날씨 변화가 매우 심합니다.",
    "geoFeatures": "화산과 빙하가 공존하는 역동적인 지형",
    "specialFeature": "‘불과 얼음의 땅’으로 불리며, 활발한 화산 활동과 거대한 빙하를 동시에 볼 수 있는 지질학적 천국입니다. 지열 에너지를 활용하여 난방과 전력의 대부분을 충당합니다.",
    "surroundingCountries": [
      "영국"
    ],
    "mapCoords": {
      "x": 190,
      "y": 60
    },
    "latitude": "북위 64° 08'",
    "longitude": "서경 21° 56'",
    "elevation": "평균 해발고도 557m",
    "geographicRegion": "북유럽",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "바트나요쿨 빙하",
      "헤클라 화산",
      "굴포스 폭포"
    ],
    "naturalEnvironment": "대서양 중앙 해령 위에 위치하여 온천, 간헐천, 화산이 도처에 존재하며 국토의 11%가 빙하로 덮여 있습니다. 나무가 거의 자라지 않는 황량하고 이국적인 이끼 지대가 펼쳐져 있습니다.",
    "famousLandmarks": [
      "블루 라군",
      "게이시르 간헐천",
      "싱벨리어 국립공원"
    ],
    "isoCode": "is"
  },
  {
    "id": "czech",
    "name": "체코",
    "englishName": "Czech Republic",
    "continent": "유럽",
    "capital": "프라하",
    "population": "약 1,090만 명",
    "language": "체코어",
    "flag": "🇨🇿",
    "climate": "온대 대륙성 기후",
    "climateDesc": "사계절이 뚜렷하며 여름은 온화하고 겨울은 춥고 습합니다. 서쪽의 해양성 기후와 동쪽의 대륙성 기후가 교차하는 전형적인 과도기적 기후를 보입니다.",
    "geoFeatures": "보헤미아 분지와 주변 산악 지대",
    "specialFeature": "유럽의 중심부에 위치한 내륙국으로, 역사적인 보헤미아와 모라비아 지역으로 나뉘며 풍부한 문화유산을 보유하고 있습니다.",
    "surroundingCountries": [
      "독일",
      "폴란드",
      "슬로바키아",
      "오스트리아"
    ],
    "mapCoords": {
      "x": 380,
      "y": 215
    },
    "latitude": "북위 50° 05'",
    "longitude": "동경 14° 25'",
    "elevation": "평균 해발고도 약 430m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "보헤미아 분지",
      "크르코노셰 산맥",
      "블타바 강"
    ],
    "naturalEnvironment": "엘베강과 블타바강 수계가 발달해 있으며, 국토의 3분의 1이 숲으로 둘러싸여 다양한 야생동물이 서식합니다.",
    "famousLandmarks": [
      "프라하 성",
      "카를교",
      "체스키 크룸로프 역사 지구"
    ],
    "isoCode": "cz"
  },
  {
    "id": "slovakia",
    "name": "슬로바키아",
    "englishName": "Slovakia",
    "continent": "유럽",
    "capital": "브라티슬라바",
    "population": "약 540만 명",
    "language": "슬로바키아어",
    "flag": "🇸🇰",
    "climate": "온대 대륙성 기후",
    "climateDesc": "여름은 따뜻하고 겨울은 춥고 건조하며, 고지대로 갈수록 기온이 낮아지고 강수량이 많아집니다.",
    "geoFeatures": "카르파티아 산맥과 다뉴브 분지",
    "specialFeature": "국토의 대부분이 산악 지대로 이루어져 있으며, 수많은 동굴과 온천이 발달한 자연의 보고입니다.",
    "surroundingCountries": [
      "체코",
      "폴란드",
      "우크라이나",
      "헝가리",
      "오스트리아"
    ],
    "mapCoords": {
      "x": 410,
      "y": 215
    },
    "latitude": "북위 48° 08'",
    "longitude": "동경 17° 06'",
    "elevation": "평균 해발고도 약 457m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "타트라 산맥",
      "다뉴브 강",
      "슬로바키아 카르스트"
    ],
    "naturalEnvironment": "북부의 험준한 타트라 산맥과 남부의 비옥한 다뉴브강 평원이 대조를 이루며, 풍부한 지하수와 동굴 생태계가 특징입니다.",
    "famousLandmarks": [
      "스피스 성",
      "하이 타트라 국립공원",
      "도브시나 얼음동굴"
    ],
    "isoCode": "sk"
  },
  {
    "id": "netherlands",
    "name": "네덜란드",
    "englishName": "Netherlands",
    "continent": "유럽",
    "capital": "암스테르담",
    "population": "약 1,800만 명",
    "language": "네덜란드어",
    "flag": "🇳🇱",
    "climate": "서안 해양성 기후",
    "climateDesc": "북해의 영향으로 연중 온화하고 습하며, 바람이 많이 불고 날씨 변화가 심합니다.",
    "geoFeatures": "낮은 평원과 간척지(포더)",
    "specialFeature": "국토의 약 25%가 해수면보다 낮아 세계에서 가장 발달한 제방 및 간척 기술을 보유하고 있습니다.",
    "surroundingCountries": [
      "독일",
      "벨기에"
    ],
    "mapCoords": {
      "x": 310,
      "y": 175
    },
    "latitude": "북위 52° 22'",
    "longitude": "동경 4° 53'",
    "elevation": "평균 해발고도 약 30m",
    "geographicRegion": "서유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "라인-마스-스헬데 삼각주",
      "바덴해 와덴 제도",
      "발스산"
    ],
    "naturalEnvironment": "북해 연안의 사구와 광활한 간척지, 그리고 라인강 하구의 복잡한 수로망이 독특한 습지 생태계를 형성합니다.",
    "famousLandmarks": [
      "킨더다이크 풍차",
      "쾨켄호프 튤립 정원",
      "암스테르담 운하 지구"
    ],
    "isoCode": "nl"
  },
  {
    "id": "belgium",
    "name": "벨기에",
    "englishName": "Belgium",
    "continent": "유럽",
    "capital": "브뤼셀",
    "population": "약 1,180만 명",
    "language": "네덜란드어, 프랑스어, 독일어",
    "flag": "🇧🇪",
    "climate": "서안 해양성 기후",
    "climateDesc": "연중 온화하고 강수량이 고르게 분포하며, 겨울은 비교적 따뜻하고 여름은 선선합니다.",
    "geoFeatures": "북부 평원과 남부 아르덴 고원",
    "specialFeature": "유럽연합(EU)과 북대서양조약기구(NATO)의 본부가 위치한 유럽 정치의 중심지이자 다언어 국가입니다.",
    "surroundingCountries": [
      "네덜란드",
      "독일",
      "룩셈부르크",
      "프랑스"
    ],
    "mapCoords": {
      "x": 305,
      "y": 190
    },
    "latitude": "북위 50° 50'",
    "longitude": "동경 4° 21'",
    "elevation": "평균 해발고도 약 180m",
    "geographicRegion": "서유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "아르덴 고원",
      "스헬데 강",
      "뫼즈 강"
    ],
    "naturalEnvironment": "북부 플란드런의 평평한 모래 해안과 남부 왈로니아의 울창한 아르덴 숲 및 구릉지가 조화를 이룹니다.",
    "famousLandmarks": [
      "브뤼셀 그랑플라스",
      "아토미움",
      "브뤼헤 역사 지구"
    ],
    "isoCode": "be"
  },
  {
    "id": "poland",
    "name": "폴란드",
    "englishName": "Poland",
    "continent": "유럽",
    "capital": "바르샤바",
    "population": "약 3,760만 명",
    "language": "폴란드어",
    "flag": "🇵🇱",
    "climate": "온대 과도기적 기후",
    "climateDesc": "해양성 기후와 대륙성 기후의 특징이 혼재되어 있어, 겨울은 춥고 눈이 많이 내리며 여름은 온화하고 비가 자주 옵니다.",
    "geoFeatures": "광활한 북부 평원과 남부 산악 지대",
    "specialFeature": "발트해 연안에서 카르파티아 산맥까지 이어지는 넓은 국토를 가졌으며, 역사적으로 동서 유럽의 가교 역할을 해왔습니다.",
    "surroundingCountries": [
      "독일",
      "체코",
      "슬로바키아",
      "우크라이나",
      "벨라루스",
      "러시아"
    ],
    "mapCoords": {
      "x": 420,
      "y": 180
    },
    "latitude": "북위 52° 13'",
    "longitude": "동경 21° 00'",
    "elevation": "평균 해발고도 약 173m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "비스와 강",
      "타트라 산맥",
      "마주리 호수 지대"
    ],
    "naturalEnvironment": "북부의 수많은 빙하 호수와 발트해 사구 해안, 그리고 유럽의 마지막 원시림인 비아워비에자 숲이 보존되어 있습니다.",
    "famousLandmarks": [
      "크라쿠프 역사 지구",
      "비엘리치카 소금광산",
      "아우슈비츠 비르케나우 수용소"
    ],
    "isoCode": "pl"
  },
  {
    "id": "hungary",
    "name": "헝가리",
    "englishName": "Hungary",
    "continent": "유럽",
    "capital": "부다페스트",
    "population": "약 960만 명",
    "language": "헝가리어",
    "flag": "🇭🇺",
    "climate": "온대 대륙성 기후",
    "climateDesc": "여름은 덥고 건조하며 겨울은 춥고 습합니다. 주변 산맥들이 바람을 막아주어 비교적 온화한 대륙성 기후를 나타냅니다.",
    "geoFeatures": "판노니아 평원과 다뉴브강 유역",
    "specialFeature": "유럽에서 가장 풍부한 온천 자원을 보유하고 있으며, 독특한 우랄어족 언어를 사용하는 마자르족의 나라입니다.",
    "surroundingCountries": [
      "오스트리아",
      "슬로바키아",
      "우크라이나",
      "크로아티아",
      "슬로베니아"
    ],
    "mapCoords": {
      "x": 415,
      "y": 230
    },
    "latitude": "북위 47° 29'",
    "longitude": "동경 19° 02'",
    "elevation": "평균 해발고도 약 143m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "다뉴브 강",
      "벌러톤 호수",
      "그레이트 헝가리 평원"
    ],
    "naturalEnvironment": "국토의 대부분이 평평한 분지 지형으로, 다뉴브강이 남북으로 흐르며 중부 유럽 최대의 호수인 벌러톤 호수가 위치해 있습니다.",
    "famousLandmarks": [
      "부다페스트 국회의사당",
      "세체니 온천",
      "토카이 와인 산지"
    ],
    "isoCode": "hu"
  },
  {
    "id": "ukraine",
    "name": "우크라이나",
    "englishName": "Ukraine",
    "continent": "유럽",
    "capital": "키이우",
    "population": "약 3,800만 명",
    "language": "우크라이나어",
    "flag": "🇺🇦",
    "climate": "온대 대륙성 기후",
    "climateDesc": "대부분 지역이 온화한 대륙성 기후를 보이나, 남부 크림반도 연안은 온화한 지중해성 기후를 띱니다.",
    "geoFeatures": "광활한 동유럽 평원과 체르노젬 흑토 지대",
    "specialFeature": "유럽에서 러시아를 제외하고 영토가 가장 넓은 국가로, 세계적인 곡창 지대인 흑토 지대를 품고 있습니다.",
    "surroundingCountries": [
      "폴란드",
      "슬로바키아",
      "헝가리",
      "러시아",
      "벨라루스"
    ],
    "mapCoords": {
      "x": 490,
      "y": 195
    },
    "latitude": "북위 50° 27'",
    "longitude": "동경 30° 31'",
    "elevation": "평균 해발고도 약 175m",
    "geographicRegion": "동유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "드니프로 강",
      "카르파티아 산맥",
      "포돌리아 구릉지"
    ],
    "naturalEnvironment": "드니프로강이 국토를 남북으로 가로지르며 흑해로 흘러들고, 남부 해안선과 광활한 스텝 지대가 발달해 있습니다.",
    "famousLandmarks": [
      "키이우 페체르스크 라브라",
      "성 소피아 대성당",
      "사랑의 터널"
    ],
    "isoCode": "ua"
  },
  {
    "id": "bulgaria",
    "name": "불가리아",
    "englishName": "Bulgaria",
    "continent": "유럽",
    "capital": "소피아",
    "population": "약 640만 명",
    "language": "불가리아어",
    "flag": "🇧🇬",
    "climate": "온대 대륙성 및 지중해성 과도기 기후",
    "climateDesc": "북부는 대륙성 기후의 영향을 받아 겨울이 춥고, 남부는 지중해성 기후의 영향으로 여름이 덥고 건조합니다.",
    "geoFeatures": "발칸산맥과 다뉴브 평원",
    "specialFeature": "장미의 계곡으로 유명한 세계 최대의 장미유 생산국이자, 키릴 문자의 발상지입니다.",
    "surroundingCountries": [
      "북마케도니아",
      "그리스",
      "터키"
    ],
    "mapCoords": {
      "x": 460,
      "y": 260
    },
    "latitude": "북위 42° 41'",
    "longitude": "동경 23° 19'",
    "elevation": "평균 해발고도 약 470m",
    "geographicRegion": "남동유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "발칸 산맥",
      "릴라 산맥",
      "다뉴브 강"
    ],
    "naturalEnvironment": "동쪽으로 흑해와 접하며, 험준한 산악 지대와 비옥한 강 유역 평야가 교차하여 생물 다양성이 매우 높습니다.",
    "famousLandmarks": [
      "릴라 수도원",
      "알렉산드르 넵스키 대성당",
      "플로브디프 로마 원형극장"
    ],
    "isoCode": "bg"
  },
  {
    "id": "croatia",
    "name": "크로아티아",
    "englishName": "Croatia",
    "continent": "유럽",
    "capital": "자그레브",
    "population": "약 400만 명",
    "language": "크로아티아어",
    "flag": "🇭🇷",
    "climate": "지중해성 및 대륙성 기후",
    "climateDesc": "아드리아해 연안은 온화하고 습한 지중해성 기후를 보이며, 내륙 지방은 사계절이 뚜렷한 대륙성 기후를 나타냅니다.",
    "geoFeatures": "디나르알프스 산맥과 아드리아해 해안선",
    "specialFeature": "천 개가 넘는 아름다운 섬들과 리아스식 해안, 그리고 뛰어난 카르스트 지형을 자랑하는 관광 대국입니다.",
    "surroundingCountries": [
      "슬로베니아",
      "헝가리"
    ],
    "mapCoords": {
      "x": 400,
      "y": 245
    },
    "latitude": "북위 45° 48'",
    "longitude": "동경 15° 58'",
    "elevation": "평균 해발고도 약 325m",
    "geographicRegion": "남동유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "디나르알프스 산맥",
      "아드리아해 제도",
      "사바 강"
    ],
    "naturalEnvironment": "석회암 지대의 침식으로 형성된 수많은 폭포와 호수, 그리고 아드리아해의 맑은 바다와 복잡한 해안선이 특징입니다.",
    "famousLandmarks": [
      "플리트비체 국립공원",
      "두브로브니크 성벽",
      "풀라 원형극장"
    ],
    "isoCode": "hr"
  },
  {
    "id": "austria",
    "name": "오스트리아",
    "englishName": "Austria",
    "continent": "유럽",
    "capital": "빈",
    "population": "약 900만 명",
    "language": "독일어",
    "flag": "🇦🇹",
    "climate": "온대 대륙성 및 고산 기후",
    "climateDesc": "서부 산악 지대는 전형적인 고산 기후를 보이며, 동부 분지 지역은 온화한 대륙성 기후를 나타냅니다.",
    "geoFeatures": "알프스 산맥과 다뉴브강 분지",
    "specialFeature": "국토의 60% 이상이 알프스 산악 지대로 이루어져 있으며, 모차르트와 베토벤의 숨결이 살아있는 클래식 음악의 본고장입니다.",
    "surroundingCountries": [
      "독일",
      "체코",
      "슬로바키아",
      "헝가리",
      "슬로베니아",
      "이탈리아",
      "스위스",
      "리히텐슈타인"
    ],
    "mapCoords": {
      "x": 375,
      "y": 230
    },
    "latitude": "북위 48° 12'",
    "longitude": "동경 16° 22'",
    "elevation": "평균 해발고도 약 910m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "동알프스 산맥",
      "다뉴브 강",
      "그로스글로크너 산"
    ],
    "naturalEnvironment": "웅장한 알프스 빙하와 깊은 계곡, 그리고 다뉴브강 수계가 어우러져 울창한 침엽수림과 풍부한 수자원을 형성합니다.",
    "famousLandmarks": [
      "쉔브룬 궁전",
      "할슈타트",
      "장크트 슈테판 대성당"
    ],
    "isoCode": "at"
  },
  {
    "id": "egypt",
    "name": "이집트",
    "englishName": "Egypt",
    "continent": "아프리카",
    "capital": "카이로",
    "population": "약 1억 1,200만 명",
    "language": "아랍어",
    "flag": "🇪🇬",
    "climate": "사막 기후",
    "climateDesc": "국토의 대부분이 건조한 사막 기후에 속하며, 연중 강수량이 매우 적고 일교차가 큽니다. 북부 해안 지대는 지중해성 기후의 영향을 받습니다.",
    "geoFeatures": "나일강 유역과 광활한 사하라 사막 지대",
    "specialFeature": "세계에서 가장 긴 나일강이 관통하며, 고대 문명의 발상지이자 아시아와 아프리카를 잇는 수에즈 운하가 있습니다.",
    "surroundingCountries": [
      "리비아",
      "수단"
    ],
    "mapCoords": {
      "x": 480,
      "y": 370
    },
    "latitude": "북위 26° 49'",
    "longitude": "동경 30° 48'",
    "elevation": "평균 해발고도 321m",
    "geographicRegion": "북아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "나일강",
      "시나이반도",
      "서부 사막"
    ],
    "naturalEnvironment": "나일강 수계가 국가의 젖줄 역할을 하며, 홍해와 지중해에 면해 있어 풍부한 해양 생태계를 보유하고 있습니다.",
    "famousLandmarks": [
      "기자의 피라미드",
      "아부심벨 신전",
      "왕가의 계곡"
    ],
    "isoCode": "eg"
  },
  {
    "id": "algeria",
    "name": "알제리",
    "englishName": "Algeria",
    "continent": "아프리카",
    "capital": "알제",
    "population": "약 4,560만 명",
    "language": "아랍어, 베르베르어",
    "flag": "🇩🇿",
    "climate": "사막 기후 및 지중해성 기후",
    "climateDesc": "북부 해안은 온화하고 습한 지중해성 기후를 보이나, 남부 내륙은 극도로 건조하고 뜨거운 사하라 사막 기후가 지배적입니다.",
    "geoFeatures": "아틀라스산맥과 광대한 사하라 사막 고원",
    "specialFeature": "아프리카 대륙에서 영토 면적이 가장 넓은 국가로, 국토의 80% 이상이 사하라 사막으로 덮여 있습니다.",
    "surroundingCountries": [
      "모로코",
      "튀니지",
      "리비아"
    ],
    "mapCoords": {
      "x": 280,
      "y": 350
    },
    "latitude": "북위 28° 01'",
    "longitude": "동경 1° 39'",
    "elevation": "평균 해발고도 800m",
    "geographicRegion": "북아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "아틀라스산맥",
      "아하가르산맥",
      "그랜드 에르그 오리엔탈"
    ],
    "naturalEnvironment": "북부의 지중해 연안 지대와 남부의 거대한 사막 생태계로 나뉘며, 사막 오아시스가 주요 수원을 형성합니다.",
    "famousLandmarks": [
      "타실리 나제르",
      "카스바 오브 알제",
      "티파사 유적"
    ],
    "isoCode": "dz"
  },
  {
    "id": "sudan",
    "name": "수단",
    "englishName": "Sudan",
    "continent": "아프리카",
    "capital": "하르툼",
    "population": "약 4,800만 명",
    "language": "아랍어, 영어",
    "flag": "🇸🇩",
    "climate": "열대 사막 기후 및 사바나 기후",
    "climateDesc": "북부는 매우 건조한 사막 기후이며, 남부로 갈수록 강수량이 증가하는 열대 사바나 기후가 나타납니다.",
    "geoFeatures": "청나일강과 백나일강의 합류점 및 누비아 사막",
    "specialFeature": "청나일강과 백나일강이 수도 하르툼에서 만나 본류를 이루며, 고대 누비아 문명의 피라미드 유적이 많이 남아있습니다.",
    "surroundingCountries": [
      "이집트",
      "에티오피아",
      "남수단",
      "중앙아프리카",
      "차드",
      "리비아"
    ],
    "mapCoords": {
      "x": 470,
      "y": 415
    },
    "latitude": "북위 15° 35'",
    "longitude": "동경 32° 31'",
    "elevation": "평균 해발고도 500m",
    "geographicRegion": "북동아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "누비아 사막",
      "청나일강",
      "마라 산맥"
    ],
    "naturalEnvironment": "나일강 수계가 국토를 관통하며 비옥한 평야를 형성하고, 홍해 연안에는 산호초 생태계가 발달해 있습니다.",
    "famousLandmarks": [
      "메로에 피라미드",
      "제벨 바르칼",
      "상가네브 해양국립공원"
    ],
    "isoCode": "sd"
  },
  {
    "id": "nigeria",
    "name": "나이지리아",
    "englishName": "Nigeria",
    "continent": "아프리카",
    "capital": "아부자",
    "population": "약 2억 2,400만 명",
    "language": "영어",
    "flag": "🇳🇬",
    "climate": "열대 사바나 기후 및 열대 우림 기후",
    "climateDesc": "남부 연안은 고온다습한 열대 우림 기후가 나타나고, 북부로 갈수록 건조한 사바나 및 스텝 기후로 변합니다.",
    "geoFeatures": "니제르강 삼각주와 중앙 고원 지대",
    "specialFeature": "아프리카에서 인구가 가장 많은 국가로, 다양한 민족과 문화가 공존하며 경제적 영향력이 큽니다.",
    "surroundingCountries": [
      "베냉",
      "차드",
      "카메룬"
    ],
    "mapCoords": {
      "x": 340,
      "y": 440
    },
    "latitude": "북위 9° 05'",
    "longitude": "동경 7° 32'",
    "elevation": "평균 해발고도 380m",
    "geographicRegion": "서아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "니제르강",
      "조스 고원",
      "차드호"
    ],
    "naturalEnvironment": "남부의 광활한 니제르 델타 망그로브 숲과 북부의 사바나 초원, 그리고 내륙 수계인 차드호가 주요 생태계를 이룹니다.",
    "famousLandmarks": [
      "주마 락",
      "오순-오소그보 성스러운 숲",
      "양카리 국립공원"
    ],
    "isoCode": "ng"
  },
  {
    "id": "namibia",
    "name": "나미비아",
    "englishName": "Namibia",
    "continent": "아프리카",
    "capital": "빈트후크",
    "population": "약 260만 명",
    "language": "영어",
    "flag": "🇳🇦",
    "climate": "사막 기후 및 반건조 기후",
    "climateDesc": "세계에서 가장 오래된 나미브 사막의 영향으로 매우 건조하며, 해안가는 한류의 영향으로 서늘하고 안개가 자주 낍니다.",
    "geoFeatures": "나미브 사막과 칼라하리 사막, 중앙 고원",
    "specialFeature": "붉은 사구로 유명한 나미브 사막이 있으며, 인구 밀도가 세계에서 가장 낮은 국가 중 하나입니다.",
    "surroundingCountries": [
      "남아프리카 공화국",
      "보츠와나",
      "앙골라",
      "잠비아"
    ],
    "mapCoords": {
      "x": 390,
      "y": 550
    },
    "latitude": "남위 22° 34'",
    "longitude": "동경 17° 05'",
    "elevation": "평균 해발고도 1,140m",
    "geographicRegion": "남아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "나미브 사막",
      "브랜드버그산",
      "피시리버 캐년"
    ],
    "naturalEnvironment": "대서양 연안의 차가운 벵겔라 한류와 사막이 만나 독특한 해안 사막 생태계를 형성하며, 에토샤 분지의 염호가 유명합니다.",
    "famousLandmarks": [
      "소수스블레이",
      "에토샤 국립공원",
      "스피츠코프"
    ],
    "isoCode": "na"
  },
  {
    "id": "south-africa",
    "name": "남아프리카 공화국",
    "englishName": "South Africa",
    "continent": "아프리카",
    "capital": "프리토리아",
    "population": "약 6,040만 명",
    "language": "영어, 아프리칸스어, 줄루어 등 12개 공식 언어",
    "flag": "🇿🇦",
    "climate": "온대 기후 및 반건조 기후",
    "climateDesc": "대부분 지역이 온화한 아열대 및 온대 기후를 보이며, 남서부 케이프 지역은 전형적인 지중해성 기후를 나타냅니다.",
    "geoFeatures": "드라켄즈버그산맥과 광활한 고원 지대",
    "specialFeature": "아프리카 대륙 최남단에 위치하며, 세 개의 수도를 가진 독특한 정치 체제와 풍부한 광물 자원을 자랑합니다.",
    "surroundingCountries": [
      "나미비아",
      "보츠와나",
      "짐바브웨",
      "모잠비크",
      "에스와티니"
    ],
    "mapCoords": {
      "x": 440,
      "y": 580
    },
    "latitude": "남위 30° 33'",
    "longitude": "동경 25° 00'",
    "elevation": "평균 해발고도 1,030m",
    "geographicRegion": "남아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "드라켄즈버그산맥",
      "오렌지강",
      "테이블마운틴"
    ],
    "naturalEnvironment": "인도양과 대서양이 만나는 해안선과 풍부한 사바나 야생동물 보호구역, 그리고 고유한 핀보스 식물군락이 발달해 있습니다.",
    "famousLandmarks": [
      "테이블마운틴",
      "크루거 국립공원",
      "희망봉"
    ],
    "isoCode": "za"
  },
  {
    "id": "kenya",
    "name": "케냐",
    "englishName": "Kenya",
    "continent": "아프리카",
    "capital": "나이로비",
    "population": "약 5,500만 명",
    "language": "스와힐리어, 영어",
    "flag": "🇰🇪",
    "climate": "열대 사바나 기후 및 고산 기후",
    "climateDesc": "적도가 통과하지만 고도가 높아 내륙 고원 지대는 연중 온화하며, 해안가는 고온다습한 열대 기후를 보입니다.",
    "geoFeatures": "동아프리카 지구대와 케냐산 고원",
    "specialFeature": "사파리 관광의 중심지이자 마사이마라 국립보호구에서 매년 일어나는 거대한 야생동물 대이동으로 유명합니다.",
    "surroundingCountries": [
      "탄자니아",
      "남수단",
      "에티오피아",
      "소말리아"
    ],
    "mapCoords": {
      "x": 530,
      "y": 490
    },
    "latitude": "남위 0° 02'",
    "longitude": "동경 36° 49'",
    "elevation": "평균 해발고도 760m",
    "geographicRegion": "동아프리카",
    "hemisphere": "적도 통과 (남반구와 북반구에 걸침), 동반구",
    "majorLandforms": [
      "동아프리카 지구대",
      "케냐산",
      "빅토리아호"
    ],
    "naturalEnvironment": "지구대 내부의 염호들과 광활한 사바나 초원이 펼쳐져 있으며, 다양한 야생동물의 이동 통로 역할을 합니다.",
    "famousLandmarks": [
      "마사이마라 국립보호구",
      "나쿠루호 국립공원",
      "암보셀리 국립공원"
    ],
    "isoCode": "ke"
  },
  {
    "id": "morocco",
    "name": "모로코",
    "englishName": "Morocco",
    "continent": "아프리카",
    "capital": "라바트",
    "population": "약 3,780만 명",
    "language": "아랍어, 베르베르어",
    "flag": "🇲🇦",
    "climate": "지중해성 기후 및 사막 기후",
    "climateDesc": "북부와 서부 해안은 따뜻하고 습한 지중해성 및 해양성 기후를 보이나, 아틀라스산맥 남쪽은 건조한 사막 기후입니다.",
    "geoFeatures": "아틀라스산맥과 대서양 및 지중해 연안선",
    "specialFeature": "유럽과 지브롤터 해협을 사이에 두고 마주 보고 있으며, 이슬람 문화와 베르베르 전통이 융합된 독특한 문화를 가집니다.",
    "surroundingCountries": [
      "알제리",
      "스페인"
    ],
    "mapCoords": {
      "x": 210,
      "y": 340
    },
    "latitude": "북위 31° 47'",
    "longitude": "서경 7° 05'",
    "elevation": "평균 해발고도 900m",
    "geographicRegion": "북아프리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "아틀라스산맥",
      "투브칼산",
      "드라강"
    ],
    "naturalEnvironment": "지중해와 대서양을 모두 접하고 있으며, 아틀라스산맥이 북부의 습윤한 기후와 남부의 사하라 사막을 가르는 장벽 역할을 합니다.",
    "famousLandmarks": [
      "마라케시 메디나",
      "페스 엘 발리",
      "하산 2세 사원"
    ],
    "isoCode": "ma"
  },
  {
    "id": "madagascar",
    "name": "마다가스카르",
    "englishName": "Madagascar",
    "continent": "아프리카",
    "capital": "안타나나리보",
    "population": "약 3,000만 명",
    "language": "말라가시어, 프랑스어",
    "flag": "🇲🇬",
    "climate": "열대 우림 기후 및 사바나 기후",
    "climateDesc": "동부 연안은 무역풍의 영향으로 고온다습한 열대 우림 기후가 나타나고, 서부와 남부는 건조한 사바나 및 반사막 기후를 보입니다.",
    "geoFeatures": "중앙 고원 지대와 동서로 대비되는 해안 평야",
    "specialFeature": "세계에서 네 번째로 큰 섬나라로, 오랜 고립 덕분에 바오밥나무와 여우원숭이 등 지구상 어디에도 없는 고유종 생물이 가득합니다.",
    "surroundingCountries": [
      "모잠비크"
    ],
    "mapCoords": {
      "x": 610,
      "y": 550
    },
    "latitude": "남위 18° 52'",
    "longitude": "동경 47° 31'",
    "elevation": "평균 해발고도 440m",
    "geographicRegion": "동아프리카 섬나라",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "중앙 고원",
      "칭기 데 베마라하",
      "망고키강"
    ],
    "naturalEnvironment": "독특한 진화 계통을 가진 고유종 생태계가 특징이며, 석회암 카르스트 지형과 울창한 열대 우림이 보존되어 있습니다.",
    "famousLandmarks": [
      "바오밥 거리",
      "칭기 데 베마라하 국립공원",
      "이살로 국립공원"
    ],
    "isoCode": "mg"
  },
  {
    "id": "ethiopia",
    "name": "에티오피아",
    "englishName": "Ethiopia",
    "continent": "아프리카",
    "capital": "아디스아바바",
    "population": "약 1억 2,600만 명",
    "language": "암하라어",
    "flag": "🇪🇹",
    "climate": "고산 기후 및 열대 몬순 기후",
    "climateDesc": "적도 부근에 위치하지만 국토 대부분이 고원 지대여서 연중 온화한 봄 날씨를 유지하며, 고도에 따라 기후 차이가 큽니다.",
    "geoFeatures": "에티오피아 고원과 동아프리카 지구대",
    "specialFeature": "아프리카에서 유일하게 식민 지배를 받지 않은 역사적 자부심이 있으며, 인류의 기원인 '루시' 화석과 커피의 발상지로 유명합니다.",
    "surroundingCountries": [
      "소말리아",
      "케냐",
      "남수단",
      "수단"
    ],
    "mapCoords": {
      "x": 520,
      "y": 450
    },
    "latitude": "북위 9° 01'",
    "longitude": "동경 38° 44'",
    "elevation": "평균 해발고도 1,330m",
    "geographicRegion": "동아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "에티오피아 고원",
      "라스 다샨산",
      "타나호"
    ],
    "naturalEnvironment": "청나일강의 발원지인 타나호가 있으며, 험준한 고원 지형과 지구대의 단층호들이 어우러져 독특한 고산 생태계를 형성합니다.",
    "famousLandmarks": [
      "라리벨라 암굴 교회군",
      "시미엔 국립공원",
      "악숨 유적지"
    ],
    "isoCode": "et"
  },
  {
    "id": "tanzania",
    "name": "탄자니아",
    "englishName": "Tanzania",
    "continent": "아프리카",
    "capital": "도도마",
    "population": "약 6,740만 명",
    "language": "스와힐리어, 영어",
    "flag": "🇹🇿",
    "climate": "열대 사바나 기후",
    "climateDesc": "고지대는 온화하지만 해안가는 고온 다습하며, 우기와 건기가 뚜렷하게 구분됩니다.",
    "geoFeatures": "동아프리카 지구대와 고원 지대",
    "specialFeature": "아프리카 최고봉인 킬리만자로 산과 거대한 세렝게티 초원이 위치해 있어 야생동물의 낙원으로 불립니다.",
    "surroundingCountries": [
      "케냐",
      "잠비아",
      "모잠비크"
    ],
    "mapCoords": {
      "x": 520,
      "y": 520
    },
    "latitude": "남위 6° 18'",
    "longitude": "동경 35° 45'",
    "elevation": "평균 해발고도 약 1,018m",
    "geographicRegion": "동아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "킬리만자로 산",
      "세렝게티 평원",
      "빅토리아 호수"
    ],
    "naturalEnvironment": "인도양과 접한 긴 해안선과 지구대 호수들이 발달해 있으며, 사바나 초원과 풍부한 야생 생태계가 보존되어 있습니다.",
    "famousLandmarks": [
      "킬리만자로 국립공원",
      "응고롱고로 보존지역",
      "잔지바르 섬"
    ],
    "isoCode": "tz"
  },
  {
    "id": "tunisia",
    "name": "튀니지",
    "englishName": "Tunisia",
    "continent": "아프리카",
    "capital": "튀니스",
    "population": "약 1,240만 명",
    "language": "아랍어",
    "flag": "🇹🇳",
    "climate": "지중해성 기후 및 사막 기후",
    "climateDesc": "북부는 온화하고 비가 내리는 지중해성 기후를 보이나, 남부로 갈수록 건조한 사하라 사막 기후가 나타납니다.",
    "geoFeatures": "아틀라스 산맥 동단과 사하라 사막",
    "specialFeature": "고대 카르타고 문명의 발상지이자 지중해와 사하라 사막이 만나는 독특한 지리적 위치를 가집니다.",
    "surroundingCountries": [
      "알제리",
      "리비아"
    ],
    "mapCoords": {
      "x": 340,
      "y": 330
    },
    "latitude": "북위 36° 48'",
    "longitude": "동경 10° 11'",
    "elevation": "평균 해발고도 약 246m",
    "geographicRegion": "북아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "아틀라스 산맥",
      "제리드 소금호수",
      "사하라 사막"
    ],
    "naturalEnvironment": "북부의 비옥한 평야와 지중해 해안선, 남부의 건조한 사막 지대와 염호가 대조를 이룹니다.",
    "famousLandmarks": [
      "카르타고 유적지",
      "엘젬 원형경기장",
      "시디 부 사이드"
    ],
    "isoCode": "tn"
  },
  {
    "id": "libya",
    "name": "리비아",
    "englishName": "Libya",
    "continent": "아프리카",
    "capital": "트리폴리",
    "population": "약 690만 명",
    "language": "아랍어",
    "flag": "🇱🇾",
    "climate": "사막 기후",
    "climateDesc": "국토의 대부분이 극도로 건조하고 뜨거운 사막 기후이며, 북부 해안 일부만 온화한 지중해성 기후를 띱니다.",
    "geoFeatures": "사하라 사막과 평탄한 고원",
    "specialFeature": "국토의 90% 이상이 사막으로 이루어져 있으며, 세계적인 석유 매장량을 보유하고 있습니다.",
    "surroundingCountries": [
      "이집트",
      "수단",
      "차드",
      "알제리",
      "튀니지"
    ],
    "mapCoords": {
      "x": 410,
      "y": 360
    },
    "latitude": "북위 32° 52'",
    "longitude": "동경 13° 11'",
    "elevation": "평균 해발고도 약 423m",
    "geographicRegion": "북아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "리비아 사막",
      "티베스티 산맥",
      "시드라 만"
    ],
    "naturalEnvironment": "오아시스를 제외하면 극도로 건조한 사막 생태계가 주를 이루며, 북부 지중해 연안에 인구가 집중되어 있습니다.",
    "famousLandmarks": [
      "렙티스 마그나 유적",
      "사브라타 고대 도시",
      "가다메스 구시가지"
    ],
    "isoCode": "ly"
  },
  {
    "id": "south-sudan",
    "name": "남수단",
    "englishName": "South Sudan",
    "continent": "아프리카",
    "capital": "주바",
    "population": "약 1,110만 명",
    "language": "영어",
    "flag": "🇸🇸",
    "climate": "열대 사바나 기후",
    "climateDesc": "연중 고온 다습하며, 4월부터 11월까지 이어지는 우기와 건기가 뚜렷하게 대비됩니다.",
    "geoFeatures": "백나일강 유역의 평원과 늪지대",
    "specialFeature": "세계에서 가장 젊은 독립국 중 하나로, 아프리카 최대 규모의 습지인 수드(Sudd)가 위치해 있습니다.",
    "surroundingCountries": [
      "수단",
      "에티오피아",
      "케냐",
      "중앙아프리카"
    ],
    "mapCoords": {
      "x": 475,
      "y": 460
    },
    "latitude": "북위 4° 51'",
    "longitude": "동경 31° 36'",
    "elevation": "평균 해발고도 약 460m",
    "geographicRegion": "동아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "백나일강",
      "수드 습지",
      "이마트공 산맥"
    ],
    "naturalEnvironment": "백나일강이 관통하며 형성된 거대한 습지와 사바나 초원이 펼쳐져 있어 다양한 철새와 야생동물이 서식합니다.",
    "famousLandmarks": [
      "수드 습지대",
      "반딩길로 국립공원",
      "님룰레 국립공원"
    ],
    "isoCode": "ss"
  },
  {
    "id": "somalia",
    "name": "소말리아",
    "englishName": "Somalia",
    "continent": "아프리카",
    "capital": "모가디슈",
    "population": "약 1,800만 명",
    "language": "소말리아어, 아랍어",
    "flag": "🇸🇴",
    "climate": "반건조 및 사막 기후",
    "climateDesc": "연중 덥고 건조하며, 몬순의 영향으로 불규칙한 강우 패턴을 보입니다.",
    "geoFeatures": "아프리카의 뿔이라 불리는 반도 지형과 평원",
    "specialFeature": "아프리카 대륙에서 가장 긴 해안선을 가지고 있으며, 인도양과 홍해를 잇는 전략적 요충지입니다.",
    "surroundingCountries": [
      "에티오피아",
      "케냐"
    ],
    "mapCoords": {
      "x": 575,
      "y": 470
    },
    "latitude": "북위 2° 02'",
    "longitude": "동경 45° 20'",
    "elevation": "평균 해발고도 약 410m",
    "geographicRegion": "동아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "구반 평원",
      "셰벨레 강",
      "칼 마도우 산맥"
    ],
    "naturalEnvironment": "건조한 관목림과 사막 지대가 주를 이루며, 남부의 주바 강과 셰벨레 강 유역이 주요 농업 지대를 형성합니다.",
    "famousLandmarks": [
      "라스 길 동굴 벽화",
      "모가디슈 대성당 유적",
      "신바디 국립공원"
    ],
    "isoCode": "so"
  },
  {
    "id": "japan",
    "name": "일본",
    "englishName": "Japan",
    "continent": "아시아",
    "capital": "도쿄",
    "population": "약 1억 2,300만 명",
    "language": "일본어",
    "flag": "🇯🇵",
    "climate": "온대 몬순 기후 및 냉대 기후",
    "climateDesc": "남북으로 길게 뻗어 있어 아열대부터 냉대까지 다양한 기후가 나타나며, 사계절이 뚜렷합니다.",
    "geoFeatures": "환태평양 조산대의 화산섬 열도",
    "specialFeature": "수많은 화산과 온천이 발달해 있으며, 지진 활동이 매우 활발한 지리적 특성을 지니고 있습니다.",
    "surroundingCountries": [
      "대한민국",
      "중국",
      "러시아"
    ],
    "mapCoords": {
      "x": 700,
      "y": 150
    },
    "latitude": "북위 35° 41'",
    "longitude": "동경 139° 41'",
    "elevation": "평균 해발고도 약 438m",
    "geographicRegion": "동아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "후지산",
      "일본 알프스",
      "시나노강"
    ],
    "naturalEnvironment": "국토의 70% 이상이 산악 지대이며, 태평양과 동해에 둘러싸여 풍부한 해양 생태계와 복잡한 리아스식 해안을 형성합니다.",
    "famousLandmarks": [
      "후지산",
      "교토 기요미즈데라",
      "히메지 성"
    ],
    "isoCode": "jp"
  },
  {
    "id": "china",
    "name": "중국",
    "englishName": "China",
    "continent": "아시아",
    "capital": "베이징",
    "population": "약 14억 900만 명",
    "language": "중국어",
    "flag": "🇨🇳",
    "climate": "다양한 기후대 (온대, 아열대, 건조 기후 등)",
    "climateDesc": "광대한 영토로 인해 동부의 따뜻한 계절풍 기후부터 서부의 건조한 사막 및 고산 기후까지 다양하게 분포합니다.",
    "geoFeatures": "서고동저 지형과 거대한 산맥 및 분지",
    "specialFeature": "세계에서 세 번째로 넓은 영토를 가졌으며, 황하와 양쯔강을 중심으로 찬란한 고대 문명을 꽃피웠습니다.",
    "surroundingCountries": [
      "몽골",
      "러시아",
      "베트남",
      "인도",
      "카자흐스탄"
    ],
    "mapCoords": {
      "x": 600,
      "y": 140
    },
    "latitude": "북위 39° 54'",
    "longitude": "동경 116° 23'",
    "elevation": "평균 해발고도 약 1,840m",
    "geographicRegion": "동아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "히말라야 산맥",
      "타클라마칸 사막",
      "양쯔강"
    ],
    "naturalEnvironment": "서부의 티베트 고원과 타클라마칸 사막에서 시작해 동부의 비옥한 평야와 긴 해안선으로 이어지는 거대한 수계와 생태계를 이룹니다.",
    "famousLandmarks": [
      "만리장성",
      "자금성",
      "병마용갱"
    ],
    "isoCode": "cn"
  },
  {
    "id": "india",
    "name": "인도",
    "englishName": "India",
    "continent": "아시아",
    "capital": "뉴델리",
    "population": "약 14억 4,000만 명",
    "language": "힌디어, 영어",
    "flag": "🇮🇳",
    "climate": "열대 몬순 기후",
    "climateDesc": "대부분 지역이 열대 및 아열대 기후에 속하며, 여름철 강력한 몬순(우기)의 영향을 크게 받습니다.",
    "geoFeatures": "히말라야 산맥과 데칸 고원, 인도양 반도",
    "specialFeature": "세계 최대의 인구 대국이자 힌두교와 불교의 발상지로, 지리적으로 아시아 대륙과 분리된 인도 아대륙을 형성합니다.",
    "surroundingCountries": [
      "중국"
    ],
    "mapCoords": {
      "x": 550,
      "y": 230
    },
    "latitude": "북위 28° 36'",
    "longitude": "동경 77° 12'",
    "elevation": "평균 해발고도 약 600m",
    "geographicRegion": "남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "히말라야 산맥",
      "갠지스강",
      "데칸 고원"
    ],
    "naturalEnvironment": "북부의 만년설 산맥부터 중부의 거대한 갠지스 평원, 남부의 열대 해안선과 서부의 타르 사막까지 극적인 자연환경을 자랑합니다.",
    "famousLandmarks": [
      "타지마할",
      "갠지스강(바라나시)",
      "아잔타 석굴"
    ],
    "isoCode": "in"
  },
  {
    "id": "southkorea",
    "name": "대한민국",
    "englishName": "South Korea",
    "continent": "아시아",
    "capital": "서울",
    "population": "약 5,130만 명",
    "language": "한국어",
    "flag": "🇰🇷",
    "climate": "온대 몬순 기후",
    "climateDesc": "사계절이 뚜렷하며, 여름은 고온 다습하고 겨울은 한랭 건조한 특징을 보입니다.",
    "geoFeatures": "동고서저 지형의 반도 국가",
    "specialFeature": "삼면이 바다로 둘러싸여 있으며, 좁은 국토 대비 산지가 많고 눈부신 경제 및 문화적 성장을 이룩했습니다.",
    "surroundingCountries": [
      "일본",
      "중국"
    ],
    "mapCoords": {
      "x": 670,
      "y": 150
    },
    "latitude": "북위 37° 33'",
    "longitude": "동경 126° 58'",
    "elevation": "평균 해발고도 약 282m",
    "geographicRegion": "동아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "태백산맥",
      "한강",
      "한라산"
    ],
    "naturalEnvironment": "동쪽은 가파른 산악 지대, 서쪽과 남쪽은 완만한 평야와 복잡한 리아스식 해안 및 수많은 섬들로 이루어져 있습니다.",
    "famousLandmarks": [
      "경복궁",
      "제주도 성산일출봉",
      "설악산 국립공원"
    ],
    "isoCode": "kr"
  },
  {
    "id": "vietnam",
    "name": "베트남",
    "englishName": "Vietnam",
    "continent": "아시아",
    "capital": "하노이",
    "population": "약 9,900만 명",
    "language": "베트남어",
    "flag": "🇻🇳",
    "climate": "열대 몬순 기후",
    "climateDesc": "북부는 사계절이 있는 아열대성 기후를 보이고, 남부는 연중 고온 다습한 전형적인 열대 기후를 나타냅니다.",
    "geoFeatures": "남북으로 길게 뻗은 해안선과 산악 지대",
    "specialFeature": "인도차이나 반도 동부에 위치하여 S자 모양의 독특한 국토 형상을 지니고 있으며, 메콩강 삼각주가 발달해 있습니다.",
    "surroundingCountries": [
      "중국"
    ],
    "mapCoords": {
      "x": 620,
      "y": 220
    },
    "latitude": "북위 21° 01'",
    "longitude": "동경 105° 51'",
    "elevation": "평균 해발고도 약 398m",
    "geographicRegion": "동남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "안남산맥",
      "홍강 삼각주",
      "메콩강 삼각주"
    ],
    "naturalEnvironment": "동쪽으로 남중국해와 접한 긴 해안선이 발달해 있으며, 남북의 거대한 강 삼각주 평야가 비옥한 농경지를 형성합니다.",
    "famousLandmarks": [
      "하롱베이",
      "호이안 고대 도시",
      "퐁냐케방 국립공원"
    ],
    "isoCode": "vn"
  },
  {
    "id": "thailand",
    "name": "태국",
    "englishName": "Thailand",
    "continent": "아시아",
    "capital": "방콕",
    "population": "약 7,180만 명",
    "language": "태국어",
    "flag": "🇹🇭",
    "climate": "열대 몬순 기후",
    "climateDesc": "연중 고온 다습하며 건기, 우기, 더운 세 계절로 뚜렷하게 구분됩니다. 남부 지역은 몬순의 영향으로 강수량이 매우 많습니다.",
    "geoFeatures": "중부 평원과 북부 산악 지대",
    "specialFeature": "불교 문화가 깊게 뿌리내린 국가로, 수많은 사원과 독특한 수상 가옥 및 운하 문화가 발달해 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 600,
      "y": 230
    },
    "latitude": "북위 13° 45'",
    "longitude": "동경 100° 29'",
    "elevation": "평균 해발고도 287m",
    "geographicRegion": "동남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "차오프라야강",
      "도이인타논산",
      "코랏 고원"
    ],
    "naturalEnvironment": "차오프라야강이 흐르는 비옥한 충적평야와 울창한 열대우림, 그리고 안다만해와 태국만의 아름다운 산호초 해안으로 구성되어 있습니다.",
    "famousLandmarks": [
      "방콕 왕궁",
      "왓 아룬",
      "피피섬"
    ],
    "isoCode": "th"
  },
  {
    "id": "indonesia",
    "name": "인도네시아",
    "englishName": "Indonesia",
    "continent": "아시아",
    "capital": "자카르타",
    "population": "약 2억 7,700만 명",
    "language": "인도네시아어",
    "flag": "🇮🇩",
    "climate": "열대 우림 기후",
    "climateDesc": "적도에 걸쳐 있어 연중 고온 다습하며 계절 변화가 거의 없고 강수량이 매우 풍부합니다.",
    "geoFeatures": "세계 최대의 도서 국가이자 환태평양 조산대",
    "specialFeature": "1만 7천 개 이상의 섬으로 이루어져 있으며, 수많은 활화산과 독특한 생물 다양성을 자랑합니다.",
    "surroundingCountries": [
      "파푸아뉴기니"
    ],
    "mapCoords": {
      "x": 630,
      "y": 280
    },
    "latitude": "남위 6° 12'",
    "longitude": "동경 106° 49'",
    "elevation": "평균 해발고도 367m",
    "geographicRegion": "동남아시아",
    "hemisphere": "남반구와 북반구에 걸침, 동반구",
    "majorLandforms": [
      "푼착 자야산",
      "토바호",
      "브로모 화산"
    ],
    "naturalEnvironment": "세계에서 가장 넓은 열대우림 중 하나를 보유하고 있으며, 복잡한 해안선과 풍부한 해양 생태계를 갖춘 산호초 지대가 발달해 있습니다.",
    "famousLandmarks": [
      "보로부두르 사원",
      "발리섬",
      "코모도 국립공원"
    ],
    "isoCode": "id"
  },
  {
    "id": "philippines",
    "name": "필리핀",
    "englishName": "Philippines",
    "continent": "아시아",
    "capital": "마닐라",
    "population": "약 1억 1,700만 명",
    "language": "필리핀어, 영어",
    "flag": "🇵🇭",
    "climate": "열대 해양성 기후",
    "climateDesc": "연중 고온 다습하며, 태풍의 영향을 자주 받는 우기와 비교적 건조한 건기로 나뉩니다.",
    "geoFeatures": "7,000여 개의 섬으로 이루어진 군도와 화산 지형",
    "specialFeature": "동서양의 문화가 융합된 독특한 가톨릭 국가로, 아름다운 해변과 다채로운 해양 생태계가 특징입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 660,
      "y": 240
    },
    "latitude": "북위 14° 35'",
    "longitude": "동경 120° 58'",
    "elevation": "평균 해발고도 442m",
    "geographicRegion": "동남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "마욘 화산",
      "풀로그산",
      "초콜릿 힐스"
    ],
    "naturalEnvironment": "태평양 서부에 위치하여 복잡한 해안선과 산호초가 발달했으며, 풍부한 열대우림과 화산성 수계가 특징입니다.",
    "famousLandmarks": [
      "보라카이 화이트 비치",
      "바나우에 라이스 테라스",
      "푸에르토 프린세사 지하강"
    ],
    "isoCode": "ph"
  },
  {
    "id": "saudiarabia",
    "name": "사우디아라비아",
    "englishName": "Saudi Arabia",
    "continent": "아시아",
    "capital": "리야드",
    "population": "약 3,690만 명",
    "language": "아랍어",
    "flag": "🇸🇦",
    "climate": "사막 기후",
    "climateDesc": "대부분의 지역이 극도로 건조하고 여름에는 기온이 매우 높으며, 겨울에는 일교차가 큽니다.",
    "geoFeatures": "아라비아 고원과 광활한 모래사막",
    "specialFeature": "이슬람교의 발상지이자 성지 메카와 메디나가 위치한 종교적 중심지입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 450,
      "y": 210
    },
    "latitude": "북위 24° 38'",
    "longitude": "동경 46° 43'",
    "elevation": "평균 해발고도 665m",
    "geographicRegion": "서남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "룹알할리 사막",
      "사르와트 산맥",
      "안나푸드 사막"
    ],
    "naturalEnvironment": "영구적인 강이 없는 건조한 사막 지대로, 오아시스와 홍해 및 페르시아만 연안의 독특한 해안 생태계가 존재합니다.",
    "famousLandmarks": [
      "메카 그랜드 모스크",
      "마다인 살레",
      "킹덤 센터 타워"
    ],
    "isoCode": "sa"
  },
  {
    "id": "uae",
    "name": "아랍에미리트",
    "englishName": "United Arab Emirates",
    "continent": "아시아",
    "capital": "아부다비",
    "population": "약 950만 명",
    "language": "아랍어",
    "flag": "🇦🇪",
    "climate": "사막 기후",
    "climateDesc": "연중 매우 덥고 건조하며, 여름철에는 습도가 높고 겨울철에는 온화한 날씨를 보입니다.",
    "geoFeatures": "평평한 해안 저지와 광활한 모래사막",
    "specialFeature": "7개의 에미리트로 구성된 연방국가로, 초현대적인 도시 건축과 급격한 경제 성장을 이룩했습니다.",
    "surroundingCountries": [
      "사우디아라비아"
    ],
    "mapCoords": {
      "x": 480,
      "y": 215
    },
    "latitude": "북위 24° 28'",
    "longitude": "동경 54° 22'",
    "elevation": "평균 해발고도 149m",
    "geographicRegion": "서남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "자벨 하핏",
      "리와 오아시스",
      "페르시아만 연안"
    ],
    "naturalEnvironment": "대부분 사막 지형으로 이루어져 있으며, 페르시아만 연안의 갯벌과 망그로브 숲, 인공 섬들이 해안 생태계를 형성하고 있습니다.",
    "famousLandmarks": [
      "부르즈 할리파",
      "셰이크 자이드 그랜드 모스크",
      "팜 주메이라"
    ],
    "isoCode": "ae"
  },
  {
    "id": "iran",
    "name": "이란",
    "englishName": "Iran",
    "continent": "아시아",
    "capital": "테헤란",
    "population": "약 8,900만 명",
    "language": "페르시아어",
    "flag": "🇮🇷",
    "climate": "반건조 및 사막 기후",
    "climateDesc": "대부분 건조하거나 반건조 기후를 보이지만, 북부 카스피해 연안은 온화하고 강수량이 많습니다.",
    "geoFeatures": "척박한 고원과 자그로스, 엘부르즈 산맥",
    "specialFeature": "고대 페르시아 제국의 찬란한 역사적 유산을 간직하고 있으며, 독특한 이슬람 공화국 체제를 유지하고 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 490,
      "y": 180
    },
    "latitude": "북위 35° 41'",
    "longitude": "동경 51° 25'",
    "elevation": "평균 해발고도 1,305m",
    "geographicRegion": "서남아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "다마반드산",
      "자그로스 산맥",
      "다슈트에 카비르 사막"
    ],
    "naturalEnvironment": "고원 지대와 험준한 산맥으로 둘러싸여 있으며, 북쪽으로는 카스피해, 남쪽으로는 페르시아만과 오만만에 접해 있습니다.",
    "famousLandmarks": [
      "페르세폴리스",
      "나크셰 자한 광장",
      "골레스탄 궁전"
    ],
    "isoCode": "ir"
  },
  {
    "id": "kazakhstan",
    "name": "카자흐스탄",
    "englishName": "Kazakhstan",
    "continent": "아시아",
    "capital": "아스타나",
    "population": "약 2,000만 명",
    "language": "카자흐어, 러시아어",
    "flag": "🇰🇿",
    "climate": "대륙성 기후",
    "climateDesc": "겨울은 매우 춥고 여름은 더우며, 연교차가 매우 크고 강수량이 적은 건조한 기후입니다.",
    "geoFeatures": "광활한 스텝 지대와 중앙아시아의 고원",
    "specialFeature": "세계에서 가장 큰 내륙국으로, 풍부한 지하자원과 유목민의 역사적 전통을 가지고 있습니다.",
    "surroundingCountries": [
      "러시아",
      "중국"
    ],
    "mapCoords": {
      "x": 530,
      "y": 120
    },
    "latitude": "북위 51° 10'",
    "longitude": "동경 71° 26'",
    "elevation": "평균 해발고도 387m",
    "geographicRegion": "중앙아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "카자흐 초원",
      "알타이 산맥",
      "발하시호"
    ],
    "naturalEnvironment": "끝없이 펼쳐진 스텝과 반사막 지대가 주를 이루며, 카스피해와 아랄해 등 거대한 내륙 수계가 존재합니다.",
    "famousLandmarks": [
      "바이테렉 타워",
      "샤린 캐년",
      "메데우 빙상 경기장"
    ],
    "isoCode": "kz"
  },
  {
    "id": "mongolia",
    "name": "몽골",
    "englishName": "Mongolia",
    "continent": "아시아",
    "capital": "울란바토르",
    "population": "약 340만 명",
    "language": "몽골어",
    "flag": "🇲🇳",
    "climate": "대륙성 냉대 기후",
    "climateDesc": "연중 건조하고 겨울이 매우 길고 추우며, 맑은 날이 많아 '푸른 하늘의 나라'로 불립니다.",
    "geoFeatures": "고원 지대와 고비 사막, 광활한 초원",
    "specialFeature": "세계에서 인구 밀도가 가장 낮은 나라 중 하나로, 전통 유목 생활 방식이 오늘날까지 이어지고 있습니다.",
    "surroundingCountries": [
      "러시아",
      "중국"
    ],
    "mapCoords": {
      "x": 600,
      "y": 110
    },
    "latitude": "북위 47° 55'",
    "longitude": "동경 106° 55'",
    "elevation": "평균 해발고도 1,580m",
    "geographicRegion": "동아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "고비 사막",
      "알타이 산맥",
      "홉스골호"
    ],
    "naturalEnvironment": "평균 고도가 높은 고원 지대로, 북부의 침엽수림 타이가 지대와 남부의 황량한 사막, 그리고 광활한 초원 생태계가 공존합니다.",
    "famousLandmarks": [
      "테를지 국립공원",
      "칭기즈 칸 마동상",
      "홉스골 호수"
    ],
    "isoCode": "mn"
  },
  {
    "id": "usa",
    "name": "미국",
    "englishName": "United States",
    "continent": "북아메리카",
    "capital": "워싱턴 D.C.",
    "population": "약 3억 3,900만 명",
    "language": "영어",
    "flag": "🇺🇸",
    "climate": "다양한 기후 (온대, 냉대, 아열대 등)",
    "climateDesc": "영토가 넓어 서부의 건조 기후, 중부의 대륙성 기후, 남동부의 온대 습윤 기후 등 거의 모든 기후대가 나타납니다.",
    "geoFeatures": "로키 산맥과 넓은 대평원",
    "specialFeature": "세계 최대의 경제 및 군사 대국이자, 다양한 민족과 문화가 어우러진 다문화 국가입니다.",
    "surroundingCountries": [
      "캐나다",
      "멕시코"
    ],
    "mapCoords": {
      "x": 120,
      "y": 150
    },
    "latitude": "북위 38° 53'",
    "longitude": "서경 77° 01'",
    "elevation": "평균 해발고도 760m",
    "geographicRegion": "북아메리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "로키 산맥",
      "미시시피강",
      "그랜드 캐니언"
    ],
    "naturalEnvironment": "동부의 오래된 애팔래치아 산맥과 서부의 험준한 신기 습곡 산맥 사이에 거대한 미시시피 수계와 대평원이 발달해 있으며, 풍부한 국립공원 생태계를 보유하고 있습니다.",
    "famousLandmarks": [
      "자유의 여신상",
      "그랜드 캐니언 국립공원",
      "옐로스톤 국립공원"
    ],
    "isoCode": "us"
  },
  {
    "id": "canada",
    "name": "캐나다",
    "englishName": "Canada",
    "continent": "북아메리카",
    "capital": "오타와",
    "population": "약 3,870만 명",
    "language": "영어, 프랑스어",
    "flag": "🇨🇦",
    "climate": "냉대 및 한대 기후",
    "climateDesc": "대부분의 지역이 겨울이 길고 매우 추우며, 남부 국경 지대는 온화한 여름을 가진 온대 기후를 보입니다.",
    "geoFeatures": "로키 산맥과 캐나다 순상지, 수많은 호수",
    "specialFeature": "러시아에 이어 세계에서 두 번째로 영토가 넓은 나라이며, 깨끗한 자연환경과 높은 삶의 질로 유명합니다.",
    "surroundingCountries": [
      "미국"
    ],
    "mapCoords": {
      "x": 120,
      "y": 100
    },
    "latitude": "북위 45° 25'",
    "longitude": "서경 75° 41'",
    "elevation": "평균 해발고도 487m",
    "geographicRegion": "북아메리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "캐나다 로키 산맥",
      "세인트로렌스강",
      "그레이트베어호"
    ],
    "naturalEnvironment": "광활한 타이가 침엽수림과 툰드라 지대가 펼쳐져 있으며, 오대호를 비롯한 전 세계에서 가장 많은 호수와 복잡한 피오르드 해안선을 가지고 있습니다.",
    "famousLandmarks": [
      "나이아가라 폭포",
      "밴프 국립공원",
      "CN 타워"
    ],
    "isoCode": "ca"
  },
  {
    "id": "mexico",
    "name": "멕시코",
    "englishName": "Mexico",
    "continent": "북아메리카",
    "capital": "멕시코시티",
    "population": "약 1억 2,800만 명",
    "language": "스페인어",
    "flag": "🇲🇽",
    "climate": "고산 기후 및 건조 기후",
    "climateDesc": "고지대는 연중 온화한 고산 기후를 보이나, 북부 지역은 건조한 사막 기후가 나타나고 남부 해안은 열대 기후를 띱니다.",
    "geoFeatures": "고원 지대와 시에라 마드레 산맥",
    "specialFeature": "마야와 아스테카 문명의 발상지이며, 고대 유적과 현대 도시가 공존하는 독특한 문화적 경관을 자랑합니다.",
    "surroundingCountries": [
      "미국",
      "과테말라"
    ],
    "mapCoords": {
      "x": 120,
      "y": 220
    },
    "latitude": "북위 19° 26'",
    "longitude": "서경 99° 08'",
    "elevation": "평균 해발고도 약 1,111m",
    "geographicRegion": "북아메리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "멕시코 고원",
      "시에라 마드레 산맥",
      "유카탄 반도"
    ],
    "naturalEnvironment": "태평양과 멕시코만에 둘러싸여 있으며, 유카탄 반도의 석회암 카르스트 지형과 세노테가 발달해 있습니다.",
    "famousLandmarks": [
      "치첸 이사",
      "테오티우아칸",
      "칸쿤 해변"
    ],
    "isoCode": "mx"
  },
  {
    "id": "cuba",
    "name": "쿠바",
    "englishName": "Cuba",
    "continent": "북아메리카",
    "capital": "아바나",
    "population": "약 1,100만 명",
    "language": "스페인어",
    "flag": "🇨🇺",
    "climate": "열대 사바나 기후",
    "climateDesc": "연중 따뜻하고 습한 열대 기후를 유지하며, 여름철과 가을철에는 허리케인의 영향을 자주 받습니다.",
    "geoFeatures": "평야 지대와 카르스트 산지",
    "specialFeature": "카리브해에서 가장 큰 섬나라로, 독특한 사회주의 체제와 스페인 식민지 시절의 건축물이 잘 보존되어 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 160,
      "y": 230
    },
    "latitude": "북위 23° 08'",
    "longitude": "서경 82° 21'",
    "elevation": "평균 해발고도 약 108m",
    "geographicRegion": "카리브해 섬나라",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "비냘레스 계곡",
      "시에라 마에스트라 산맥",
      "사파타 습지"
    ],
    "naturalEnvironment": "카리브해의 산호초 해안선과 비냘레스 계곡의 독특한 모고테(석회암 봉우리) 지형이 특징입니다.",
    "famousLandmarks": [
      "올드 아바나",
      "비냘레스 계곡",
      "바라데로 해변"
    ],
    "isoCode": "cu"
  },
  {
    "id": "jamaica",
    "name": "자메이카",
    "englishName": "Jamaica",
    "continent": "북아메리카",
    "capital": "킹스턴",
    "population": "약 280만 명",
    "language": "영어",
    "flag": "🇯🇲",
    "climate": "열대 우림 및 사바나 기후",
    "climateDesc": "해안가는 덥고 습한 열대 기후를 보이지만, 고지대인 블루마운틴 지역은 비교적 서늘합니다.",
    "geoFeatures": "험준한 산악 지형과 석회암 고원",
    "specialFeature": "레게 음악의 발상지이자 세계적인 블루마운틴 커피 생산지로 유명합니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 160,
      "y": 240
    },
    "latitude": "북위 18° 01'",
    "longitude": "서경 76° 48'",
    "elevation": "평균 해발고도 약 340m",
    "geographicRegion": "카리브해 섬나라",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "블루마운틴 산맥",
      "던스리버 폭포",
      "콕핏 카운티"
    ],
    "naturalEnvironment": "울창한 열대우림과 산호초로 둘러싸인 해안선, 그리고 석회암 침식으로 형성된 콕핏 카운티의 카르스트 지형이 발달해 있습니다.",
    "famousLandmarks": [
      "블루마운틴",
      "던스리버 폭포",
      "밥 마리 박물관"
    ],
    "isoCode": "jm"
  },
  {
    "id": "guatemala",
    "name": "과테말라",
    "englishName": "Guatemala",
    "continent": "북아메리카",
    "capital": "과테말라시티",
    "population": "약 1,800만 명",
    "language": "스페인어",
    "flag": "🇬🇹",
    "climate": "열대 및 고산 기후",
    "climateDesc": "저지대는 고온 다습한 열대 기후를 띠지만, 인구가 밀집한 고지대는 연중 봄과 같은 온화한 날씨를 보입니다.",
    "geoFeatures": "화산 산맥과 고원 지대",
    "specialFeature": "찬란했던 마야 문명의 중심지였으며, 현재도 인구의 절반 이상이 마야계 원주민으로 고유의 전통을 유지하고 있습니다.",
    "surroundingCountries": [
      "멕시코"
    ],
    "mapCoords": {
      "x": 130,
      "y": 240
    },
    "latitude": "북위 14° 37'",
    "longitude": "서경 90° 31'",
    "elevation": "평균 해발고도 약 1,590m",
    "geographicRegion": "중앙아메리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "타후무코 화산",
      "아티틀란 호수",
      "페텐 분지"
    ],
    "naturalEnvironment": "태평양과 카리브해를 접하며, 수많은 활화산과 울창한 열대우림, 그리고 아름다운 칼데라 호수인 아티틀란 호수가 있습니다.",
    "famousLandmarks": [
      "티칼 마야 유적",
      "아티틀란 호수",
      "안티구아 과테말라"
    ],
    "isoCode": "gt"
  },
  {
    "id": "costarica",
    "name": "코스타리카",
    "englishName": "Costa Rica",
    "continent": "북아메리카",
    "capital": "산호세",
    "population": "약 520만 명",
    "language": "스페인어",
    "flag": "🇨🇷",
    "climate": "열대 우림 및 사바나 기후",
    "climateDesc": "태평양 연안은 건기와 우기가 뚜렷한 사바나 기후를 보이고, 카리브해 연안은 연중 비가 내리는 열대 우림 기후입니다.",
    "geoFeatures": "중앙 산맥과 풍부한 열대우림",
    "specialFeature": "국토의 25% 이상이 국립공원과 보호구역으로 지정되어 있으며, 군대가 없는 평화 국가로 유명합니다.",
    "surroundingCountries": [
      "파나마"
    ],
    "mapCoords": {
      "x": 140,
      "y": 250
    },
    "latitude": "북위 9° 56'",
    "longitude": "서경 84° 05'",
    "elevation": "평균 해발고도 약 1,250m",
    "geographicRegion": "중앙아메리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "아레날 화산",
      "치리포 산",
      "토르투게로 국립공원"
    ],
    "naturalEnvironment": "태평양과 카리브해 사이의 좁은 육교 지형으로, 전 세계 생물 다양성의 약 5%가 서식하는 풍요로운 생태계를 보유하고 있습니다.",
    "famousLandmarks": [
      "아레날 화산 국립공원",
      "몬테베르데 안개숲 보호구역",
      "마누엘 안토니오 국립공원"
    ],
    "isoCode": "cr"
  },
  {
    "id": "panama",
    "name": "파나마",
    "englishName": "Panama",
    "continent": "북아메리카",
    "capital": "파나마시티",
    "population": "약 440만 명",
    "language": "스페인어",
    "flag": "🇵🇦",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온 다습하며, 건기와 우기의 구분이 있으나 전반적으로 강수량이 매우 많습니다.",
    "geoFeatures": "좁은 지협과 중앙 산맥",
    "specialFeature": "태평양과 대서양을 연결하는 파나마 운하가 위치하여 세계 해상 교통과 물류의 중심지 역할을 합니다.",
    "surroundingCountries": [
      "코스타리카",
      "콜롬비아"
    ],
    "mapCoords": {
      "x": 150,
      "y": 260
    },
    "latitude": "북위 8° 58'",
    "longitude": "서경 79° 32'",
    "elevation": "평균 해발고도 약 360m",
    "geographicRegion": "중앙아메리카",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "바루 화산",
      "파나마 지협",
      "산블라스 제도"
    ],
    "naturalEnvironment": "북미와 남미 대륙을 잇는 가느다란 지협으로, 풍부한 해양 생태계와 열대 우림, 수많은 섬들이 발달해 있습니다.",
    "famousLandmarks": [
      "파나마 운하",
      "카스코 비에호(구시가지)",
      "산블라스 제도"
    ],
    "isoCode": "pa"
  },
  {
    "id": "bahamas",
    "name": "바하마",
    "englishName": "Bahamas",
    "continent": "북아메리카",
    "capital": "나소",
    "population": "약 41만 명",
    "language": "영어",
    "flag": "🇧🇸",
    "climate": "열대 아열대 기후",
    "climateDesc": "멕시코만류의 영향으로 연중 온화하고 쾌적하며, 겨울철에도 따뜻한 날씨가 유지됩니다.",
    "geoFeatures": "낮고 평평한 산호초 섬들",
    "specialFeature": "700여 개의 섬과 수천 개의 암초로 이루어져 있으며, 투명한 바다와 아름다운 해변으로 유명한 휴양지입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 150,
      "y": 210
    },
    "latitude": "북위 25° 04'",
    "longitude": "서경 77° 20'",
    "elevation": "평균 해발고도 약 5m",
    "geographicRegion": "카리브해 섬나라",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "안드로스 섬",
      "엑수마 제도",
      "딘스 블루홀"
    ],
    "naturalEnvironment": "대부분 평탄한 산호초 지형으로 이루어져 있으며, 세계에서 가장 깊은 블루홀 중 하나인 딘스 블루홀과 맑은 산호초 바다가 특징입니다.",
    "famousLandmarks": [
      "아틀란티스 파라다이스 아일랜드",
      "핑크 샌드 비치",
      "딘스 블루홀"
    ],
    "isoCode": "bs"
  },
  {
    "id": "dominican",
    "name": "도미니카 공화국",
    "englishName": "Dominican Republic",
    "continent": "북아메리카",
    "capital": "산토도밍고",
    "population": "약 1,130만 명",
    "language": "스페인어",
    "flag": "🇩🇴",
    "climate": "열대 사바나 기후",
    "climateDesc": "무역풍의 영향으로 연중 따뜻하며, 고지대는 비교적 서늘하고 해안가는 덥고 습합니다.",
    "geoFeatures": "험준한 산맥과 비옥한 분지",
    "specialFeature": "이스파니올라 섬의 동쪽을 차지하고 있으며, 아메리카 대륙에서 유럽인이 세운 최초의 도시인 산토도밍고가 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 170,
      "y": 235
    },
    "latitude": "북위 18° 28'",
    "longitude": "서경 69° 53'",
    "elevation": "평균 해발고도 약 420m",
    "geographicRegion": "카리브해 섬나라",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "두아르테 봉",
      "엔리키요 호수",
      "사마나 반도"
    ],
    "naturalEnvironment": "카리브해 최고봉인 두아르테 봉과 해수면보다 낮은 엔리키요 호수가 공존하며, 아름다운 백사장 해안선이 발달해 있습니다.",
    "famousLandmarks": [
      "산토도밍고 역사 지구",
      "푼타 카나 해변",
      "사마나 만"
    ],
    "isoCode": "do"
  },
  {
    "id": "brazil",
    "name": "브라질",
    "englishName": "Brazil",
    "continent": "남아메리카",
    "capital": "브라질리아",
    "population": "약 2억 1,600만 명",
    "language": "포르투갈어",
    "flag": "🇧🇷",
    "climate": "열대 우림 및 사바나 기후",
    "climateDesc": "북부 아마존 분지는 연중 고온 다습한 열대 우림 기후를 보이며, 중부 고원 지대는 건기와 우기가 뚜렷한 사바나 기후를 띱니다.",
    "geoFeatures": "아마존 분지와 브라질 고원",
    "specialFeature": "남아메리카 대륙의 거의 절반을 차지하는 최대 국가로, 세계 최대의 열대우림인 아마존과 삼바 축제로 유명합니다.",
    "surroundingCountries": [
      "아르헨티나",
      "우루과이",
      "파라과이",
      "볼리비아",
      "페루",
      "콜롬비아",
      "베네수엘라"
    ],
    "mapCoords": {
      "x": 230,
      "y": 350
    },
    "latitude": "남위 15° 47'",
    "longitude": "서경 47° 52'",
    "elevation": "평균 해발고도 약 320m",
    "geographicRegion": "남아메리카",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "아마존강 분지",
      "브라질 고원",
      "판타날 습지"
    ],
    "naturalEnvironment": "세계 최대의 수량을 자랑하는 아마존강 수계와 지구의 허파라 불리는 아마존 열대우림, 그리고 세계 최대의 범람 습지인 판타날이 있습니다.",
    "famousLandmarks": [
      "구세주 그리스도상",
      "이구아수 폭포",
      "아마존 열대우림"
    ],
    "isoCode": "br"
  },
  {
    "id": "argentina",
    "name": "아르헨티나",
    "englishName": "Argentina",
    "continent": "남아메리카",
    "capital": "부에노스아이레스",
    "population": "약 4,600만 명",
    "language": "스페인어",
    "flag": "🇦🇷",
    "climate": "온대 및 한랭 기후",
    "climateDesc": "북부는 아열대 기후, 중부 팜파스는 온화한 온대 기후를 보이며, 남부 파타고니아는 한랭하고 건조한 기후가 나타납니다.",
    "geoFeatures": "안데스 산맥과 팜파스 평원",
    "specialFeature": "남북으로 길게 뻗은 영토 덕분에 극적인 자연경관을 자랑하며, 탱고의 발상지이자 세계적인 소고기 수출국입니다.",
    "surroundingCountries": [
      "칠레",
      "볼리비아",
      "파라과이",
      "브라질",
      "우루과이"
    ],
    "mapCoords": {
      "x": 210,
      "y": 440
    },
    "latitude": "남위 34° 36'",
    "longitude": "서경 58° 22'",
    "elevation": "평균 해발고도 약 595m",
    "geographicRegion": "남아메리카",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "안데스 산맥",
      "팜파스 평원",
      "파타고니아 고원"
    ],
    "naturalEnvironment": "서쪽의 거대한 안데스 산맥과 동쪽의 광활한 팜파스 초원지대, 그리고 남부의 빙하 지대와 리오데라플라타 강 수계가 특징입니다.",
    "famousLandmarks": [
      "페리토 모레노 빙하",
      "이구아수 폭포",
      "아콩카구아 산"
    ],
    "isoCode": "ar"
  },
  {
    "id": "chile",
    "name": "칠레",
    "englishName": "Chile",
    "continent": "남아메리카",
    "capital": "산티아고",
    "population": "약 1,960만 명",
    "language": "스페인어",
    "flag": "🇨🇱",
    "climate": "다양한 기후 (사막, 지중해성, 온대성 기후)",
    "climateDesc": "북부는 세계에서 가장 건조한 아타카마 사막이 위치하며, 중부는 온화한 지중해성 기후, 남부는 한랭 비가 많은 기후를 보입니다.",
    "geoFeatures": "안데스 산맥과 긴 해안선",
    "specialFeature": "남북으로 약 4,300km에 달하는 세계에서 가장 길고 좁은 국토를 가지고 있습니다.",
    "surroundingCountries": [
      "페루",
      "볼리비아",
      "아르헨티나"
    ],
    "mapCoords": {
      "x": 190,
      "y": 440
    },
    "latitude": "남위 33° 27'",
    "longitude": "서경 70° 40'",
    "elevation": "평균 해발고도 1,871m",
    "geographicRegion": "남아메리카 서부 안데스 지역",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "안데스 산맥",
      "아타카마 사막",
      "파타고니아 빙하"
    ],
    "naturalEnvironment": "태평양과 접한 긴 해안선과 안데스 산맥에서 발원한 급류 하천들이 특징이며, 남부에는 피오르드 지형과 빙하가 발달해 있습니다.",
    "famousLandmarks": [
      "토레스 델 파이네 국립공원",
      "이스터 섬",
      "아타카마 사막 달의 계곡"
    ],
    "isoCode": "cl"
  },
  {
    "id": "peru",
    "name": "페루",
    "englishName": "Peru",
    "continent": "남아메리카",
    "capital": "리마",
    "population": "약 3,430만 명",
    "language": "스페인어, 케추아어, 아이마라어",
    "flag": "🇵🇪",
    "climate": "건조 기후 및 고산 기후",
    "climateDesc": "해안가는 한류의 영향으로 건조한 사막 기후를 띠며, 안데스 고산 지대는 서늘하고 동부 아마존 지역은 고온 다습한 열대 우림 기후입니다.",
    "geoFeatures": "안데스 고원과 아마존 열대우림",
    "specialFeature": "고대 잉카 제국의 발상지로, 안데스 산맥 고지대에 찬란한 역사적 유적들이 보존되어 있습니다.",
    "surroundingCountries": [
      "에콰도르",
      "콜롬비아",
      "브라질",
      "볼리비아",
      "칠레"
    ],
    "mapCoords": {
      "x": 170,
      "y": 350
    },
    "latitude": "남위 12° 02'",
    "longitude": "서경 77° 01'",
    "elevation": "평균 해발고도 1,555m",
    "geographicRegion": "남아메리카 서부",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "안데스 산맥",
      "아마존 분지",
      "티티카카 호수"
    ],
    "naturalEnvironment": "서부의 건조한 태평양 연안, 중부의 험준한 안데스 고원, 동부의 울창한 아마존 우림과 수계가 공존하는 생물 다양성의 보고입니다.",
    "famousLandmarks": [
      "마추픽추",
      "나스카 라인",
      "티티카카 호수"
    ],
    "isoCode": "pe"
  },
  {
    "id": "colombia",
    "name": "콜롬비아",
    "englishName": "Colombia",
    "continent": "남아메리카",
    "capital": "보고타",
    "population": "약 5,200만 명",
    "language": "스페인어",
    "flag": "🇨🇴",
    "climate": "열대 기후 및 고산 기후",
    "climateDesc": "저지대는 고온 다습한 열대 기후를 나타내지만, 안데스 산맥의 고도에 따라 온대 및 한랭한 고산 기후가 나타납니다.",
    "geoFeatures": "안데스 산맥과 카리브해, 태평양 연안",
    "specialFeature": "남아메리카에서 유일하게 태평양과 카리브해 해안선을 모두 보유한 국가입니다.",
    "surroundingCountries": [
      "파나마",
      "베네수엘라",
      "브라질",
      "페루",
      "에콰도르"
    ],
    "mapCoords": {
      "x": 170,
      "y": 290
    },
    "latitude": "북위 4° 35'",
    "longitude": "서경 74° 04'",
    "elevation": "평균 해발고도 593m",
    "geographicRegion": "남아메리카 북서부",
    "hemisphere": "북반구와 남반구에 걸침, 서반구",
    "majorLandforms": [
      "안데스 산맥",
      "오리노코강 분지",
      "카리브해 연안 저지대"
    ],
    "naturalEnvironment": "안데스 산맥의 세 갈래 분기점과 아마존 및 오리노코 수계가 흐르며, 풍부한 강수량 덕분에 세계적인 생물 다양성을 자랑합니다.",
    "famousLandmarks": [
      "보고타 황금 박물관",
      "카르타헤나 성벽 도시",
      "카뇨 크리스탈레스"
    ],
    "isoCode": "co"
  },
  {
    "id": "venezuela",
    "name": "베네수엘라",
    "englishName": "Venezuela",
    "continent": "남아메리카",
    "capital": "카라카스",
    "population": "약 2,900만 명",
    "language": "스페인어",
    "flag": "🇻🇪",
    "climate": "열대 사바나 기후",
    "climateDesc": "대부분 지역이 고온 다습한 열대 기후에 속하며, 우기와 건기가 뚜렷한 사바나 기후가 넓게 나타납니다.",
    "geoFeatures": "기아나 고원과 오리노코강 분지",
    "specialFeature": "세계에서 가장 높은 폭포인 앙헬 폭포와 풍부한 석유 매장량으로 유명합니다.",
    "surroundingCountries": [
      "브라질",
      "콜롬비아"
    ],
    "mapCoords": {
      "x": 200,
      "y": 280
    },
    "latitude": "북위 10° 30'",
    "longitude": "서경 66° 55'",
    "elevation": "평균 해발고도 450m",
    "geographicRegion": "남아메리카 북부",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "기아나 고원",
      "오리노코강",
      "마라카이보호"
    ],
    "naturalEnvironment": "북부 카리브해 연안과 오리노코강 수계, 남동부의 거대한 테이블 마운틴(테푸이)이 어우러진 독특한 생태계를 형성하고 있습니다.",
    "famousLandmarks": [
      "앙헬 폭포",
      "카나이마 국립공원",
      "로스 로케스 제도"
    ],
    "isoCode": "ve"
  },
  {
    "id": "ecuador",
    "name": "에콰도르",
    "englishName": "Ecuador",
    "continent": "남아메리카",
    "capital": "키토",
    "population": "약 1,800만 명",
    "language": "스페인어",
    "flag": "🇪🇨",
    "climate": "열대 우림 및 고산 기후",
    "climateDesc": "적도가 통과하여 저지대는 고온 다습한 열대 기후를 보이나, 안데스 고지대는 연중 봄과 같은 온화한 기후를 유지합니다.",
    "geoFeatures": "안데스 화산대와 갈라파고스 제도",
    "specialFeature": "국명이 스페인어로 '적도'를 뜻하며, 고유종의 천국인 갈라파고스 제도를 영토로 두고 있습니다.",
    "surroundingCountries": [
      "콜롬비아",
      "페루"
    ],
    "mapCoords": {
      "x": 150,
      "y": 310
    },
    "latitude": "남위 0° 13'",
    "longitude": "서경 78° 30'",
    "elevation": "평균 해발고도 1,117m",
    "geographicRegion": "남아메리카 북서부",
    "hemisphere": "북반구와 남반구에 걸침, 서반구",
    "majorLandforms": [
      "안데스 산맥",
      "코토팍시 화산",
      "갈라파고스 제도"
    ],
    "naturalEnvironment": "안데스 산맥의 활화산 지대와 태평양 연안 저지대, 그리고 육지와 격리되어 독자적으로 진화한 갈라파고스 제도의 해양 생태계가 특징입니다.",
    "famousLandmarks": [
      "갈라파고스 제도",
      "코토팍시 국립공원",
      "키토 구시가지"
    ],
    "isoCode": "ec"
  },
  {
    "id": "bolivia",
    "name": "볼리비아",
    "englishName": "Bolivia",
    "continent": "남아메리카",
    "capital": "수크레",
    "population": "약 1,230만 명",
    "language": "스페인어, 케추아어, 아이마라어",
    "flag": "🇧🇴",
    "climate": "고산 기후 및 열대 사바나 기후",
    "climateDesc": "서부 알티플라노 고원은 춥고 건조한 고산 기후를 띠며, 동부 저지대는 고온 다습한 열대 기후를 보입니다.",
    "geoFeatures": "알티플라노 고원과 안데스 산맥",
    "specialFeature": "남아메리카의 대표적인 내륙국으로, 세계에서 가장 넓은 소금 사막인 우유니 소금평원을 보유하고 있습니다.",
    "surroundingCountries": [
      "브라질",
      "페루",
      "칠레",
      "아르헨티나",
      "파라과이"
    ],
    "mapCoords": {
      "x": 200,
      "y": 380
    },
    "latitude": "남위 19° 02'",
    "longitude": "서경 65° 15'",
    "elevation": "평균 해발고도 1,192m",
    "geographicRegion": "남아메리카 중부 내륙",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "알티플라노 고원",
      "우유니 소금사막",
      "티티카카 호수"
    ],
    "naturalEnvironment": "안데스 산맥 사이의 거대한 고원 지대와 동부 아마존 분지로 이어지는 급격한 경사면, 그리고 거대한 내륙 호수와 소금 평원이 발달해 있습니다.",
    "famousLandmarks": [
      "우유니 소금사막",
      "티티카카 호수",
      "티아우아나코 유적"
    ],
    "isoCode": "bo"
  },
  {
    "id": "uruguay",
    "name": "우루과이",
    "englishName": "Uruguay",
    "continent": "남아메리카",
    "capital": "몬테비데오",
    "population": "약 340만 명",
    "language": "스페인어",
    "flag": "🇺🇾",
    "climate": "온난 습윤 기후",
    "climateDesc": "사계절이 뚜렷하고 연중 온화하며, 강수량이 연중 고르게 분포하여 농업과 목축업에 유리합니다.",
    "geoFeatures": "완만한 구릉지와 넓은 초원",
    "specialFeature": "남아메리카에서 영토 대부분이 평탄한 구릉지와 초원(팜파스)으로 이루어진 평화로운 국가입니다.",
    "surroundingCountries": [
      "아르헨티나",
      "브라질"
    ],
    "mapCoords": {
      "x": 250,
      "y": 440
    },
    "latitude": "남위 34° 53'",
    "longitude": "서경 56° 10'",
    "elevation": "평균 해발고도 109m",
    "geographicRegion": "남아메리카 남동부",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "팜파스 초원",
      "우루과이강",
      "라플라타강 에스추어리"
    ],
    "naturalEnvironment": "대부분의 영토가 완만한 구릉성 초원지대로 이루어져 있으며, 남쪽으로는 거대한 라플라타강 하구와 대서양 해안선이 이어집니다.",
    "famousLandmarks": [
      "콜로니아 델 새크라멘토",
      "푼타 델 에스테",
      "몬테비데오 독립 광장"
    ],
    "isoCode": "uy"
  },
  {
    "id": "paraguay",
    "name": "파라과이",
    "englishName": "Paraguay",
    "continent": "남아메리카",
    "capital": "아순시온",
    "population": "약 680만 명",
    "language": "스페인어, 과라니어",
    "flag": "🇵🇾",
    "climate": "아열대 및 열대 사바나 기후",
    "climateDesc": "동부는 온화하고 강수량이 풍부한 아열대 기후를 보이나, 서부 차코 지역은 덥고 건조한 기후가 나타납니다.",
    "geoFeatures": "파라과이강과 그란차코 평원",
    "specialFeature": "남아메리카의 심장으로 불리는 내륙국으로, 원주민 언어인 과라니어가 스페인어와 함께 널리 사용됩니다.",
    "surroundingCountries": [
      "아르헨티나",
      "브라질",
      "볼리비아"
    ],
    "mapCoords": {
      "x": 230,
      "y": 400
    },
    "latitude": "남위 25° 16'",
    "longitude": "서경 57° 40'",
    "elevation": "평균 해발고도 178m",
    "geographicRegion": "남아메리카 중부 내륙",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "파라과이강",
      "파라나강",
      "그란차코 평원"
    ],
    "naturalEnvironment": "국토를 남북으로 가르는 파라과이강을 중심으로 서부의 건조한 가시숲 지대와 동부의 습윤한 구릉 및 삼림 지대로 나뉩니다.",
    "famousLandmarks": [
      "헤수스 타바랑게 예수회 선교단 유적",
      "이타이푸 댐",
      "아순시온 대성당"
    ],
    "isoCode": "py"
  },
  {
    "id": "australia",
    "name": "호주",
    "englishName": "Australia",
    "continent": "오세아니아",
    "capital": "캔버라",
    "population": "약 2,600만 명",
    "language": "영어",
    "flag": "🇦🇺",
    "climate": "건조 기후 및 온대 기후",
    "climateDesc": "국토의 70% 이상이 건조하거나 반건조한 사막 기후이며, 남동부와 남서부 연안은 온화한 온대 기후를 나타냅니다.",
    "geoFeatures": "거대한 사막과 그레이트디바이딩 산맥",
    "specialFeature": "하나의 대륙 전체를 영토로 차지하는 유일한 국가로, 캥거루와 코알라 등 독특한 유대류 생태계가 발달했습니다.",
    "surroundingCountries": [
      "인도네시아",
      "파푸아뉴기니"
    ],
    "mapCoords": {
      "x": 720,
      "y": 400
    },
    "latitude": "남위 35° 18'",
    "longitude": "동경 149° 07'",
    "elevation": "평균 해발고도 330m",
    "geographicRegion": "오세아니아 대륙",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "그레이트디바이딩 산맥",
      "그레이트샌디 사막",
      "그레이트 배리어 리프"
    ],
    "naturalEnvironment": "내륙의 광활한 붉은 사막(아웃백)과 동부 해안의 세계 최대 산호초 지대인 그레이트 배리어 리프, 그리고 독특한 고유종 생태계가 특징입니다.",
    "famousLandmarks": [
      "시드니 오페라 하우스",
      "울루루 (에어즈 록)",
      "그레이트 배리어 리프"
    ],
    "isoCode": "au"
  },
  {
    "id": "papuanewguinea",
    "name": "파푸아뉴기니",
    "englishName": "Papua New Guinea",
    "continent": "오세아니아",
    "capital": "포트모르즈비",
    "population": "약 1,000만 명",
    "language": "톡 피신, 영어, 히리 모투",
    "flag": "🇵🇬",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온 다습하며 강수량이 매우 많은 전형적인 열대 우림 기후를 보입니다.",
    "geoFeatures": "험준한 산악 지대와 열대 우림",
    "specialFeature": "세계에서 가장 언어적 다양성이 높은 나라 중 하나로, 800개 이상의 부족 언어가 사용됩니다.",
    "surroundingCountries": [
      "인도네시아"
    ],
    "mapCoords": {
      "x": 740,
      "y": 350
    },
    "latitude": "남위 9° 28'",
    "longitude": "동경 147° 11'",
    "elevation": "평균 해발고도 667m",
    "geographicRegion": "오세아니아 멜라네시아",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "뉴기니 고원",
      "세픽강",
      "빌헬름산"
    ],
    "naturalEnvironment": "험준한 중앙 산맥과 울창한 열대 우림, 그리고 수많은 섬과 산호초로 둘러싸인 복잡한 해안선 및 강 하구 생태계를 가지고 있습니다.",
    "famousLandmarks": [
      "빌헬름 산",
      "세픽 강",
      "코코다 트랙"
    ],
    "isoCode": "pg"
  },
  {
    "id": "fiji",
    "name": "피지",
    "englishName": "Fiji",
    "continent": "오세아니아",
    "capital": "수바",
    "population": "약 93만 명",
    "language": "영어, 피지어, 피지 힌디어",
    "flag": "🇫🇯",
    "climate": "열대 해양성 기후",
    "climateDesc": "연중 따뜻하고 습하며, 무역풍의 영향으로 기온이 온화하게 유지됩니다. 11월부터 4월 사이에는 사이클론이 발생하기도 합니다.",
    "geoFeatures": "화산섬과 산호초 군락",
    "specialFeature": "멜라네시아와 폴리네시아 문화가 융합된 독특한 전통을 지니고 있습니다. 세계적인 다이빙 명소와 아름다운 산호초 바다로 유명합니다.",
    "surroundingCountries": [
      "바누아투",
      "통가"
    ],
    "mapCoords": {
      "x": 770,
      "y": 380
    },
    "latitude": "남위 18° 10'",
    "longitude": "동경 178° 27'",
    "elevation": "평균 해발고도 약 100m",
    "geographicRegion": "멜라네시아",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "토마니비 산",
      "시가토카 모래언덕",
      "그레이트 아스트롤라베 산호초"
    ],
    "naturalEnvironment": "울창한 열대우림과 산호초 장벽으로 둘러싸여 있으며, 리와 강을 비롯한 짧고 가파른 하천들이 발달해 있습니다.",
    "famousLandmarks": [
      "마마누카 제도",
      "야사와 제도",
      "시가토카 모래언덕 국립공원"
    ],
    "isoCode": "fj"
  },
  {
    "id": "samoa",
    "name": "사모아",
    "englishName": "Samoa",
    "continent": "오세아니아",
    "capital": "아피아",
    "population": "약 22만 명",
    "language": "사모아어, 영어",
    "flag": "🇼🇸",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온다습하며 계절 변화가 적습니다. 11월부터 4월까지는 우기로 강수량이 많고 사이클론이 자주 발생합니다.",
    "geoFeatures": "화산 활동으로 형성된 험준한 산악 지형",
    "specialFeature": "폴리네시아의 심장으로 불리며, 전통적인 사회 규범인 '파 사모아(Fa'a Samoa)'를 엄격히 보존하고 있습니다.",
    "surroundingCountries": [
      "통가"
    ],
    "mapCoords": {
      "x": 800,
      "y": 370
    },
    "latitude": "남위 13° 50'",
    "longitude": "서경 171° 45'",
    "elevation": "평균 해발고도 약 300m",
    "geographicRegion": "폴리네시아",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "실리실리 산",
      "토 수아 오션 트렌치",
      "랄로마누 해변"
    ],
    "naturalEnvironment": "화산 폭발로 형성된 비옥한 토양과 울창한 열대우림이 특징이며, 해안가는 산호초와 석호로 둘러싸여 있습니다.",
    "famousLandmarks": [
      "토 수아 오션 트렌치",
      "랄로마누 해변",
      "로버트 루이스 스티븐슨 박물관"
    ],
    "isoCode": "ws"
  },
  {
    "id": "tonga",
    "name": "통가",
    "englishName": "Tonga",
    "continent": "오세아니아",
    "capital": "누쿠알로파",
    "population": "약 10만 명",
    "language": "통가어, 영어",
    "flag": "🇹🇴",
    "climate": "열대 해양성 기후",
    "climateDesc": "남동 무역풍의 영향으로 비교적 온화하며, 북쪽 섬들은 남쪽보다 더 덥고 습합니다.",
    "geoFeatures": "석회암 기반의 평평한 섬들과 화산섬 체인",
    "specialFeature": "태평양 유일의 세습 군주국으로, 식민지 지배를 받지 않은 독특한 역사적 자부심을 가지고 있습니다.",
    "surroundingCountries": [
      "피지",
      "사모아"
    ],
    "mapCoords": {
      "x": 790,
      "y": 390
    },
    "latitude": "남위 21° 08'",
    "longitude": "서경 175° 12'",
    "elevation": "평균 해발고도 약 50m",
    "geographicRegion": "폴리네시아",
    "hemisphere": "남반구, 서반구",
    "majorLandforms": [
      "카오 화산",
      "마푸아 아 바카 분기공",
      "에우아 섬의 절벽"
    ],
    "naturalEnvironment": "서쪽의 활발한 화산대와 동쪽의 비옥한 산호초 섬들로 구성되어 있으며, 해양 생태계가 매우 풍부합니다.",
    "famousLandmarks": [
      "마푸아 아 바카 분기공",
      "하아몽가 아 마우이 삼석탑",
      "통가타푸 왕궁"
    ],
    "isoCode": "to"
  },
  {
    "id": "vanuatu",
    "name": "바누아투",
    "englishName": "Vanuatu",
    "continent": "오세아니아",
    "capital": "포트빌라",
    "population": "약 33만 명",
    "language": "비슬라마어, 영어, 프랑스어",
    "flag": "🇻🇺",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온다습하며 남동 무역풍의 영향을 받습니다. 북부는 열대 우림 기후, 남부는 아열대 기후에 가깝습니다.",
    "geoFeatures": "환태평양 조산대에 위치한 활화산 섬들",
    "specialFeature": "세계에서 가장 접근하기 쉬운 활화산인 야수르 산이 있으며, 번지점프의 기원이 된 '골(Gol)' 의식이 유명합니다.",
    "surroundingCountries": [
      "솔로몬 제도",
      "피지"
    ],
    "mapCoords": {
      "x": 750,
      "y": 370
    },
    "latitude": "남위 17° 44'",
    "longitude": "동경 168° 19'",
    "elevation": "평균 해발고도 약 200m",
    "geographicRegion": "멜라네시아",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "야수르 산",
      "타부르마사나 산",
      "블루 홀"
    ],
    "naturalEnvironment": "가파른 화산 지형과 울창한 열대우림이 발달해 있으며, 해안선은 산호초와 깊은 해구로 둘러싸여 있습니다.",
    "famousLandmarks": [
      "야수르 산",
      "밀리언 달러 포인트",
      "에스피리투 산토 블루 홀"
    ],
    "isoCode": "vu"
  },
  {
    "id": "solomonislands",
    "name": "솔로몬 제도",
    "englishName": "Solomon Islands",
    "continent": "오세아니아",
    "capital": "호니아라",
    "population": "약 74만 명",
    "language": "영어",
    "flag": "🇸🇧",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온다습하며 계절에 따른 기온 변화가 거의 없습니다. 11월부터 4월까지 몬순 기후의 영향을 받습니다.",
    "geoFeatures": "험준한 화산섬과 산호초 섬들의 사슬",
    "specialFeature": "제2차 세계대전 당시 과달카날 전투의 격전지였으며, 풍부한 해양 생물 다양성을 자랑합니다.",
    "surroundingCountries": [
      "파푸아뉴기니",
      "바누아투"
    ],
    "mapCoords": {
      "x": 760,
      "y": 350
    },
    "latitude": "남위 9° 26'",
    "longitude": "동경 159° 57'",
    "elevation": "평균 해발고도 약 150m",
    "geographicRegion": "멜라네시아",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "포포마나세우 산",
      "마로보 석호",
      "테노아루 폭포"
    ],
    "naturalEnvironment": "국토의 대부분이 울창한 열대우림으로 덮여 있으며, 세계 최대 규모의 염수 석호인 마로보 석호가 있습니다.",
    "famousLandmarks": [
      "마로보 석호",
      "과달카날 전적지",
      "케네디 섬"
    ],
    "isoCode": "sb"
  },
  {
    "id": "micronesia",
    "name": "미크로네시아 연방",
    "englishName": "Micronesia",
    "continent": "오세아니아",
    "capital": "팔리키르",
    "population": "약 11만 명",
    "language": "영어",
    "flag": "🇫🇲",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온다습하며 세계에서 가장 강수량이 많은 지역 중 하나입니다. 무역풍이 불어 열기를 식혀줍니다.",
    "geoFeatures": "고지대 화산섬과 저지대 산호초 환초",
    "specialFeature": "수중 유적지인 난마돌이 있으며, 야프 섬의 거대한 돌돈(Stone Money) 문화가 유명합니다.",
    "surroundingCountries": [
      "팔라우"
    ],
    "mapCoords": {
      "x": 750,
      "y": 310
    },
    "latitude": "북위 6° 55'",
    "longitude": "동경 158° 11'",
    "elevation": "평균 해발고도 약 50m",
    "geographicRegion": "미크로네시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "나나라우드 산",
      "추크 석호",
      "난마돌 유적지"
    ],
    "naturalEnvironment": "수많은 환초와 석호로 이루어져 있으며, 맹그로브 숲과 풍부한 산호초 생태계가 잘 보존되어 있습니다.",
    "famousLandmarks": [
      "난마돌 수중 유적",
      "추크 석호 난파선 다이빙 사이트",
      "야프 섬 돌돈 은행"
    ],
    "isoCode": "fm"
  },
  {
    "id": "palau",
    "name": "팔라우",
    "englishName": "Palau",
    "continent": "오세아니아",
    "capital": "응게룰무드",
    "population": "약 1만 8,000명",
    "language": "팔라우어, 영어",
    "flag": "🇵🇼",
    "climate": "열대 우림 기후",
    "climateDesc": "연중 고온다습하며 평균 기온은 약 27도입니다. 태풍의 주 경로에서 벗어나 있어 비교적 안전합니다.",
    "geoFeatures": "석회암으로 이루어진 락 아일랜드와 화산섬",
    "specialFeature": "세계 최초로 상어 보호구역을 지정했으며, 독이 없는 해파리들과 수영할 수 있는 젤리피쉬 레이크가 유명합니다.",
    "surroundingCountries": [
      "필리핀"
    ],
    "mapCoords": {
      "x": 720,
      "y": 320
    },
    "latitude": "북위 7° 30'",
    "longitude": "동경 134° 37'",
    "elevation": "평균 해발고도 약 80m",
    "geographicRegion": "미크로네시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "네르겔추스 산",
      "락 아일랜드",
      "젤리피쉬 레이크"
    ],
    "naturalEnvironment": "버섯 모양의 독특한 석회암 섬들이 군락을 이루고 있으며, 세계 최고 수준의 해양 생물 다양성을 보유하고 있습니다.",
    "famousLandmarks": [
      "락 아일랜드",
      "젤리피쉬 레이크",
      "블루 코너"
    ],
    "isoCode": "pw"
  },
  {
    "id": "ie",
    "name": "아일랜드",
    "englishName": "Ireland",
    "continent": "유럽",
    "capital": "더블린",
    "population": "약 510만 명",
    "language": "아일랜드어, 영어",
    "flag": "🏳️",
    "climate": "서안 해양성 기후",
    "climateDesc": "북대서양 해류의 영향으로 겨울은 온화하고 여름은 서늘합니다. 연중 비가 자주 내리는 편입니다.",
    "geoFeatures": "중앙 평원과 이를 둘러싼 해안 고지대",
    "specialFeature": "푸른 초원이 넓게 펼쳐져 있어 '에메랄드 섬'이라는 별칭을 가지고 있으며, 켈트 문화의 발상지입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 53° 20'",
    "longitude": "서경 6° 15'",
    "elevation": "평균 해발고도 약 118m",
    "geographicRegion": "서유럽",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "카란투힐 산",
      "모허 절벽",
      "섀넌 강"
    ],
    "naturalEnvironment": "중앙의 저지대 평원과 이탄지, 그리고 서부 해안의 웅장한 절벽 지형이 조화를 이루며 섀넌 강이 내륙 수계를 형성합니다.",
    "famousLandmarks": [
      "모허 절벽",
      "기네스 스토어하우스",
      "트리니티 칼리지 도서관"
    ],
    "isoCode": "ie"
  },
  {
    "id": "dk",
    "name": "덴마크",
    "englishName": "Denmark",
    "continent": "유럽",
    "capital": "코펜하겐",
    "population": "약 590만 명",
    "language": "덴마크어",
    "flag": "🏳️",
    "climate": "서안 해양성 기후",
    "climateDesc": "겨울은 위도에 비해 온화하고 여름은 서늘합니다. 바람이 많이 불고 날씨 변화가 잦습니다.",
    "geoFeatures": "빙하 작용으로 형성된 평탄한 구릉 지형",
    "specialFeature": "유틀란트 반도와 수많은 섬으로 이루어져 있으며, 자전거 친화적인 문화와 '휘게(Hygge)' 라이프스타일로 유명합니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 55° 40'",
    "longitude": "동경 12° 34'",
    "elevation": "평균 해발고도 약 34m",
    "geographicRegion": "북유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "이딩 스코우호이 언덕",
      "유틀란트 반도",
      "셸란 섬"
    ],
    "naturalEnvironment": "산이 없고 평평한 지형이 대부분이며, 길고 복잡한 해안선과 모래언덕, 석호가 발달해 있습니다.",
    "famousLandmarks": [
      "뉘하운 운하",
      "인어공주 동상",
      "티볼리 공원"
    ],
    "isoCode": "dk"
  },
  {
    "id": "lu",
    "name": "룩셈부르크",
    "englishName": "Luxembourg",
    "continent": "유럽",
    "capital": "룩셈부르크",
    "population": "약 66만 명",
    "language": "룩셈부르크어, 프랑스어, 독일어",
    "flag": "🏳️",
    "climate": "온난 습윤 기후 및 서안 해양성 기후",
    "climateDesc": "대서양의 영향으로 온화한 겨울과 서늘한 여름을 보입니다. 연중 강수량이 고르게 분포합니다.",
    "geoFeatures": "북부 아르덴 고원과 남부 구릉성 평야",
    "specialFeature": "세계에서 유일하게 대공이 통치하는 대공국이며, 1인당 GDP가 세계 최고 수준인 금융 중심지입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 49° 36'",
    "longitude": "동경 6° 07'",
    "elevation": "평균 해발고도 약 325m",
    "geographicRegion": "서유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "크네프 언덕",
      "알제트 강",
      "모젤 계곡"
    ],
    "naturalEnvironment": "북부는 아르덴 고원의 울창한 삼림과 계곡으로 이루어져 있고, 남부는 비옥한 농지와 모젤 강의 포도밭이 펼쳐져 있습니다.",
    "famousLandmarks": [
      "룩셈부르크 요새",
      "아돌프 다리",
      "비안덴 성"
    ],
    "isoCode": "lu"
  },
  {
    "id": "si",
    "name": "슬로베니아",
    "englishName": "Slovenia",
    "continent": "유럽",
    "capital": "류블랴나",
    "population": "약 211만 명",
    "language": "슬로베니아어",
    "flag": "🏳️",
    "climate": "온대 습윤 기후 및 대륙성 기후",
    "climateDesc": "해안가는 온화한 지중해성 기후를 보이나, 내륙은 전형적인 대륙성 기후와 알프스 고산 기후가 나타납니다. 사계절이 뚜렷하며 강수량이 연중 고르게 분포합니다.",
    "geoFeatures": "알프스 산맥과 카르스트 지형",
    "specialFeature": "세계적으로 유명한 포스토이나 동굴 등 카르스트(Karst) 지형의 어원이 된 지역이 존재합니다. 국토의 60% 이상이 숲으로 둘러싸인 친환경 국가입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 46° 03'",
    "longitude": "동경 14° 30'",
    "elevation": "평균 해발고도 492m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "줄리앙 알프스 산맥",
      "사바 강",
      "트리글라브 산"
    ],
    "naturalEnvironment": "알프스 고산 지대와 아드리아해 연안의 좁은 해안선, 그리고 석회암 지대의 풍부한 지하수계가 특징입니다.",
    "famousLandmarks": [
      "블레드 호수",
      "포스토이나 동굴",
      "트리글라브 국립공원"
    ],
    "isoCode": "si"
  },
  {
    "id": "pt",
    "name": "포르투갈",
    "englishName": "Portugal",
    "continent": "유럽",
    "capital": "리스본",
    "population": "약 1,024만 명",
    "language": "포르투갈어",
    "flag": "🏳️",
    "climate": "지중해성 기후",
    "climateDesc": "여름은 고온 건조하고 겨울은 온화하고 습한 전형적인 지중해성 기후를 보입니다. 대서양의 영향으로 북부는 비교적 서늘하고 강수량이 많습니다.",
    "geoFeatures": "이베리아반도 서부 해안 지대와 고원",
    "specialFeature": "유럽 대륙의 최서단인 호카곶이 위치해 있어 과거 대항해시대의 중심지 역할을 했습니다. 대서양의 아조레스 제도와 마데이라 제도를 영토로 포함하고 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 38° 43'",
    "longitude": "서경 9° 08'",
    "elevation": "평균 해발고도 372m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 서반구",
    "majorLandforms": [
      "테주 강",
      "세라 드 에스트렐라 산맥",
      "도우루 강"
    ],
    "naturalEnvironment": "서쪽과 남쪽으로 길게 뻗은 대서양 해안선과 내륙의 구릉지, 그리고 스페인에서 흘러오는 대형 하천들이 발달해 있습니다.",
    "famousLandmarks": [
      "호카곶",
      "벨렝탑",
      "페나 성"
    ],
    "isoCode": "pt"
  },
  {
    "id": "ad",
    "name": "안도라",
    "englishName": "Andorra",
    "continent": "유럽",
    "capital": "안도라라벨랴",
    "population": "약 8만 명",
    "language": "카탈루냐어",
    "flag": "🏳️",
    "climate": "고산성 기후",
    "climateDesc": "피레네산맥의 고지대에 위치하여 겨울에는 춥고 눈이 많이 내리며, 여름은 서늘하고 건조합니다. 고도에 따라 기온 차이가 크게 나타납니다.",
    "geoFeatures": "피레네산맥의 험준한 산악 지형",
    "specialFeature": "프랑스 대통령과 스페인 우르헬 주교가 공동 영주를 맡고 있는 독특한 정치 체제를 가진 미소국가입니다. 높은 고도 덕분에 겨울철 스키 관광업이 매우 발달해 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 42° 30'",
    "longitude": "동경 1° 31'",
    "elevation": "평균 해발고도 1,996m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "피레네 산맥",
      "코마 페드로사 산",
      "발리라 강"
    ],
    "naturalEnvironment": "험준한 산봉우리와 깊은 계곡으로 이루어진 전형적인 고산 생태계로, 삼림과 목초지가 풍부합니다.",
    "famousLandmarks": [
      "마드리우-페라피타-클라로르 계곡",
      "칼데아 온천 스파",
      "발노르드 스키 리조트"
    ],
    "isoCode": "ad"
  },
  {
    "id": "al",
    "name": "알바니아",
    "englishName": "Albania",
    "continent": "유럽",
    "capital": "티라나",
    "population": "약 283만 명",
    "language": "알바니아어",
    "flag": "🏳️",
    "climate": "지중해성 기후 및 대륙성 기후",
    "climateDesc": "해안가는 온화하고 습한 지중해성 기후를 띠지만, 내륙 산악 지대는 겨울에 매우 춥고 눈이 많이 내리는 대륙성 기후를 보입니다.",
    "geoFeatures": "디나르알프스 산맥과 아드리아해 연안 평원",
    "specialFeature": "유럽에서 이슬람교 비중이 높은 독특한 문화적 배경을 가지고 있으며, 오랫동안 폐쇄적인 공산 정권을 유지했던 역사가 있습니다. 아름다운 미개발 해변이 많아 '발칸의 몰디브'로 불립니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 41° 19'",
    "longitude": "동경 19° 49'",
    "elevation": "평균 해발고도 708m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "코라브 산",
      "블로레만",
      "오흐리드 호수"
    ],
    "naturalEnvironment": "아드리아해와 이오니아해를 접하는 긴 해안선과 험준한 석회암 산악 지대, 그리고 발칸반도 최대의 호수들을 공유하고 있습니다.",
    "famousLandmarks": [
      "부트린트 유적지",
      "베라트 역사 지구",
      "지록카스터 성"
    ],
    "isoCode": "al"
  },
  {
    "id": "mk",
    "name": "북마케도니아",
    "englishName": "North Macedonia",
    "continent": "유럽",
    "capital": "스코페",
    "population": "약 208만 명",
    "language": "마케도니아어",
    "flag": "🏳️",
    "climate": "과도기적 대륙성 기후",
    "climateDesc": "지중해성 기후와 대륙성 기후의 특징이 혼재되어 있어, 여름은 덥고 건조하며 겨울은 비교적 춥고 눈이 자주 내립니다.",
    "geoFeatures": "산악 분지와 깊은 계곡",
    "specialFeature": "그리스와의 오랜 국명 분쟁 끝에 2019년 '북마케도니아'로 국명을 변경하였습니다. 마더 테레사 수녀의 출생지이자 발칸반도에서 가장 오래된 호수인 오흐리드 호수를 품고 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 42° 00'",
    "longitude": "동경 21° 26'",
    "elevation": "평균 해발고도 741m",
    "geographicRegion": "남유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "바르다르 강",
      "코라브 산",
      "오흐리드 호수"
    ],
    "naturalEnvironment": "바다가 없는 내륙국으로, 국토의 대부분이 산악 지대이며 바르다르 강 유역을 중심으로 분지와 계곡이 발달해 있습니다.",
    "famousLandmarks": [
      "오흐리드 호수와 역사 지구",
      "스코페 돌다리",
      "마브로보 국립공원"
    ],
    "isoCode": "mk"
  },
  {
    "id": "tr",
    "name": "터키",
    "englishName": "Turkey",
    "continent": "아시아",
    "capital": "앙카라",
    "population": "약 8,500만 명",
    "language": "터키어",
    "flag": "🏳️",
    "climate": "지중해성 및 대륙성 기후",
    "climateDesc": "해안 지대는 온화한 지중해성 기후를 보이지만, 내륙의 아나톨리아 고원은 일교차가 크고 겨울에 매우 추운 대륙성 기후를 나타냅니다.",
    "geoFeatures": "아나톨리아 고원과 폰투스·타우루스 산맥",
    "specialFeature": "아시아와 유럽을 잇는 보스포루스 해협이 위치하여 동서양 문명의 교차로 역할을 해왔습니다. 카파도키아의 기암괴석과 파묵칼레의 석회화 단구 등 독특한 자연경관이 가득합니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 39° 55'",
    "longitude": "동경 32° 51'",
    "elevation": "평균 해발고도 1,132m",
    "geographicRegion": "서아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "아나톨리아 고원",
      "유프라테스 강",
      "아라라트 산"
    ],
    "naturalEnvironment": "삼면이 바다(흑해, 에게해, 지중해)로 둘러싸여 있으며, 내륙은 높은 고원과 험준한 산맥, 그리고 대규모 단층대가 발달해 있습니다.",
    "famousLandmarks": [
      "아야 소피아",
      "카파도키아",
      "파묵칼레"
    ],
    "isoCode": "tr"
  },
  {
    "id": "se",
    "name": "스웨덴",
    "englishName": "Sweden",
    "continent": "유럽",
    "capital": "스톡홀름",
    "population": "약 1,050만 명",
    "language": "스웨덴어",
    "flag": "🏳️",
    "climate": "냉대 습윤 기후",
    "climateDesc": "멕시코 만류의 영향으로 위도에 비해 온화한 편이나, 북부 지역은 겨울이 길고 매우 추운 아한대 기후를 보입니다.",
    "geoFeatures": "스칸디나비아산맥과 수많은 빙하호",
    "specialFeature": "국토의 절반 이상이 삼림으로 덮여 있으며, 약 10만 개에 달하는 호수가 산재해 있습니다. 노벨상의 고향이자 세계적인 복지 국가로 잘 알려져 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 59° 20'",
    "longitude": "동경 18° 03'",
    "elevation": "평균 해발고도 320m",
    "geographicRegion": "북유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "스칸디나비아 산맥",
      "베네른 호수",
      "토르네 강"
    ],
    "naturalEnvironment": "빙하 작용으로 형성된 복잡한 리아스식 해안과 수많은 섬, 그리고 북부의 타이가 침엽수림 지대가 특징입니다.",
    "famousLandmarks": [
      "스톡홀름 궁전",
      "바사 박물관",
      "아비스코 국립공원"
    ],
    "isoCode": "se"
  },
  {
    "id": "ru",
    "name": "러시아",
    "englishName": "Russia",
    "continent": "유럽",
    "capital": "모스크바",
    "population": "약 1억 4,400만 명",
    "language": "러시아어",
    "flag": "🏳️",
    "climate": "냉대 및 한대 기후",
    "climateDesc": "영토가 넓어 다양한 기후가 나타나나, 대부분 지역이 겨울이 길고 혹독하게 추우며 여름이 짧은 전형적인 대륙성 냉대 기후를 보입니다.",
    "geoFeatures": "광활한 시베리아 평원과 우랄산맥",
    "specialFeature": "세계에서 가장 영토가 넓은 국가로, 유럽과 아시아에 걸쳐 있으며 11개의 시간대를 사용합니다. 세계에서 가장 깊은 담수호인 바이칼 호수를 보유하고 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 55° 45'",
    "longitude": "동경 37° 37'",
    "elevation": "평균 해발고도 170m",
    "geographicRegion": "동유럽 및 북아시아",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "우랄 산맥",
      "볼가 강",
      "바이칼 호수"
    ],
    "naturalEnvironment": "북부의 툰드라와 광활한 타이가 침엽수림 지대, 그리고 세계적인 대하천들이 시베리아를 가로질러 북극해로 흘러듭니다.",
    "famousLandmarks": [
      "붉은 광장",
      "바이칼 호수",
      "에르미타주 미술관"
    ],
    "isoCode": "ru"
  },
  {
    "id": "li",
    "name": "리히텐슈타인",
    "englishName": "Liechtenstein",
    "continent": "유럽",
    "capital": "파두츠",
    "population": "약 4만 명",
    "language": "독일어",
    "flag": "🏳️",
    "climate": "대륙성 고산 기후",
    "climateDesc": "알프스산맥의 영향으로 겨울에는 눈이 많이 내리고 추우며, 여름은 온화합니다. 남풍인 푄 현상 덕분에 위도에 비해 기후가 비교적 온화한 편입니다.",
    "geoFeatures": "라인강 상류 계곡과 알프스 산악 지대",
    "specialFeature": "우즈베키스탄과 함께 세계에 단 두 개뿐인 이중 내륙국 중 하나입니다. 매우 작지만 1인당 GDP가 세계 최고 수준인 부유한 강소국입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 47° 08'",
    "longitude": "동경 9° 31'",
    "elevation": "평균 해발고도 1,100m",
    "geographicRegion": "중앙유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "라인 강",
      "그라우슈피츠 산",
      "알프스 산맥"
    ],
    "naturalEnvironment": "서쪽 국경을 흐르는 라인강 유역의 평평한 분지와 동쪽의 가파른 알프스 산악 지형이 조화를 이루고 있습니다.",
    "famousLandmarks": [
      "파두츠 성",
      "구텐베르크 성",
      "리히텐슈타인 미술관"
    ],
    "isoCode": "li"
  },
  {
    "id": "by",
    "name": "벨라루스",
    "englishName": "Belarus",
    "continent": "유럽",
    "capital": "민스크",
    "population": "약 920만 명",
    "language": "벨라루스어, 러시아어",
    "flag": "🏳️",
    "climate": "온화한 대륙성 기후",
    "climateDesc": "대서양의 영향으로 겨울은 비교적 온화하고 여름은 서늘하며 습한 과도기적 대륙성 기후를 나타냅니다.",
    "geoFeatures": "평탄한 구릉지와 광활한 습지대",
    "specialFeature": "바다가 없는 내륙국으로, 국토의 40% 이상이 울창한 삼림으로 덮여 있어 '유럽의 허파'라고 불립니다. 유럽에 남은 마지막 원시림인 비아워비에자 숲을 폴란드와 공유하고 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 53° 54'",
    "longitude": "동경 27° 34'",
    "elevation": "평균 해발고도 160m",
    "geographicRegion": "동유럽",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "드네프르 강",
      "프리피야트 습지",
      "자르진스카야 언덕"
    ],
    "naturalEnvironment": "수많은 호수와 강, 그리고 유럽 최대 규모의 프리피야트 습지대가 발달하여 풍부한 수자원과 생태계를 유지하고 있습니다.",
    "famousLandmarks": [
      "미르 성",
      "냐스비시 성",
      "비아워비에자 국립공원"
    ],
    "isoCode": "by"
  },
  {
    "id": "cf",
    "name": "중앙아프리카",
    "englishName": "Central African Republic",
    "continent": "아프리카",
    "capital": "방기",
    "population": "약 570만 명",
    "language": "상고어, 프랑스어",
    "flag": "🏳️",
    "climate": "열대 사바나 기후",
    "climateDesc": "북부는 건조한 사바나 기후가 나타나며 남부는 고온다습한 열대우림 기후의 영향을 받습니다. 연중 기온 변화가 적고 우기와 건기가 뚜렷하게 구분됩니다.",
    "geoFeatures": "넓은 고원 지대와 우방기강 수계",
    "specialFeature": "아프리카 대륙의 정중앙에 위치한 내륙국으로, 풍부한 다이아몬드와 우라늄 매장량을 자랑합니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 4° 22'",
    "longitude": "동경 18° 35'",
    "elevation": "평균 해발고도 약 635m",
    "geographicRegion": "중부 아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "우방기강",
      "카르르 고원",
      "봉고 산맥"
    ],
    "naturalEnvironment": "국토의 대부분이 우방기강과 샤리강 수계에 속하며, 남부의 울창한 열대우림과 북부의 사바나 초원이 조화를 이룹니다.",
    "famousLandmarks": [
      "마노보-구온다 생 디아리스 국립공원",
      "방기 중앙시장",
      "보알리 폭포"
    ],
    "isoCode": "cf"
  },
  {
    "id": "td",
    "name": "차드",
    "englishName": "Chad",
    "continent": "아프리카",
    "capital": "은자메나",
    "population": "약 1,800만 명",
    "language": "프랑스어, 아랍어",
    "flag": "🏳️",
    "climate": "사막 기후 및 사헬 기후",
    "climateDesc": "북부는 극도로 건조한 사하라 사막 기후이며, 남부로 갈수록 강수량이 증가하는 사헬 및 사바나 기후가 나타납니다.",
    "geoFeatures": "사하라 사막과 차드호 분지",
    "specialFeature": "아프리카의 죽은 심장이라 불리는 거대한 내륙국으로, 북부의 티베스티 산맥과 남부의 차드호가 극적인 대비를 이룹니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 12° 06'",
    "longitude": "동경 15° 02'",
    "elevation": "평균 해발고도 약 543m",
    "geographicRegion": "중부 아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "티베스티 산맥",
      "차드호",
      "에네디 고원"
    ],
    "naturalEnvironment": "북부의 황량한 사막 지대와 남부의 차드호 주변 습지 생태계가 공존하며, 기후 변화로 인한 차드호의 급격한 축소가 주요 환경 문제입니다.",
    "famousLandmarks": [
      "에네디 자연문화 보존지구",
      "티베스티 화산지대",
      "자쿠마 국립공원"
    ],
    "isoCode": "td"
  },
  {
    "id": "bj",
    "name": "베냉",
    "englishName": "Benin",
    "continent": "아프리카",
    "capital": "포르토노보",
    "population": "약 1,370만 명",
    "language": "프랑스어",
    "flag": "🏳️",
    "climate": "열대 사바나 기후",
    "climateDesc": "남부는 고온다습한 열대 우림 기후의 영향을 받으며, 북부는 건기와 우기가 뚜렷한 사바나 기후를 보입니다.",
    "geoFeatures": "남부 해안 사구와 북부 구릉 지대",
    "specialFeature": "부두교(Voodoo)의 발상지이자 과거 노예 무역의 아픈 역사를 간직한 서아프리카의 관문입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 6° 29'",
    "longitude": "동경 2° 37'",
    "elevation": "평균 해발고도 약 273m",
    "geographicRegion": "서아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "아타코라 산맥",
      "우에메강",
      "노코우에호"
    ],
    "naturalEnvironment": "남부의 기니만 연안 사구와 석호 지대에서 시작하여 북부의 아타코라 산맥과 사바나 초원으로 이어지는 다양한 생태계를 가집니다.",
    "famousLandmarks": [
      "간비에 수상마을",
      "우이다 역사박물관",
      "펜자리가 국립공원"
    ],
    "isoCode": "bj"
  },
  {
    "id": "cm",
    "name": "카메룬",
    "englishName": "Cameroon",
    "continent": "아프리카",
    "capital": "야운데",
    "population": "약 2,860만 명",
    "language": "프랑스어, 영어",
    "flag": "🏳️",
    "climate": "열대 우림 및 사바나 기후",
    "climateDesc": "남부 해안은 세계에서 가장 강수량이 많은 열대 우림 기후를 보이며, 북부로 갈수록 건조한 사바나 기후로 변합니다.",
    "geoFeatures": "카메룬 화산대와 고원 지대",
    "specialFeature": "아프리카의 모든 지리적, 기후적 특징을 축소해 놓은 듯하여 '미니어처 아프리카'라고 불립니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "북위 3° 52'",
    "longitude": "동경 11° 31'",
    "elevation": "평균 해발고도 약 667m",
    "geographicRegion": "중부 아프리카",
    "hemisphere": "북반구, 동반구",
    "majorLandforms": [
      "카메룬산",
      "사나가강",
      "아마다와 고원"
    ],
    "naturalEnvironment": "기니만 연안의 맹그로브 숲과 남부의 울창한 열대우림, 중부 고원지대, 그리고 북부의 사바나와 차드호 분지까지 아우르는 풍부한 생태계를 보유하고 있습니다.",
    "famousLandmarks": [
      "카메룬산 활화산",
      "자 동물보호구역",
      "와자 국립공원"
    ],
    "isoCode": "cm"
  },
  {
    "id": "bw",
    "name": "보츠와나",
    "englishName": "Botswana",
    "continent": "아프리카",
    "capital": "가보로네",
    "population": "약 260만 명",
    "language": "영어, 츠와나어",
    "flag": "🏳️",
    "climate": "반건조 스텝 기후",
    "climateDesc": "국토의 대부분이 칼라하리 사막에 속해 있어 건조하며, 여름에는 덥고 겨울에는 일교차가 매우 큽니다.",
    "geoFeatures": "칼라하리 사막과 오카방고 델타",
    "specialFeature": "세계 최대의 내륙 삼각주인 오카방고 델타가 있으며, 아프리카에서 가장 안정적인 민주주의와 경제 성장을 이룬 국가 중 하나입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "남위 24° 39'",
    "longitude": "동경 25° 54'",
    "elevation": "평균 해발고도 약 1,013m",
    "geographicRegion": "남부 아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "오카방고 삼각주",
      "칼라하리 사막",
      "마카디카디 소금분지"
    ],
    "naturalEnvironment": "바다로 흘러가지 않고 사막에서 소멸하는 오카방고강이 형성한 거대한 습지 생태계와 칼라하리 사막의 건조한 생태계가 공존합니다.",
    "famousLandmarks": [
      "오카방고 델타",
      "초베 국립공원",
      "초딜로 힐스"
    ],
    "isoCode": "bw"
  },
  {
    "id": "ao",
    "name": "앙골라",
    "englishName": "Angola",
    "continent": "아프리카",
    "capital": "루안다",
    "population": "약 3,670만 명",
    "language": "포르투갈어",
    "flag": "🏳️",
    "climate": "열대 사바나 및 반건조 기후",
    "climateDesc": "북부는 고온다습한 열대 기후를 보이지만, 남부와 해안 지대는 벵겔라 한류의 영향으로 건조하고 서늘한 기후가 나타납니다.",
    "geoFeatures": "넓은 중부 고원과 대서양 연안 평원",
    "specialFeature": "석유와 다이아몬드 등 지하자원이 매우 풍부하며, 오랜 내전을 극복하고 빠르게 성장하고 있는 국가입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "남위 8° 50'",
    "longitude": "동경 13° 14'",
    "elevation": "평균 해발고도 약 1,112m",
    "geographicRegion": "중부 아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "비에 고원",
      "콴자강",
      "나미브 사막 북부"
    ],
    "naturalEnvironment": "대서양 연안의 좁은 평원지대에서 내륙의 거대한 비에 고원으로 급격히 상승하는 지형을 가지며, 잠베지강과 콩고강의 수원이 시작되는 풍부한 수계를 자랑합니다.",
    "famousLandmarks": [
      "칼란둘라 폭포",
      "툰다발라 절벽",
      "키사마 국립공원"
    ],
    "isoCode": "ao"
  },
  {
    "id": "zm",
    "name": "잠비아",
    "englishName": "Zambia",
    "continent": "아프리카",
    "capital": "루사카",
    "population": "약 2,050만 명",
    "language": "영어",
    "flag": "🏳️",
    "climate": "온대 하우 기후",
    "climateDesc": "고도가 높아 열대 지역임에도 비교적 온화하며, 5월에서 8월 사이의 건기에는 선선하고 쾌적한 날씨가 이어집니다.",
    "geoFeatures": "잠베지강 수계와 고원 지대",
    "specialFeature": "세계 3대 폭포 중 하나인 빅토리아 폭포를 짐바브웨와 공유하고 있으며, 아프리카 최대의 구리 생산국 중 하나입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "남위 15° 25'",
    "longitude": "동경 28° 17'",
    "elevation": "평균 해발고도 약 1,138m",
    "geographicRegion": "남부 아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "잠베지강",
      "카리바호",
      "무칭가 산맥"
    ],
    "naturalEnvironment": "국토 대부분이 해발 1,000m 이상의 고원 지대로 이루어져 있으며, 잠베지강과 루앙와강이 흐르는 비옥한 계곡과 풍부한 야생동물 서식지를 보유하고 있습니다.",
    "famousLandmarks": [
      "빅토리아 폭포",
      "남루앙와 국립공원",
      "카리바 댐"
    ],
    "isoCode": "zm"
  },
  {
    "id": "zw",
    "name": "짐바브웨",
    "englishName": "Zimbabwe",
    "continent": "아프리카",
    "capital": "하라레",
    "population": "약 1,660만 명",
    "language": "영어, 쇼나어, 은데벨레어",
    "flag": "🏳️",
    "climate": "아열대 고원 기후",
    "climateDesc": "높은 해발고도 덕분에 연중 온화하고 쾌적한 기후를 유지하며, 11월에서 3월 사이의 우기에 대부분의 비가 내립니다.",
    "geoFeatures": "하이벨드 고원과 잠베지강 분지",
    "specialFeature": "거대한 돌 성벽 유적인 그레이트 짐바브웨와 웅장한 빅토리아 폭포를 품고 있는 역사와 자연의 나라입니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "남위 17° 50'",
    "longitude": "동경 31° 03'",
    "elevation": "평균 해발고도 약 961m",
    "geographicRegion": "남부 아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "하이벨드 고원",
      "잠베지강",
      "림포포강"
    ],
    "naturalEnvironment": "북쪽의 잠베지강과 남쪽의 림포포강 사이에 위치한 고원 지대로, 사바나 초원과 미옴보 숲이 넓게 펼쳐져 있어 다양한 대형 포유류가 서식합니다.",
    "famousLandmarks": [
      "그레이트 짐바브웨 유적",
      "빅토리아 폭포",
      "황게 국립공원"
    ],
    "isoCode": "zw"
  },
  {
    "id": "mz",
    "name": "모잠비크",
    "englishName": "Mozambique",
    "continent": "아프리카",
    "capital": "마푸투",
    "population": "약 3,380만 명",
    "language": "포르투갈어",
    "flag": "🏳️",
    "climate": "열대 사바나 기후",
    "climateDesc": "연중 고온다습하며, 인도양에서 불어오는 따뜻한 바람과 해류의 영향으로 해안 지대는 특히 습도가 높고 사이클론의 영향을 자주 받습니다.",
    "geoFeatures": "인도양 연안 평원과 잠베지강 하구",
    "specialFeature": "아프리카 동부에서 가장 긴 해안선(약 2,470km)을 가지고 있어 아름다운 해변과 산호초 섬들이 발달해 있습니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "남위 25° 57'",
    "longitude": "동경 32° 35'",
    "elevation": "평균 해발고도 약 345m",
    "geographicRegion": "동남부 아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "잠베지강 하구",
      "레봄보 산맥",
      "카호라바사호"
    ],
    "naturalEnvironment": "인도양을 마주하는 광활한 해안 평원과 석호, 산호초 생태계가 발달해 있으며, 내륙으로 갈수록 고도가 높아져 고원과 산악 지형을 형성합니다.",
    "famousLandmarks": [
      "바자루토 제도",
      "모잠비크섬",
      "고롱고사 국립공원"
    ],
    "isoCode": "mz"
  },
  {
    "id": "sz",
    "name": "에스와티니",
    "englishName": "Eswatini",
    "continent": "아프리카",
    "capital": "음바바네",
    "population": "약 120만 명",
    "language": "스와티어, 영어",
    "flag": "🏳️",
    "climate": "아열대 고원 기후",
    "climateDesc": "서부의 고지대는 서늘하고 비가 많이 내리는 반면, 동부의 저지대는 고온건조한 기후를 보입니다.",
    "geoFeatures": "드라켄즈버그 산맥 동쪽 사면과 구릉 지대",
    "specialFeature": "아프리카에 남은 마지막 절대군주제 국가 중 하나로, 독특한 전통 축제인 '리드 댄스(Reed Dance)'가 유명합니다.",
    "surroundingCountries": [],
    "mapCoords": {
      "x": 0,
      "y": 0
    },
    "latitude": "남위 26° 19'",
    "longitude": "동경 31° 08'",
    "elevation": "평균 해발고도 약 300m",
    "geographicRegion": "남부 아프리카",
    "hemisphere": "남반구, 동반구",
    "majorLandforms": [
      "하이벨드 고원",
      "레봄보 산맥",
      "우투강"
    ],
    "naturalEnvironment": "서쪽의 높은 산악 지대(하이벨드)에서 동쪽의 낮은 평원(로우벨드)으로 급격히 낮아지는 계단식 지형을 가지며, 울창한 삼림과 강줄기가 잘 발달해 있습니다.",
    "famousLandmarks": [
      "밀와네 야생동물 보호구역",
      "흘라네 왕립 국립공원",
      "에줄위니 계곡"
    ],
    "isoCode": "sz"
  }
];
