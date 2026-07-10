import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, MapPin, Globe, Compass, Sun, Send, 
  X, GraduationCap, ArrowLeft, Star, 
  Sparkles, Info, Map, AlertTriangle, Eye, EyeOff,
  ExternalLink, Plus, Minus, RefreshCw
} from 'lucide-react';
import { countriesData, Country } from './data/countries';
import * as topojson from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const mapWidth = 800;
const mapHeight = 550;

const projection = geoMercator()
  .scale(120)
  .translate([mapWidth / 2, mapHeight / 2 + 80]);
const pathGenerator = geoPath().projection(projection);

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

const getCoordinateRange = (coordStr: string): string => {
  if (!coordStr) return '';
  const match = coordStr.match(/(북위|남위|동경|서경)\s*(\d+)/);
  if (match) {
    const direction = match[1];
    const degrees = parseInt(match[2], 10);
    const min = Math.max(0, degrees - 3);
    const max = degrees + 3;
    return `${direction} ${min}~${max}° 사이`;
  }
  return coordStr;
};

const getEasyRegion = (region: string): { easyTitle: string; description: string } => {
  const mapping: Record<string, { easyTitle: string; description: string }> = {
    "북서아프리카 마그레브 산악지대": {
      easyTitle: "아프리카 북서쪽 산맥 지대",
      description: "'마그레브'는 아랍어로 '해가 지는 서쪽 땅'을 뜻해요. 바다 옆에 높고 험한 아틀라스 산맥이 솟아 있는 멋진 곳이랍니다."
    },
    "북동아프리카 나일강 사막 문명권": {
      easyTitle: "나일강 주변의 사막 지대",
      description: "세계에서 가장 긴 나일강 덕분에 주변에 비옥한 땅이 생겼어요. 하지만 강을 조금만 벗어나면 엄청나게 넓고 건조한 사하라 사막이 펼쳐져요."
    },
    "남서아프리카 대서양 연안 사구 및 중앙고원 사막": {
      easyTitle: "바닷가 모래언덕과 높은 사막 지대",
      description: "'사구'는 바람에 실려 쌓인 '모래언덕'이에요. 바다 바로 옆에 거대한 모래 언덕과 높은 고원의 사막이 함께 있는 신기한 곳이에요."
    },
    "남부아프리카 고원 및 연안 지대": {
      easyTitle: "높은 평원과 바닷가 지대",
      description: "가운데는 높고 평평한 땅(고원)으로 되어 있고, 바다와 만나는 주변은 깎아지른 듯한 가파른 절벽으로 이루어진 독특한 땅이에요."
    },
    "북아프리카 마그레브 해안림 및 중앙 사하라 사막지대": {
      easyTitle: "바닷가 숲과 넓은 사하라 사막",
      description: "바다 근처는 따뜻하고 나무가 자라지만, 안쪽으로 들어가면 세계에서 가장 크고 더운 모래 사막인 사하라 사막이 펼쳐집니다."
    },
    "서아프리카 기니만 충적 델타지대": {
      easyTitle: "서쪽 바닷가 넓은 강 하류 평야",
      description: "'충적 델타'는 강물이 실어 나른 비옥한 흙과 모래가 강 하류 바닷가에 쌓여서 만들어진 넓고 풍요로운 삼각주 평야를 말해요."
    },
    "동아프리카 대고원 산악 내륙권": {
      easyTitle: "동쪽의 높은 평원과 큰 산 지대",
      description: "바다에서 먼 내륙에 있는 아주 높고 넓은 평원이에요. 아프리카에서 가장 높은 킬리만자로산 같은 거대한 화산들이 솟아 있어요."
    },
    "동아프리카 연안 사바나 야생권": {
      easyTitle: "동쪽 바닷가와 넓은 풀밭 지대",
      description: "'사바나'는 건기가 있어서 키 작은 나무들과 긴 풀들이 자라는 넓은 초원이에요. 얼룩말과 사자 같은 야생 동물이 아주 많이 살아요."
    },
    "동아프리카 고원 및 지구대권": {
      easyTitle: "높은 평원과 갈라진 큰 골짜기",
      description: "'지구대'는 땅속의 거대한 힘 때문에 땅이 양옆으로 갈라지면서 생긴 깊고 긴 골짜기예요. 주변에 깊고 아름다운 호수들이 많답니다."
    },
    "북서유럽 그레이트브리튼 제도": {
      easyTitle: "북서쪽의 큰 섬나라 지대",
      description: "'제도'는 무리지어 있는 여러 섬들을 뜻해요. 영국과 아일랜드가 위치한 푸르고 온화한 섬들로 이루어진 지형이에요."
    },
    "중앙유럽 남고북저 지형권": {
      easyTitle: "남쪽은 높은 산, 북쪽은 평평한 지형",
      description: "'남고북저'는 '남쪽은 높고 북쪽은 낮다'는 뜻이에요. 남쪽에는 높은 알프스 산맥이 있고 북쪽에는 넓고 평평한 평야가 펼쳐져 있어요."
    },
    "남서유럽 이베리아 고원 지대": {
      easyTitle: "남서쪽의 넓고 높은 평원 지대",
      description: "스페인과 포르투갈이 있는 반도로, 대부분의 땅이 주변 바다보다 훨씬 높은 해발고도를 가진 거대한 고원과 산맥으로 이루어져 있어요."
    },
    "남동유럽 발칸반도 산악·군도지대": {
      easyTitle: "남동쪽의 산과 섬이 많은 지대",
      description: "'군도'는 무리지어 모여 있는 많은 섬들이예요. 울퉁불퉁한 산맥들이 바다 깊숙이 잠겨 그리스처럼 수많은 섬과 복잡한 해안선이 되었어요."
    },
    "중앙유럽 알프스 산악 내륙지대": {
      easyTitle: "유럽의 지붕 알프스 산맥 지대",
      description: "바다가 없는 내륙 한가운데에 위치해 있어요. 일 년 내외 얼음이 얼어있는 높은 알프스 산맥과 에메랄드빛 계곡이 가득한 웅장한 지형이에요."
    },
    "북대서양 판과 판이 벌어지는 지열 화산도": {
      easyTitle: "지각이 갈라지며 생긴 불과 얼음의 섬",
      description: "지구 표면을 이루는 단단한 판들이 서로 양쪽으로 벌어지는 곳이에요. 틈새로 마그마가 솟아올라 화산과 온천이 펄펄 끓는 섬이랍니다."
    },
    "북유럽 스칸디나비아 빙하지대": {
      easyTitle: "얼음 빙하가 깎아 만든 절벽과 골짜기",
      description: "옛날 추운 빙하기 시절에 엄청나게 거대한 얼음덩어리(빙하)가 땅을 누르고 깎으며 흘러가서 깊은 U자형 골짜기와 절벽 바닷길을 만들었어요."
    },
    "북유럽 스칸디나비아 침엽수 평원지대": {
      easyTitle: "뾰족뾰족 소나무 가득한 숲속 평원",
      description: "잎이 뾰족하고 추위에 강한 소나무와 전나무 같은 침엽수림(타이가)이 끝없이 펼쳐진, 평평하고 눈이 많이 내리는 북쪽 나라들의 지형이에요."
    },
    "남유럽 아펜니노 반도 및 지중해역": {
      easyTitle: "장화 모양 반도와 따뜻한 지중해 바닷가",
      description: "이탈리아 반도를 척추처럼 길게 가로지르는 아펜니노 산맥이 있고, 일 년 내내 따뜻한 햇살이 비치는 지중해 바다로 둘러싸인 아름다운 곳이에요."
    },
    "인도양 고립 독립 거대 섬 생태계": {
      easyTitle: "인도양 속 나홀로 외딴 거대 섬",
      description: "다른 대륙들과 아주 아주 오랫동안 떨어져 지냈기 때문에, 마다가스카르처럼 지구상 다른 어디에서도 볼 수 없는 희귀한 동물과 식물들이 가득해요."
    },
    "서유럽 대륙 평야 및 분지 지대": {
      easyTitle: "서쪽의 넓은 평야와 사발 모양 땅",
      description: "'분지'는 주변이 산으로 둘러싸여 한가운데가 사발처럼 오목하고 평평하게 들어간 땅이에요. 농사짓기에 최고로 좋은 넓고 기름진 땅이 많아요."
    },
    "사헬 사막 전이대 및 나일강 대합류 분지": {
      easyTitle: "사막 옆 건조한 풀밭과 큰 강들이 만나는 평지",
      description: "'사헬'은 사하라 사막의 남쪽 테두리로, 비가 적게 와서 사막으로 변해가는 건조한 풀밭 지대예요. 여러 큰 강들이 합쳐져 평지를 이루고 있어요."
    },
    "동유럽 대평원 및 발트해 연안 지대": {
      easyTitle: "동쪽의 끝없는 평야와 잔잔한 바닷가",
      description: "끝없이 아주 멀리까지 다 평평한 넓은 평야(대평원)가 이어지는 곳이에요. 북쪽에는 육지에 둘러싸여 파도가 잔잔한 발트해 바다가 있답니다."
    },
    "동아시아 반도 지대": {
      easyTitle: "대륙과 바다를 잇는 징검다리 반도",
      description: "아시아 대륙에서 튀어나와 3면이 바다로 둘러싸여 있으며, 산맥과 강이 뚜렷한 사계절을 만들어내는 곳이에요."
    },
    "동남아시아 인도차이나 반도 지대": {
      easyTitle: "덥고 습한 남쪽 바다의 거대한 반도",
      description: "비가 아주 많이 오는 열대 지역으로, 메콩강 같은 거대한 강들이 기름진 평야와 아름다운 밀림을 만들어요."
    },
    "동남아시아 적도 열도 지대": {
      easyTitle: "적도 위에 흩어진 수많은 화산섬들",
      description: "가장 뜨거운 적도 선에 수만 개의 섬들이 모여 있고, 화산이 많아 밀림과 바다가 어우러진 다이나믹한 곳이에요."
    },
    "서아시아 아라비아 사막 지대": {
      easyTitle: "서쪽의 끝없는 붉은 모래 사막",
      description: "비가 거의 오지 않아 뜨거운 사막이 끝없이 펼쳐지지만, 땅속 깊은 곳에는 검은 황금이라 불리는 석유가 가득해요."
    },
    "서아시아 이란 고원 지대": {
      easyTitle: "건조하고 험준한 산맥 속 높은 평원",
      description: "주변이 거대한 산맥들로 둘러싸여 아주 높고 건조한 땅으로, 옛날 실크로드 상인들이 낙타를 타고 지나던 길목이에요."
    },
    "중앙아시아 대초원 지대": {
      easyTitle: "바다 없는 한가운데 끝없는 풀밭",
      description: "바다에서 아주 멀어 건조하며, 지평선 끝까지 나무 없이 풀만 무성하게 자라는 스텝(초원)이 바다처럼 펼쳐져 있어요."
    },
    "동아시아 내륙 초원 지대": {
      easyTitle: "거친 바람이 부는 높고 차가운 초원",
      description: "아주 높고 추운 고원지대로 넓은 고비 사막과 끝없는 초원이 있어 옛날부터 사람들이 말을 타고 유목 생활을 했어요."
    },
    "동아시아 화산 군도 지대": {
      easyTitle: "화산섬들이 모여 있는 동쪽 바다 지대",
      description: "바다 아래에서 솟아오른 험준한 화산들이 뭉쳐 수많은 섬을 이루었어요. 땅속 깊은 곳이 뜨거워 온천과 지진이 많은 지형입니다."
    },
    "동아시아 대륙 및 티베트 고원 지대": {
      easyTitle: "동쪽의 넓은 땅과 세상에서 가장 높은 고원",
      description: "서쪽에는 구름 위에 떠 있는 것처럼 높은 '세계의 지붕' 티베트 고원이 있고, 동쪽으로는 큰 강이 흐르는 끝없는 평야가 펼쳐집니다."
    },
    "남아시아 힌두스탄 반도 및 히말라야 산록": {
      easyTitle: "남쪽 반도와 히말라야 산맥 밑자락",
      description: "북쪽은 만년설로 뒤덮인 엄청나게 높은 히말라야 산맥이 찬 바람을 막아주고, 아래쪽 반도에는 아주 덥고 습한 정글과 평야가 있어요."
    },
    "북미 중앙 대평원 및 서부 록키 산맥 지대": {
      easyTitle: "가운데 넓은 들판과 서쪽 높은 산맥",
      description: "가운데에는 끝도 없이 넓게 펼쳐진 곡창지대 평원이 있고, 서쪽으로는 로키 산맥이라는 엄청나게 길고 거대한 바위산이 솟아 있습니다."
    },
    "북미 남부 멕시코 고원 지대": {
      easyTitle: "남쪽의 높고 건조한 평원 지대",
      description: "양쪽으로 산맥이 감싸고 있는 가운데가 높고 평평한 땅이에요. 선인장이 자라는 사막과 고원이 넓게 펼쳐져 있어요."
    },
    "중미 화산 지협 및 열대 우림 지대": {
      easyTitle: "두 대륙을 잇는 좁은 화산 길목",
      description: "북아메리카와 남아메리카를 연결하는 좁은 땅(지협)이에요. 불을 뿜는 화산과 빽빽한 정글이 가득해요."
    },
    "카리브해 산호초 및 화산도 지대": {
      easyTitle: "따뜻한 바다 위의 예쁜 산호초 섬들",
      description: "에메랄드빛 바다 위에 산호가 쌓여 만들어진 하얀 모래섬들과 화산이 폭발해 생긴 섬들이 모여 있어요."
    },
    "북미 스텝 침엽수림 및 로키 북부 빙하지대": {
      easyTitle: "북쪽 소나무 숲과 꽁꽁 언 빙하 산맥",
      description: "추위를 견디는 뾰족한 소나무(침엽수)들이 가득한 숲이 끝없이 이어지고, 산 위에는 여름에도 녹지 않는 하얀 빙하가 덮여 있어요."
    },
    "남미 아마존 분지 및 브라질 고원 지대": {
      easyTitle: "남쪽 아마존 열대 우림과 높은 평원",
      description: "세상에서 가장 넓고 생물이 많은 아마존 열대 우림 정글이 있고, 그 아래쪽으로는 해발 고도가 높은 거대한 브라질 고원이 자리합니다."
    },
    "남미 팜파스 평원 및 파타고니아 건조 지대": {
      easyTitle: "남쪽 넓은 풀밭과 춥고 마른 황무지",
      description: "농사 짓기 좋은 평평하고 검은 흙의 '팜파스' 초원이 있고, 남쪽으로 더 내려가면 펭귄이 살 만큼 춥고 메마른 파타고니아가 나옵니다."
    },
    "남미 안데스 고산 및 잉카 문명 지대": {
      easyTitle: "남쪽 거대한 산맥과 옛 잉카 문명",
      description: "남아메리카 서쪽을 따라 세상에서 가장 긴 안데스 산맥이 뻗어 있고, 그 높고 차가운 산속에 신비로운 고대 도시들이 숨겨져 있어요."
    },
    "남미 북부 카리브해 연안 및 오리노코 분지": {
      easyTitle: "남쪽 대륙 위쪽 바다와 넓은 강",
      description: "남아메리카 위쪽에서 카리브해 바다와 만나고, 오리노코 강 주변으로 엄청나게 넓은 초원과 세계에서 가장 높은 폭포가 있어요."
    },
    "오세아니아 대륙 사막 및 대산호초 지대": {
      easyTitle: "남반구 대륙 사막과 바닷속 산호초",
      description: "땅 한가운데는 비가 오지 않는 붉은 모래사막(아웃백)이 넓게 퍼져 있고, 바다에는 수천 킬로미터나 이어지는 거대한 산호초 숲이 있어요."
    },
    "남서태평양 화산열도 및 알프스 빙하지대": {
      easyTitle: "태평양 남쪽 화산 섬들과 빙하 산맥",
      description: "북쪽 섬에서는 뜨거운 화산과 온천이 끓어오르고, 남쪽 섬에서는 얼음 빙하가 만든 깊은 산맥(서던 알프스)이 멋진 풍경을 만듭니다."
    },
    "멜라네시아 열대 우림 및 산호초 지대": {
      easyTitle: "열대 바다의 짙은 숲과 산호섬",
      description: "적도 남쪽 태평양에 위치해 있으며, 크고 작은 섬들이 화산과 짙은 열대 우림, 아름다운 산호초로 덮여 있습니다."
    },
    "폴리네시아 및 미크로네시아 화산도와 환초 지대": {
      easyTitle: "태평양 한가운데 작은 화산섬과 둥근 산호섬",
      description: "끝없이 넓은 태평양 바다 위에 점을 찍은 듯 수많은 섬들이 흩어져 있고, 화산이 굳은 섬이나 둥근 띠 모양의 산호초(환초)로 이루어져 있어요."
    }
  };

  return mapping[region] || {
    easyTitle: region,
    description: "초등학교 지리 과정에서 만나는 아름답고 독특한 자연환경을 보여주는 지형입니다."
  };
};

const getLandmarkImageUrl = (countryId: string, index: number): string => {
  const images: Record<string, string[]> = {
    uk: [
      'https://images.unsplash.com/photo-1599833975787-5c143f373c30?auto=format&fit=crop&w=800&q=80', // Stonehenge
      'https://images.unsplash.com/photo-1549449272-359f14b62db4?auto=format&fit=crop&w=800&q=80', // Seven Sisters
      'https://images.unsplash.com/photo-1552554605-2b0e9f427771?auto=format&fit=crop&w=800&q=80'  // Giant's Causeway
    ],
    france: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80', // Eiffel Tower
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=800&q=80', // Mont Blanc Alps peaks
      'https://images.unsplash.com/photo-1563286071-7058865c3639?auto=format&fit=crop&w=800&q=80'  // Mont Saint-Michel
    ],
    germany: [
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=800&q=80', // Neuschwanstein Castle
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80', // Black Forest
      'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80'  // Rhine Valley
    ],
    italy: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80', // Colosseum
      'https://images.unsplash.com/photo-1533588742-9988ffbc6355?auto=format&fit=crop&w=800&q=80', // Pompeii / Vesuvius
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'  // Amalfi Coast
    ],
    spain: [
      'https://images.unsplash.com/photo-1583779457094-0eba34a19767?auto=format&fit=crop&w=800&q=80', // Sagrada Familia
      'https://images.unsplash.com/photo-1595171730413-5bc68b8e3a24?auto=format&fit=crop&w=800&q=80', // Alhambra
      'https://images.unsplash.com/photo-1616422312686-2580a1334994?auto=format&fit=crop&w=800&q=80'  // Montserrat
    ],
    greece: [
      'https://images.unsplash.com/photo-1608126976835-66cf88d4c948?auto=format&fit=crop&w=800&q=80', // Parthenon
      'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=800&q=80', // Santorini
      'https://images.unsplash.com/photo-1558231580-0a8a7ca2c676?auto=format&fit=crop&w=800&q=80'  // Meteora
    ],
    norway: [
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80', // Geirangerfjord
      'https://images.unsplash.com/photo-1532541183144-88f50b4ec734?auto=format&fit=crop&w=800&q=80', // Lofoten
      'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80'  // Northern Lights
    ],
    switzerland: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80', // Matterhorn (Genuine iconic mountain peak with lake reflection)
      'https://images.unsplash.com/photo-1541845157-a6d2d100c931?auto=format&fit=crop&w=800&q=80', // Jungfraujoch (Genuine Swiss red cogwheel train on snowy Alps)
      'https://images.unsplash.com/photo-1527668752968-14dc70a27443?auto=format&fit=crop&w=800&q=80'  // Lake Geneva (Genuine spectacular Lake Geneva with Chillon Castle sunset)
    ],
    finland: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80', // Santa Claus Village (Cozy snowy Finnish cottage)
      'https://images.unsplash.com/photo-1527269537047-40fbe5034111?auto=format&fit=crop&w=800&q=80', // Lake Saimaa (Genuine blue forest lake)
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=800&q=80'  // Helsinki Cathedral (White cathedral green domes)
    ],
    iceland: [
      'https://images.unsplash.com/photo-1504893524553-ac55fce698be?auto=format&fit=crop&w=800&q=80', // Blue Lagoon geothermal springs
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80', // Geysir / waterfall scenery
      'https://images.unsplash.com/photo-1529963183134-61a90db47eaf?auto=format&fit=crop&w=800&q=80'  // Thingvellir rift valley
    ],
    egypt: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80', // Pyramids of Giza
      'https://images.unsplash.com/photo-1600577916048-804c9191e36c?auto=format&fit=crop&w=800&q=80', // Abu Simbel colossal facade
      'https://images.unsplash.com/photo-1590075865003-e48277adc5e8?auto=format&fit=crop&w=800&q=80'  // Nile River sunset
    ],
    algeria: [
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80', // Tassili n'Ajjer
      'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80', // Hoggar Mountains volcanic spires
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80'  // Tipaza Roman Ruins on sea
    ],
    sudan: [
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80', // Meroe Pyramids
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80', // Khartoum Nile Junction
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'  // Sabaloka Gorge
    ],
    nigeria: [
      'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&w=800&q=80', // Zuma Rock
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80', // Lekki canopy green path
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80'  // Osun-Osogbo sacred forest
    ],
    namibia: [
      'https://images.unsplash.com/photo-1505322108101-e404be12cc45?auto=format&fit=crop&w=800&q=80', // Sossusvlei dunes
      'https://images.unsplash.com/photo-1510414842594-fc614ea9416f?auto=format&fit=crop&w=800&q=80', // Deadvlei authentic black skeleton trees and orange dunes
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'  // Fish River Canyon rock formations
    ],
    'south-africa': [
      'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?auto=format&fit=crop&w=800&q=80', // Table Mountain Cape Town
      'https://images.unsplash.com/photo-1568454537842-d933259bb258?auto=format&fit=crop&w=800&q=80', // Cape of Good Hope rugged cliff coastline
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'  // Kruger National Park savanna acacia
    ],
    kenya: [
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80', // Maasai Mara safari giraffe
      'https://images.unsplash.com/photo-1589656966895-2f33e7653819?auto=format&fit=crop&w=800&q=80', // Mount Kenya peak and African savanna
      'https://images.unsplash.com/photo-1561571994-3c61c554181a?auto=format&fit=crop&w=800&q=80'  // Lake Nakuru flock of pink flamingos
    ],
    morocco: [
      'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80', // Marrakech historical arches
      'https://images.unsplash.com/photo-1548135113-d1df525143a4?auto=format&fit=crop&w=800&q=80', // Chefchaouen blue city street
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80'  // Merzouga Sahara dunes
    ],
    madagascar: [
      'https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&w=800&q=80', // Baobab Avenue
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80', // Tsingy needle stones
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80'  // Isalo Canyon
    ],
    ethiopia: [
      'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80', // Lalibela St. George Church
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80', // Simien Mountains cliffs
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80'  // Blue Nile Falls
    ],
    tanzania: [
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80', // Serengeti plains
      'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=800&q=80', // Kilimanjaro majestic mountain with elephants
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80'  // Ngorongoro crater safari
    ],
    czech: [
      'https://images.unsplash.com/photo-1541380742-f361c1106093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513805959324-96eb66ca8713?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&w=800&q=80'
    ],
    slovakia: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80'
    ],
    netherlands: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80'
    ],
    belgium: [
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498503182468-3b51cbb6cb24?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80'
    ],
    poland: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572252009286-268acec5ca0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80'
    ],
    hungary: [
      'https://images.unsplash.com/photo-1565113915014-ca051e843f51?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1549880181-56a44cf8a4a1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80'
    ],
    ukraine: [
      'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1558231580-0a8a7ca2c676?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    bulgaria: [
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80'
    ],
    croatia: [
      'https://images.unsplash.com/photo-1555992336-03a23c7b20eb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1510414842594-fc614ea9416f?auto=format&fit=crop&w=800&q=80'
    ],
    austria: [
      'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'
    ],
    tunisia: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80'
    ],
    libya: [
      'https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&w=800&q=80'
    ],
    'south-sudan': [
      'https://images.unsplash.com/photo-1527269537047-40fbe5034111?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80'
    ],
    somalia: [
      'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=800&q=80'
    ],
    southkorea: [
      'https://images.unsplash.com/photo-1590396474552-c01150f822af?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=800&q=80'
    ],
    vietnam: [
      'https://images.unsplash.com/photo-1528125105955-3251e16f3d1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601625463678-83b6c2269c7f?auto=format&fit=crop&w=800&q=80'
    ],
    thailand: [
      'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516982635936-a36f6d54cf8e?auto=format&fit=crop&w=800&q=80'
    ],
    indonesia: [
      'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1604084224522-8d76d49cb05d?auto=format&fit=crop&w=800&q=80'
    ],
    philippines: [
      'https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518439179707-1bc81b674b88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522777174624-91416e788c1c?auto=format&fit=crop&w=800&q=80'
    ],
    saudiarabia: [
      'https://images.unsplash.com/photo-1574169208507-84376144848b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579737976834-080c98e1a4de?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586524103138-0b5c14175319?auto=format&fit=crop&w=800&q=80'
    ],
    uae: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580979462747-0639d675bbcd?auto=format&fit=crop&w=800&q=80'
    ],
    iran: [
      'https://images.unsplash.com/photo-1596706798083-05ec712a87df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583272630857-bf94331464db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610486858169-0414995bd348?auto=format&fit=crop&w=800&q=80'
    ],
    kazakhstan: [
      'https://images.unsplash.com/photo-1563200922-0a5639d2c499?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1608226065609-b615da299443?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1581403079944-cb80bf9d5573?auto=format&fit=crop&w=800&q=80'
    ],
    mongolia: [
      'https://images.unsplash.com/photo-1510444530058-f58c70f074d6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585641973685-64357b98fbc9?auto=format&fit=crop&w=800&q=80'
    ],
    japan: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1480796927426-f609979314bd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576483561394-b2585f524246?auto=format&fit=crop&w=800&q=80'
    ],
    china: [
      'https://images.unsplash.com/photo-1508804185872-d7bad86b97b0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529982412356-901cc3a363a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=800&q=80'
    ],
    india: [
      'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1523192193543-6e7296d960e4?auto=format&fit=crop&w=800&q=80'
    ],
    usa: [
      'https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506509971842-5fdb6dbfbbdf?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80'
    ],
    canada: [
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1531366936336-62e0615de3be?auto=format&fit=crop&w=800&q=80'
    ],
    mexico: [
      'https://images.unsplash.com/photo-1512813102059-6ea2b8e3a5a4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582236892695-15ff517bf4e5?auto=format&fit=crop&w=800&q=80'
    ],
    cuba: [
      'https://images.unsplash.com/photo-1505580665406-8c4d7ec6be99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512613076135-e6e1a491ef00?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555546736-24e036e4f165?auto=format&fit=crop&w=800&q=80'
    ],
    jamaica: [
      'https://images.unsplash.com/photo-1572972989104-e539e99a8de4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589417030574-d0233488cf46?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506085526362-e1d51a6bb185?auto=format&fit=crop&w=800&q=80'
    ],
    guatemala: [
      'https://images.unsplash.com/photo-1517457224245-5d9c24097eec?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528543606781-2f6e6857f318?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596401662998-639a58406526?auto=format&fit=crop&w=800&q=80'
    ],
    costarica: [
      'https://images.unsplash.com/photo-1518182170546-076616fd4025?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534066914560-6b68b7537b98?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585807498754-0b73c9f28689?auto=format&fit=crop&w=800&q=80'
    ],
    panama: [
      'https://images.unsplash.com/photo-1588636906233-a61253457bb7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574347781035-188b7754b2fc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599818826723-cb845231c5ee?auto=format&fit=crop&w=800&q=80'
    ],
    bahamas: [
      'https://images.unsplash.com/photo-1548574505-12caf0ce34d1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1585350481079-0db35363fb55?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538356973347-16474fb27063?auto=format&fit=crop&w=800&q=80'
    ],
    dominican: [
      'https://images.unsplash.com/photo-1584307897257-81498eaee89b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1576402447990-7d63d6471d4b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595286524108-a1e649035e16?auto=format&fit=crop&w=800&q=80'
    ],
    brazil: [
      'https://images.unsplash.com/photo-1518623380242-d992d3c15b1c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528546115984-7e8c07629562?auto=format&fit=crop&w=800&q=80'
    ],
    argentina: [
      'https://images.unsplash.com/photo-1558588825-9dfdbf83c65f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ],
    chile: [
      'https://images.unsplash.com/photo-1579737525381-80a25f187a51?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582645805504-20b57e75005f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1621516082260-258db3e7d566?auto=format&fit=crop&w=800&q=80'
    ],
    peru: [
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1580982544275-38555e09fba2?auto=format&fit=crop&w=800&q=80'
    ],
    colombia: [
      'https://images.unsplash.com/photo-1583510525944-939e144a15a8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596706798083-05ec712a87df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1591546736274-1a3b56a908da?auto=format&fit=crop&w=800&q=80'
    ],
    venezuela: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1574347781035-188b7754b2fc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511221764669-e74136f45511?auto=format&fit=crop&w=800&q=80'
    ],
    ecuador: [
      'https://images.unsplash.com/photo-1563200922-0a5639d2c499?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596726118330-010376672322?auto=format&fit=crop&w=800&q=80'
    ],
    bolivia: [
      'https://images.unsplash.com/photo-1510444530058-f58c70f074d6?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538356973347-16474fb27063?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506509971842-5fdb6dbfbbdf?auto=format&fit=crop&w=800&q=80'
    ],
    uruguay: [
      'https://images.unsplash.com/photo-1505580665406-8c4d7ec6be99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555546736-24e036e4f165?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595286524108-a1e649035e16?auto=format&fit=crop&w=800&q=80'
    ],
    paraguay: [
      'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80'
    ],
    australia: [
      'https://images.unsplash.com/photo-1529108190281-9a4f620bc2d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582967788606-a171c1080cb0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=800&q=80'
    ],
    newzealand: [
      'https://images.unsplash.com/photo-1469598614039-ccfeb0a21111?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505852903341-fc8d3db10436?auto=format&fit=crop&w=800&q=80'
    ],
    papuanewguinea: [
      'https://images.unsplash.com/photo-1510525009512-ad7fc13eefab?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1571775304313-db372295dd26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1624800318261-344445330e70?auto=format&fit=crop&w=800&q=80'
    ],
    fiji: [
      'https://images.unsplash.com/photo-1498126748450-4d56d8123282?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542385151-efd9000785a0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516091219800-4b85c5bb71c2?auto=format&fit=crop&w=800&q=80'
    ],
    samoa: [
      'https://images.unsplash.com/photo-1616715694297-f0c058145e69?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511221764669-e74136f45511?auto=format&fit=crop&w=800&q=80'
    ],
    tonga: [
      'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596726118330-010376672322?auto=format&fit=crop&w=800&q=80'
    ],
    vanuatu: [
      'https://images.unsplash.com/photo-1559103348-18e3848b6c47?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579737525381-80a25f187a51?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1582645805504-20b57e75005f?auto=format&fit=crop&w=800&q=80'
    ],
    solomonislands: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506509971842-5fdb6dbfbbdf?auto=format&fit=crop&w=800&q=80'
    ],
    micronesia: [
      'https://images.unsplash.com/photo-1505580665406-8c4d7ec6be99?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555546736-24e036e4f165?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595286524108-a1e649035e16?auto=format&fit=crop&w=800&q=80'
    ],
    palau: [
      'https://images.unsplash.com/photo-1590480351286-63e18a287c88?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498126748450-4d56d8123282?auto=format&fit=crop&w=800&q=80'
    ]
  };

  return images[countryId]?.[index] || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80';
};

const getFlagImageUrl = (countryId: string): string => {
  const mapping: Record<string, string> = {
    // 유럽
    'uk': 'gb',
    'france': 'fr',
    'germany': 'de',
    'italy': 'it',
    'spain': 'es',
    'greece': 'gr',
    'norway': 'no',
    'switzerland': 'ch',
    'finland': 'fi',
    'iceland': 'is',
    'czech': 'cz',
    'slovakia': 'sk',
    'netherlands': 'nl',
    'belgium': 'be',
    'poland': 'pl',
    'hungary': 'hu',
    'ukraine': 'ua',
    'bulgaria': 'bg',
    'croatia': 'hr',
    'austria': 'at',
    
    // 아프리카
    'egypt': 'eg',
    'algeria': 'dz',
    'sudan': 'sd',
    'nigeria': 'ng',
    'namibia': 'na',
    'south-africa': 'za',
    'kenya': 'ke',
    'morocco': 'ma',
    'madagascar': 'mg',
    'ethiopia': 'et',
    'tanzania': 'tz',
    'tunisia': 'tn',
    'libya': 'ly',
    'south-sudan': 'ss',
    'somalia': 'so',
    
    // 아시아
    'japan': 'jp',
    'china': 'cn',
    'india': 'in',
    'southkorea': 'kr',
    'vietnam': 'vn',
    'thailand': 'th',
    'indonesia': 'id',
    'philippines': 'ph',
    'saudiarabia': 'sa',
    'uae': 'ae',
    'iran': 'ir',
    'kazakhstan': 'kz',
    'mongolia': 'mn',
    
    // 북아메리카
    'usa': 'us',
    'canada': 'ca',
    'mexico': 'mx',
    'cuba': 'cu',
    'jamaica': 'jm',
    'guatemala': 'gt',
    'costarica': 'cr',
    'panama': 'pa',
    'bahamas': 'bs',
    'dominican': 'do',
    
    // 남아메리카
    'brazil': 'br',
    'argentina': 'ar',
    'chile': 'cl',
    'peru': 'pe',
    'colombia': 'co',
    'venezuela': 've',
    'ecuador': 'ec',
    'bolivia': 'bo',
    'uruguay': 'uy',
    'paraguay': 'py',
    
    // 오세아니아
    'australia': 'au',
    'newzealand': 'nz',
    'papuanewguinea': 'pg',
    'fiji': 'fj',
    'samoa': 'ws',
    'tonga': 'to',
    'vanuatu': 'vu',
    'solomonislands': 'sb',
    'micronesia': 'fm',
    'palau': 'pw'
  };
  const code = mapping[countryId] || 'un';
  return `https://flagcdn.com/w80/${code}.png`;
};

export default function App() {
  // Navigation / View State
  // 'home' = 지리 포털 메인 검색창, 'map' = 세계 지리 인터랙티브 탐색 지도
  

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


  const [viewMode, setViewMode] = useState<'home' | 'map'>('home');
  const [selectedCountry, setSelectedCountry] = useState<Country>(countriesData[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeContinent, setActiveContinent] = useState<'전체' | '유럽' | '아시아' | '북아메리카' | '남아메리카' | '아프리카' | '오세아니아'>('전체');

  // Autocomplete suggestions dropdown visibility state
  const [showHomeSuggestions, setShowHomeSuggestions] = useState(false);
  const [showMapSuggestions, setShowMapSuggestions] = useState(false);

  // Map Style State
  const [mapTheme, setMapTheme] = useState<'satellite' | 'terrain' | 'default'>('default');
  const [showTelemetry, setShowTelemetry] = useState(false);
  const [showLegend, setShowLegend] = useState(false);
  const [showMapControls, setShowMapControls] = useState(false);
  const [showMapControlsOpt, setShowMapControlsOpt] = useState(false); // backup or original state

  // Map Zoom & Pan State
  const [scale, setScale] = useState<number>(1);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [dragged, setDragged] = useState<boolean>(false);
  const [geographies, setGeographies] = useState<any[]>([]);

  useEffect(() => {
    fetch(geoUrl)
      .then(r => r.json())
      .then(d => {
        const { features } = topojson.feature(d, d.objects.countries as any) as any;
        setGeographies(features);
      })
      .catch(err => console.error("Failed to load map data", err));
  }, []);

  // Zoom In/Out/Reset Handlers
  const handleZoomIn = () => {
    const newScale = Math.min(scale * 1.3, 5);
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    const dx = centerX - position.x;
    const dy = centerY - position.y;
    setPosition({
      x: centerX - dx * (newScale / scale),
      y: centerY - dy * (newScale / scale)
    });
    setScale(newScale);
  };

  const handleZoomOut = () => {
    const newScale = Math.max(scale / 1.3, 0.6);
    const centerX = mapWidth / 2;
    const centerY = mapHeight / 2;
    const dx = centerX - position.x;
    const dy = centerY - position.y;
    setPosition({
      x: centerX - dx * (newScale / scale),
      y: centerY - dy * (newScale / scale)
    });
    setScale(newScale);
  };

  const handleZoomReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  // Mouse & Touch Interaction Handlers for dragging the map
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.button !== 0) return; // Left click only
    setIsDragging(true);
    setDragged(false);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (!isDragging) return;
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    const dx = newX - position.x;
    const dy = newY - position.y;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      setDragged(true);
    }
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Wrap around for infinite scroll
    const mapCircumferenceScreen = 753.9822368615503 * scale;
    let newX = position.x;
    let wrapped = false;
    while (newX > mapCircumferenceScreen / 2) { newX -= mapCircumferenceScreen; wrapped = true; }
    while (newX < -mapCircumferenceScreen / 2) { newX += mapCircumferenceScreen; wrapped = true; }
    if (wrapped) setPosition(p => ({ ...p, x: newX }));
  };

  const [pinchStart, setPinchStart] = useState<{ dist: number, scale: number, pos: {x: number, y: number} } | null>(null);

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
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    const zoomFactor = 1.1;
    let newScale = scale;
    if (e.deltaY < 0) {
      newScale = Math.min(scale * zoomFactor, 5);
    } else {
      newScale = Math.max(scale / zoomFactor, 0.6);
    }

    const svg = e.currentTarget;
    const rect = svg.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const dx = mouseX - position.x;
    const dy = mouseY - position.y;

    setPosition({
      x: mouseX - dx * (newScale / scale),
      y: mouseY - dy * (newScale / scale)
    });
    setScale(newScale);
  };

  // Center the map on the selected country automatically when it changes
  useEffect(() => {
    if (selectedCountry) {
      const targetScale = Math.max(scale, 1.3); // Keep current zoom, or at least 1.3x zoom
      const [cx, cy] = getProjectedCoords(selectedCountry);
      setScale(targetScale);
      setPosition({
        x: 400 - cx * targetScale,
        y: 275 - cy * targetScale
      });
    }
  }, [selectedCountry]);

  // Handle Google-like search submit
  const handleSearchSubmit = (e?: React.FormEvent, customQuery?: string) => {
    if (e) e.preventDefault();
    const query = (customQuery !== undefined ? customQuery : searchQuery).trim();
    if (!query) return;

    // Find country by name, englishName, or capital
    const found = countriesData.find(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) || 
      c.englishName.toLowerCase().includes(query.toLowerCase()) ||
      c.capital.toLowerCase().includes(query.toLowerCase())
    );

    if (found) {
      setSelectedCountry(found);
      setViewMode('map');
      setSearchQuery(found.name);
      setShowHomeSuggestions(false);
      setShowMapSuggestions(false);
    } else {
      // Show error or keep on home screen with filtered list
      setActiveContinent('전체');
      setSearchQuery(query);
      setViewMode('home');
    }
  };

  // Select country directly from grid or list
  const selectCountryDirect = (country: Country) => {
    setSelectedCountry(country);
    setSearchQuery(country.name);
    setViewMode('map');
    setShowHomeSuggestions(false);
    setShowMapSuggestions(false);
  };

  // Filtering list for main search index
  const filteredHomeCountries = countriesData.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          country.englishName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = activeContinent === '전체' || country.continent === activeContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div id="geography-map-portal" className="min-h-screen bg-[#f1f3f4] text-slate-800 font-sans flex flex-col antialiased">
      
      {/* 1. PORTAL HOME VIEW (Google Maps style search portal with Flag Autocomplete) */}
      {viewMode === 'home' ? (
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-12 max-w-4xl mx-auto w-full">
          
          {/* Logo Area */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 justify-center mb-4">
              <div className="p-3.5 bg-blue-600 text-white rounded-3xl shadow-lg shadow-blue-100 flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
                <Map className="w-10 h-10" />
              </div>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-2">
              <span className="text-blue-600">세계</span> 
              <span className="text-slate-800 font-black">지리 사전</span>
            </h1>
            <p className="text-sm text-slate-500 mt-2 font-semibold">
              유럽 & 아프리카 국가들의 경위도 좌표계, 지형적 비밀, 기후를 탐색하는 인터랙티브 지형 학습 백과사전
            </p>
          </div>

          {/* Search Box Wrapper with Dropdown Suggestions */}
          <div className="w-full max-w-2xl relative mb-8">
            <form onSubmit={handleSearchSubmit} className="w-full bg-white rounded-full shadow-lg border border-slate-200 p-2 flex items-center gap-2 focus-within:ring-4 focus-within:ring-blue-500/15 focus-within:border-blue-500 transition-all">
              <div className="flex-1 flex items-center pl-4 gap-3">
                <Search className="w-5 h-5 text-blue-500 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowHomeSuggestions(true);
                  }}
                  onFocus={() => setShowHomeSuggestions(true)}
                  placeholder="궁금한 국가명 또는 수도명을 검색해보세요 (예: 영국, 이집트, 로마...)"
                  className="w-full py-2 bg-transparent border-none text-slate-800 font-semibold placeholder:text-slate-400 focus:outline-none text-base"
                />
                {searchQuery && (
                  <button 
                    type="button"
                    onClick={() => {
                      setSearchQuery('');
                      setShowHomeSuggestions(false);
                    }}
                    className="p-1 hover:bg-slate-100 rounded-full text-slate-400"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-7 py-3 rounded-full text-sm transition-all shadow-md shadow-blue-100 cursor-pointer flex items-center gap-1.5"
              >
                지도로 찾기
              </button>
            </form>

            {/* Suggestions Dropdown with FLAGS shown clearly */}
            {showHomeSuggestions && searchQuery.trim() !== '' && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="p-2.5 border-b border-slate-100 text-[10px] font-black text-slate-400 px-4 uppercase tracking-wider flex items-center justify-between">
                  <span>실시간 국기 검색 매칭 리스트</span>
                  <button onClick={() => setShowHomeSuggestions(false)} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {countriesData
                    .filter(c => 
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.capital.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map(country => (
                      <button
                        key={country.id}
                        type="button"
                        onClick={() => {
                          selectCountryDirect(country);
                          setShowHomeSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-3.5 hover:bg-blue-50/40 flex items-center justify-between border-b border-slate-50 last:border-0 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-4">
                          <img 
                            src={getFlagImageUrl(country.id)} 
                            alt={country.name} 
                            className="w-10 h-7 object-contain rounded-md border border-slate-200/50 filter drop-shadow-sm group-hover:scale-115 transition-transform duration-150" 
                          />
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="font-extrabold text-slate-800 text-sm">{country.name}</span>
                              <span className="text-xs text-slate-400 font-bold">({country.englishName})</span>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-0.5 font-semibold">위치: {getCoordinateRange(country.latitude)}, {getCoordinateRange(country.longitude)}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <span className="text-xs bg-blue-50 text-blue-600 font-black px-2.5 py-1 rounded-lg border border-blue-100">
                            수도: {country.capital}
                          </span>
                          <span className="text-[10px] text-slate-400 block mt-1 font-bold">{country.continent} 대륙</span>
                        </div>
                      </button>
                    ))}
                  {countriesData.filter(c => 
                    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                    c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    c.capital.toLowerCase().includes(searchQuery.toLowerCase())
                  ).length === 0 && (
                    <div className="p-6 text-center text-slate-400 text-xs font-bold">
                      일치하는 국가를 찾지 못했습니다. 국어명을 정확히 써보세요! 🌍
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Real-time Flag & Country Preview Card when typing */}
          {searchQuery.trim() !== '' && (
            <div className="w-full max-w-2xl mb-8 animate-in fade-in slide-in-from-top-4 duration-300">
              {(() => {
                const query = searchQuery.trim().toLowerCase();
                const matches = countriesData.filter(c => 
                  c.name.toLowerCase().includes(query) || 
                  c.englishName.toLowerCase().includes(query) ||
                  c.capital.toLowerCase().includes(query)
                );
                
                if (matches.length === 0) {
                  return (
                    <div className="bg-white rounded-3xl border border-amber-100 p-6 shadow-md text-center text-slate-500 font-semibold">
                      <AlertTriangle className="w-8 h-8 text-amber-500 mx-auto mb-2" />
                      <span>일치하는 국가를 찾지 못했습니다. 올바른 한글 국가명을 입력해보세요! (예: 스페인, 영국)</span>
                    </div>
                  );
                }
                
                // Show the top matching country prominently
                const topMatch = matches[0];
                
                return (
                  <div className="bg-white rounded-3xl border-2 border-blue-500 shadow-xl overflow-hidden p-6 hover:shadow-2xl transition-all duration-300 relative">
                    {/* Badge for quick notice */}
                    <div className="absolute top-4 right-4 bg-blue-100 text-blue-700 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
                      실시간 검색 결과
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 items-center">
                      {/* Big Flag Box */}
                      <div className="w-48 h-32 bg-slate-100 border border-slate-200/80 rounded-2xl flex items-center justify-center shadow-inner relative overflow-hidden group/flag flex-shrink-0">
                        <img 
                          src={getFlagImageUrl(topMatch.id)} 
                          alt={topMatch.name} 
                          className="w-28 h-20 object-contain rounded-md border border-slate-200 filter drop-shadow-md select-none group-hover/flag:scale-110 transition-transform duration-300" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
                      </div>

                      {/* Quick Info & CTA */}
                      <div className="flex-1 text-center md:text-left">
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-1.5">
                          <span className="bg-blue-50 text-blue-700 text-xs font-black px-2.5 py-0.5 rounded-lg border border-blue-100">
                            {topMatch.continent} 대륙
                          </span>
                          <span className="bg-amber-50 text-amber-700 text-xs font-black px-2.5 py-0.5 rounded-lg border border-amber-100">
                            수도: {topMatch.capital}
                          </span>
                        </div>
                        
                        <h3 className="text-3xl font-black text-slate-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                          <span>{topMatch.name}</span>
                          <span className="text-slate-400 text-base font-bold">({topMatch.englishName})</span>
                        </h3>

                        <p className="text-xs text-slate-600 leading-relaxed font-semibold mb-4">
                          기후: <strong className="text-amber-600">{topMatch.climate}</strong> — {topMatch.climateDesc}
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                          <button
                            onClick={() => selectCountryDirect(topMatch)}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-black px-6 py-3 rounded-xl text-xs transition-all shadow-md shadow-blue-100 flex items-center gap-2 cursor-pointer active:scale-95 hover:scale-[1.02]"
                          >
                            <Map className="w-4.5 h-4.5" />
                            {topMatch.name} 국기 지도에서 탐험하기
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* If there are other matches */}
                    {matches.length > 1 && (
                      <div className="mt-4 pt-4 border-t border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-2 text-center md:text-left">다른 검색 매칭 국가 ({matches.length - 1}):</p>
                        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                          {matches.slice(1, 5).map(m => (
                            <button
                              key={m.id}
                              onClick={() => selectCountryDirect(m)}
                              className="px-3 py-1.5 bg-slate-50 hover:bg-blue-50 border border-slate-100 hover:border-blue-200 rounded-xl flex items-center gap-2 transition-colors cursor-pointer text-xs font-bold"
                            >
                              <img 
                                src={getFlagImageUrl(m.id)} 
                                alt={m.name} 
                                className="w-5 h-3.5 object-contain rounded-xs border border-slate-200/50" 
                              />
                              <span className="text-slate-700">{m.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          )}

          {/* Quick Recommended Categories */}
          <div className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 p-6 shadow-sm mb-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Star className="w-4 h-4 text-amber-500" />
                추천 탐사 지역 (국기를 클릭해 바로 지도에서 탐색해 보세요)
              </h3>
              
              <div className="flex bg-slate-100 p-1 rounded-xl gap-0.5">
                {(['전체', '유럽', '아시아', '북아메리카', '남아메리카', '아프리카', '오세아니아'] as const).map(tab => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveContinent(tab)}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                      activeContinent === tab 
                        ? 'bg-white text-blue-600 shadow-xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommended Country Cards with Flags */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {filteredHomeCountries.map(country => (
                <button
                  key={country.id}
                  onClick={() => selectCountryDirect(country)}
                  className="p-3 bg-slate-50 hover:bg-blue-50/50 border border-slate-100 hover:border-blue-200 rounded-2xl text-left transition-all duration-200 group flex items-center gap-3 cursor-pointer"
                >
                  <img 
                    src={getFlagImageUrl(country.id)} 
                    alt={country.name} 
                    className="w-10 h-7 object-contain rounded-md border border-slate-200/50 filter drop-shadow-sm group-hover:scale-115 transition-transform duration-150 flex-shrink-0" 
                  />
                  <div className="overflow-hidden">
                    <p className="text-xs font-black text-slate-800 truncate">{country.name}</p>
                    <p className="text-[10px] text-slate-400 font-bold truncate">{country.capital}</p>
                  </div>
                </button>
              ))}
            </div>

            {filteredHomeCountries.length === 0 && (
              <div className="text-center py-6 text-slate-400">
                <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-pulse" />
                <p className="text-xs font-bold">앗! 검색 결과에 해당하는 국가가 없어요. 한글 이름을 정확히 써보세요!</p>
              </div>
            )}
          </div>

          {/* Education Purpose Banner */}
          <div className="w-full max-w-2xl bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-xs text-blue-950">
            <GraduationCap className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-blue-900 block mb-0.5">교과서 맞춤형 지리 탐구</span>
              인터랙티브 지도 기반의 지형 탐구 서비스로, 초등학교 6학년 지리 교과 수준의 <strong>기후 대 지형 정보, 특별 지형 유산</strong>을 가독성 높은 입체 지도로 비교 탐색합니다.
            </div>
          </div>

        </div>
      ) : (
        
        /* 2. GOOGLE MAPS STYLE RESULTS VIEW (Left side sidebar / Right side interactive world map) */
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          
          {/* Top Google Maps styled Floating Search Bar / Header */}
          <div className="bg-white border-b border-slate-200 px-4 py-3 shadow-xs flex items-center justify-between gap-4 z-30">
            
            {/* Logo Group */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setViewMode('home')}>
              <div className="p-2 bg-blue-600 text-white rounded-xl shadow-md">
                <Map className="w-5 h-5" />
              </div>
              <h1 className="text-base sm:text-lg font-black tracking-tight text-slate-900 flex items-center gap-1">
                <span className="text-blue-600">세계</span> 
                <span>지리 사전</span>
              </h1>
            </div>

            {/* Central Search Bar with Autocomplete suggestions */}
            <div className="flex-1 max-w-lg relative hidden sm:block">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-blue-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowMapSuggestions(true);
                  }}
                  onFocus={() => setShowMapSuggestions(true)}
                  placeholder="다른 유럽 & 아프리카 국가를 검색해보세요..."
                  className="w-full pl-9 pr-10 py-1.5 bg-slate-50 border border-slate-200 rounded-full text-xs sm:text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-400"
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    onClick={() => {
                      setSearchQuery('');
                      setShowMapSuggestions(false);
                    }}
                    className="absolute right-3 top-2 p-0.5 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </form>

              {showMapSuggestions && searchQuery.trim() !== '' && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden z-50 animate-in fade-in duration-100">
                  <div className="max-h-60 overflow-y-auto">
                    {countriesData
                      .filter(c => 
                        c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        c.capital.toLowerCase().includes(searchQuery.toLowerCase())
                      )
                      .map(country => (
                        <button
                          key={country.id}
                          type="button"
                          onClick={() => {
                            selectCountryDirect(country);
                            setShowMapSuggestions(false);
                          }}
                          className="w-full text-left px-3 py-2.5 hover:bg-blue-50/30 flex items-center justify-between border-b border-slate-50 last:border-0 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <img src={getFlagImageUrl(country.id)} alt={country.name} className="w-7 h-5 object-contain rounded-sm border border-slate-200/50 filter drop-shadow-xs" />
                            <div>
                              <span className="font-extrabold text-slate-800 text-xs">{country.name}</span>
                              <span className="text-[10px] text-slate-400 ml-1 font-bold">({country.englishName})</span>
                            </div>
                          </div>
                          <span className="text-[10px] bg-blue-50 text-blue-600 font-extrabold px-2 py-0.5 rounded-lg border border-blue-100">
                            수도: {country.capital}
                          </span>
                        </button>
                      ))}
                    {countriesData.filter(c => 
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                      c.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.capital.toLowerCase().includes(searchQuery.toLowerCase())
                    ).length === 0 && (
                      <div className="p-4 text-center text-slate-400 text-xs">
                        검색 결과가 없습니다.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Back Button */}
            <button
              onClick={() => setViewMode('home')}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" />
              메인 검색창
            </button>
          </div>

          {/* SPLIT PANELS (Left: Geographic Details, Right: Full Screen Map Viewport) */}
          <div className="flex-1 flex flex-col md:flex-row overflow-y-auto md:overflow-hidden relative">
            
            {/* LEFT SIDEBAR: Google Maps Country Profile Panel */}
            <div className="w-full md:w-[420px] bg-white border-r border-slate-200 shadow-xl z-20 flex flex-col h-auto md:h-full overflow-y-visible md:overflow-y-auto flex-shrink-0 order-1 md:order-1">
              
              {/* Header Hero Area */}
              <div className="relative bg-slate-50 border-b border-slate-100 p-6 flex flex-col items-center justify-center text-center">
                
                {/* Floating Flag Icon with user query highlighting */}
                <div className="w-32 h-20 bg-white rounded-2xl overflow-hidden border border-slate-200 flex items-center justify-center shadow-md mb-3.5 hover:scale-105 transition-transform duration-200 relative group">
                  <img 
                    src={getFlagImageUrl(selectedCountry.id)} 
                    alt={selectedCountry.name} 
                    className="w-20 h-14 object-contain rounded-md border border-slate-200/80 select-none filter drop-shadow-sm" 
                  />
                </div>

                <div className="mt-1">
                  <span className="bg-blue-50 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full border border-blue-100">
                    {selectedCountry.continent} 대륙 국가 지식
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2 flex items-center justify-center gap-2">
                    <img src={getFlagImageUrl(selectedCountry.id)} alt={selectedCountry.name} className="w-8 h-5.5 object-contain rounded-sm border border-slate-200 filter drop-shadow-xs inline-block" />
                    <span>{selectedCountry.name}</span>
                    <span className="text-slate-400 text-sm font-bold">({selectedCountry.englishName})</span>
                  </h2>
                  <p className="text-xs text-slate-500 font-bold mt-1">수도: {selectedCountry.capital}</p>
                </div>

              </div>

              {/* Detailed Geography Profile Section (Factual details focused on Geography, NO safety travel alerts) */}
              <div className="p-5 flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-200 pb-2">
                  <Compass className="w-4 h-4 text-blue-500 animate-pulse" />
                  상세 지리 및 경위도 좌표 정보
                </h3>

                <div className="space-y-2.5 text-xs">
                  {/* Grid of coordinates */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white border border-slate-200/60 p-2.5 rounded-xl flex items-center gap-2">
                      <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
                        <MapPin className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-black block">위도 범위 (Lat Range)</span>
                        <span className="font-extrabold text-slate-800">{getCoordinateRange(selectedCountry.latitude)}</span>
                      </div>
                    </div>
                    <div className="bg-white border border-slate-200/60 p-2.5 rounded-xl flex items-center gap-2">
                      <div className="p-1 bg-blue-50 text-blue-600 rounded-lg">
                        <Globe className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-400 font-black block">경도 범위 (Long Range)</span>
                        <span className="font-extrabold text-slate-800">{getCoordinateRange(selectedCountry.longitude)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Region & Hemisphere Row */}
                  <div className="bg-white border border-slate-200/60 p-3 rounded-xl space-y-2.5">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-start gap-2">
                        <span className="text-slate-400 font-bold text-[10px] mt-0.5 whitespace-nowrap">지형학적 대분류</span>
                        <div className="text-right">
                          <span className="font-extrabold text-slate-800 text-xs block">{selectedCountry.geographicRegion}</span>
                          <span className="text-[9.5px] text-blue-600 font-black bg-blue-50/70 border border-blue-100 px-1.5 py-0.5 rounded-md inline-block mt-1">
                            🌱 초등 6학년 쉬운 설명: {getEasyRegion(selectedCountry.geographicRegion).easyTitle}
                          </span>
                        </div>
                      </div>
                      <p className="text-[10.5px] text-slate-600 bg-slate-50 border border-slate-100 p-2.5 rounded-lg leading-relaxed font-semibold">
                        💡 <span className="text-blue-700 font-bold">도움말:</span> {getEasyRegion(selectedCountry.geographicRegion).description}
                      </p>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold text-[10px]">지구 반구 위치</span>
                      <span className="font-extrabold text-slate-800">{selectedCountry.hemisphere}</span>
                    </div>
                    <div className="h-px bg-slate-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-bold text-[10px]">해발고도 고저차</span>
                      <span className="font-extrabold text-slate-800 text-right">{selectedCountry.elevation}</span>
                    </div>
                  </div>

                  {/* Google Maps External Exploration Button */}
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCountry.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm shadow-blue-100 hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>구글 지도로 {selectedCountry.name} 탐색하기</span>
                  </a>

                  {/* 3대 대표 지형물 */}
                  <div className="bg-blue-50/50 border border-blue-100 p-3 rounded-xl">
                    <span className="text-[10px] text-blue-900 font-black block mb-1.5">⛰️ 초등 지리 3대 대표 지형</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedCountry.majorLandforms.map(landform => (
                        <span key={landform} className="bg-white text-blue-700 border border-blue-100 px-2.5 py-1 rounded-lg font-black text-[10px] shadow-2xs">
                          {landform}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Factual Dictionary Details */}
              <div className="p-5 flex flex-col gap-5 border-b border-slate-100">
                
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2">
                  <Info className="w-4 h-4 text-blue-500" />
                  기후 및 영토 지형 백과
                </h3>

                {/* Grid layout */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-black block mb-0.5">총 인구수</span>
                    <span className="text-xs font-extrabold text-slate-800">{selectedCountry.population}</span>
                  </div>
                  <div className="bg-slate-50 border border-slate-200/60 p-3 rounded-xl">
                    <span className="text-[10px] text-slate-400 font-black block mb-0.5">공식 언어</span>
                    <span className="text-xs font-extrabold text-slate-800 truncate block">{selectedCountry.language}</span>
                  </div>
                </div>

                {/* 1. Climate Info (기후 정보) */}
                <div className="bg-amber-50/60 border border-amber-100 p-4 rounded-2xl flex flex-col gap-1.5">
                  <span className="text-xs font-black text-amber-900 flex items-center gap-1">
                    <Sun className="w-4 h-4 text-amber-600 animate-spin-slow" />
                    기후 특성: {selectedCountry.climate}
                  </span>
                  <p className="text-xs text-amber-950 leading-relaxed font-semibold">
                    {selectedCountry.climateDesc}
                  </p>
                </div>

                {/* 2. Geography Details (지형과 영토) */}
                <div className="bg-sky-50/50 border border-sky-100 p-4 rounded-2xl flex flex-col gap-1.5">
                  <span className="text-xs font-black text-sky-900 flex items-center gap-1">
                    <Compass className="w-4 h-4 text-sky-600" />
                    대륙 및 해안 지형 정보
                  </span>
                  <p className="text-xs text-sky-950 leading-relaxed font-semibold">
                    {selectedCountry.geoFeatures}
                  </p>
                </div>

                {/* 3. Special Geo Features (특별한 지리적 특징) */}
                <div className="bg-blue-50/40 border border-blue-100 p-4 rounded-2xl flex flex-col gap-1.5">
                  <span className="text-xs font-black text-blue-900 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-blue-600" />
                    교과서 속 특별한 지리 비밀! 🌟
                  </span>
                  <p className="text-xs text-blue-950 leading-relaxed font-bold">
                    {selectedCountry.specialFeature}
                  </p>
                </div>

              </div>

              {/* NATURAL ENVIRONMENT & LANDMARK HERITAGES SECTION */}
              <div className="p-5 flex flex-col gap-5 bg-slate-50/40 border-t border-slate-100 flex-1 overflow-y-visible md:overflow-y-auto h-auto md:max-h-[480px]">
                
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-slate-100 pb-2 flex-shrink-0">
                  <Star className="w-4 h-4 text-emerald-600 animate-pulse" />
                  교과서 속 자연 생태 및 지리 유산
                </h3>

                {/* 1. Natural Environment Detail */}
                <div className="bg-emerald-50/60 border border-emerald-100/80 p-4 rounded-2xl flex flex-col gap-2 shadow-2xs flex-shrink-0">
                  <span className="text-xs font-black text-emerald-900 flex items-center gap-1.5">
                    <span>🌿</span>
                    자연 환경 & 기후 생태계
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold">
                    {selectedCountry.naturalEnvironment}
                  </p>
                </div>

                {/* 2. Top 3 Famous Landmarks */}
                <div className="flex flex-col gap-2.5">
                  <span className="text-[11px] font-black text-slate-500 uppercase tracking-wider flex items-center gap-1">
                    🗺️ 대표 3대 지리 랜드마크 & 명소
                  </span>
                  <div className="space-y-2.5">
                    {selectedCountry.famousLandmarks.map((landmark, idx) => {
                      const parts = landmark.split(/[\(\[:]/);
                      const title = parts[0]?.trim();
                      const desc = parts[1]?.replace(/[\)\]]/, '').trim();

                      return (
                        <div
                          key={idx}
                          className="w-full bg-white border border-slate-200/80 p-3 rounded-2xl flex gap-3 shadow-3xs hover:border-blue-500/50 hover:shadow-2xs transition-all duration-200 group"
                        >
                          <div className="w-6 h-6 bg-blue-600 text-white font-black rounded-lg flex items-center justify-center text-xs flex-shrink-0 shadow-sm shadow-blue-100">
                            {idx + 1}
                          </div>
                          <div className="text-xs flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-extrabold text-slate-900 truncate">
                                {title}
                              </h4>
                              <a
                                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(title + ' ' + selectedCountry.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-shrink-0 inline-flex items-center gap-1 text-[10px] text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-lg font-black transition-all border border-blue-100 cursor-pointer"
                              >
                                <ExternalLink className="w-3 h-3" />
                                <span>지도 🗺️</span>
                              </a>
                            </div>
                            {desc && <p className="text-[11px] text-slate-500 mt-1 leading-relaxed font-bold">{desc}</p>}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT MAIN MAP VIEWPORT: Google Interactive Map */}
            <div className="flex-1 w-full h-[450px] sm:h-[550px] md:h-full relative bg-[#e8ecef] flex items-center justify-center p-4 flex-shrink-0 order-2 md:order-2">
              
              {/* Dynamic Geographical Coordinate Telemetry Dashboard */}
              {showTelemetry ? (
                <div className="absolute top-4 left-4 right-4 sm:right-auto z-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-4 shadow-lg sm:max-w-sm font-sans animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2.5 mb-2.5 gap-4">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-blue-600 animate-spin-slow" />
                      <div>
                        <h4 className="text-xs font-black text-slate-800">지구 위경도 지리좌표 계측</h4>
                        <p className="text-[9px] text-slate-400 font-bold">GRID TELEMETRY SYSTEM</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowTelemetry(false)}
                      className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                      title="계측기 숨기기"
                    >
                      <EyeOff className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2.5">
                    {/* Selected Country HUD row */}
                    <div className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl p-2.5">
                      <div className="flex items-center gap-2.5">
                        <img src={getFlagImageUrl(selectedCountry.id)} alt={selectedCountry.name} className="w-9 h-6 object-contain rounded-sm border border-slate-200/80 filter drop-shadow-xs" />
                        <div>
                          <span className="text-xs font-black text-slate-800">{selectedCountry.name}</span>
                          <span className="text-[10px] text-slate-400 block font-bold">{selectedCountry.englishName}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] bg-blue-100 text-blue-800 font-black px-2 py-0.5 rounded-full">수도: {selectedCountry.capital}</span>
                        <span className="text-[9px] text-slate-400 block mt-1 font-bold">{selectedCountry.geographicRegion}</span>
                      </div>
                    </div>

                    {/* Lat/Long Telemetry */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-white border border-slate-200/60 p-2 rounded-xl text-center shadow-2xs">
                        <span className="text-[9px] text-slate-400 font-black block">위도 범위 (Latitude Range)</span>
                        <span className="text-xs font-extrabold text-blue-600 font-mono">{getCoordinateRange(selectedCountry.latitude)}</span>
                      </div>
                      <div className="bg-white border border-slate-200/60 p-2 rounded-xl text-center shadow-2xs">
                        <span className="text-[9px] text-slate-400 font-black block">경도 범위 (Longitude Range)</span>
                        <span className="text-xs font-extrabold text-blue-600 font-mono">{getCoordinateRange(selectedCountry.longitude)}</span>
                      </div>
                    </div>

                    {/* Hemisphere & Elevation parameters */}
                    <div className="text-[11px] font-semibold text-slate-600 space-y-1 bg-slate-50/50 p-2 rounded-xl">
                      <div className="flex justify-between border-b border-slate-100 pb-1">
                        <span className="text-slate-400 font-bold">지구 대반구</span>
                        <span className="text-slate-700 font-black">{selectedCountry.hemisphere}</span>
                      </div>
                      <div className="flex justify-between pt-1">
                        <span className="text-slate-400 font-bold">해발 고도 필터</span>
                        <span className="text-slate-700 font-black text-[10px] truncate max-w-[170px]">{selectedCountry.elevation}</span>
                      </div>
                    </div>

                    {/* Child-friendly Geographic Explanation in Map Mode */}
                    <div className="bg-blue-50/40 border border-blue-100/50 p-2.5 rounded-xl text-[10px] leading-relaxed">
                      <div className="font-extrabold text-blue-900 flex items-center gap-1 mb-1">
                        <span>🌱</span>
                        <span>초등 6학년 쉬운 지형: {getEasyRegion(selectedCountry.geographicRegion).easyTitle}</span>
                      </div>
                      <p className="text-slate-600 font-semibold">
                        {getEasyRegion(selectedCountry.geographicRegion).description}
                      </p>
                    </div>

                    {/* Scale Ruler */}
                    <div className="border-t border-slate-100 pt-2 mt-1">
                      <div className="flex justify-between text-[9px] text-slate-400 font-black mb-1">
                        <span>경도 원점(런던 본초자오선) 기준 자</span>
                        <span>기준 자: 1cm ≒ 400km</span>
                      </div>
                      {/* Visual scale ruler */}
                      <div className="h-2.5 bg-slate-100 rounded-sm overflow-hidden flex border border-slate-200">
                        <div className="w-1/4 bg-slate-800 border-r border-white" />
                        <div className="w-1/4 bg-white border-r border-slate-800" />
                        <div className="w-1/4 bg-slate-800 border-r border-white" />
                        <div className="w-1/4 bg-white" />
                      </div>
                      <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-0.5">
                        <span>0km</span>
                        <span>400km</span>
                        <span>800km</span>
                        <span>1200km</span>
                      </div>
                    </div>

                  </div>
                </div>
              ) : (
                <div className="absolute top-4 left-4 z-10 animate-in fade-in duration-200">
                  <button
                    onClick={() => setShowTelemetry(true)}
                    className="bg-white/95 backdrop-blur-md hover:bg-blue-50 text-slate-800 font-black border border-slate-200 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs transition-all duration-200 cursor-pointer hover:scale-105 active:scale-95"
                    title="위경도 계측기 켜기"
                  >
                    <Eye className="w-4.5 h-4.5 text-blue-600 animate-pulse" />
                    <span>위경도 계측기 표시</span>
                  </button>
                </div>
              )}

              {/* Map Layout Style Controls (Google Map Control Panel) */}
              <div className="absolute bottom-6 right-6 md:top-4 md:bottom-auto md:right-4 z-10 flex flex-col gap-2">
                
                {!showMapControls ? (
                  <button
                    onClick={() => setShowMapControls(true)}
                    className="bg-white/95 backdrop-blur-md hover:bg-slate-50 text-slate-800 font-black border border-slate-200 px-3 py-2.5 rounded-full shadow-lg flex items-center gap-1.5 text-[10px] transition-all duration-200 cursor-pointer self-end hover:scale-105 active:scale-95"
                    title="지도 스타일 설정"
                  >
                    <Map className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    <span>지도 스타일 선택</span>
                  </button>
                ) : (
                  <div className="bg-white rounded-2xl border border-slate-200 p-2.5 shadow-xl flex flex-col gap-2 min-w-[160px] max-w-[200px] animate-in fade-in slide-in-from-right-2 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1.5 gap-4">
                      <span className="text-[10px] font-black text-slate-800 flex items-center gap-1">
                        <Map className="w-3.5 h-3.5 text-blue-600" />
                        지도 스타일
                      </span>
                      <button
                        onClick={() => setShowMapControls(false)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                        title="스타일 닫기"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    
                    {/* Theme Buttons */}
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => setMapTheme('default')}
                        className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all text-left cursor-pointer ${
                          mapTheme === 'default' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        일반 지도 (Default)
                      </button>
                      <button
                        onClick={() => setMapTheme('terrain')}
                        className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all text-left cursor-pointer ${
                          mapTheme === 'terrain' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        지형 물리도 (Terrain)
                      </button>
                      <button
                        onClick={() => setMapTheme('satellite')}
                        className={`px-3 py-1.5 text-[10px] font-black rounded-xl transition-all text-left cursor-pointer ${
                          mapTheme === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        위성 지도 (Satellite)
                      </button>
                    </div>

                    {/* Scale Status Indicator inside the container */}
                    <div className="bg-slate-50 rounded-xl p-2 text-center text-[9px] text-slate-400 font-bold border border-slate-100">
                      그리드 좌표계 자동 대입
                    </div>
                  </div>
                )}

              </div>

              {/* Floating Zoom & Pan Control Pad */}
              <div className="absolute bottom-24 right-6 md:top-36 md:bottom-auto md:right-4 z-10 flex flex-col bg-white rounded-2xl border border-slate-200 p-1 shadow-lg gap-1">
                <button
                  onClick={handleZoomIn}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all cursor-pointer font-bold border border-transparent hover:border-slate-200"
                  title="확대 (Zoom In)"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="h-px bg-slate-100 mx-1" />
                <button
                  onClick={handleZoomOut}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all cursor-pointer font-bold border border-transparent hover:border-slate-200"
                  title="축소 (Zoom Out)"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <div className="h-px bg-slate-100 mx-1" />
                <button
                  onClick={handleZoomReset}
                  className="w-8 h-8 rounded-xl hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-all cursor-pointer font-bold border border-transparent hover:border-slate-200"
                  title="지도 초기화"
                >
                  <RefreshCw className="w-3.5 h-3.5 animate-spin-slow" />
                </button>
              </div>

              {/* Dynamic Interactive Google Styled SVG Map */}
              <div className={`w-full max-w-[900px] h-full max-h-[580px] rounded-3xl border border-slate-200 shadow-2xl relative overflow-hidden transition-all duration-500 ${
                mapTheme === 'satellite' ? 'bg-[#0f172a]' : mapTheme === 'terrain' ? 'bg-[#cbe5ff]' : 'bg-[#e0f2fe]'
              }`}>
                
                {/* Floating Map Legend Indicator (Collapsible to keep map visible on mobile) */}
                {!showLegend ? (
                  <button
                    onClick={() => setShowLegend(true)}
                    className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold px-3 py-2 rounded-xl shadow-md flex items-center gap-1.5 text-[10px] transition-all duration-200 cursor-pointer"
                    title="지도 범례 보기"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                    <span>지도 범례 표시</span>
                  </button>
                ) : (
                  <div className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 shadow-md max-w-[220px] sm:max-w-xs text-[10px] text-slate-600 font-semibold space-y-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-1 mb-1 gap-4">
                      <span className="font-black text-slate-800 flex items-center gap-1">
                        <Info className="w-3.5 h-3.5 text-blue-600" />
                        지도 범례
                      </span>
                      <button
                        onClick={() => setShowLegend(false)}
                        className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors flex items-center justify-center cursor-pointer"
                        title="범례 접기"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] inline-block border border-blue-600 flex-shrink-0" />
                      <span>유럽 대륙 국가 노드</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#fb923c] inline-block border border-orange-600 flex-shrink-0" />
                      <span>아프리카 대륙 국가 노드</span>
                    </div>
                    <div className="h-px bg-slate-200 my-1" />
                    <p className="text-slate-400 italic text-[9px] leading-normal">경도를 가르는 자오선과 위도선을 마킹했습니다.</p>
                  </div>
                )}

                {/* SVG Map Canvas */}
                <svg
                  viewBox={`0 0 ${mapWidth} ${mapHeight}`}
                  className="w-full h-full select-none cursor-grab active:cursor-grabbing"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onWheel={handleWheel}
                >
                  
                  {/* Root Pan & Zoom Container */}
                  <g transform={`translate(${position.x}, ${position.y}) scale(${scale})`}>
                    {(() => {
                      const mapCircumference = 753.9822368615503;
                      const mapCircumferenceScreen = mapCircumference * scale;
                      const centerK = Math.floor(-position.x / mapCircumferenceScreen);
                      const visibleKs = [centerK - 1, centerK, centerK + 1, centerK + 2];
                      return visibleKs.map(k => (
                        <g key={k} transform={`translate(${k * mapCircumference}, 0)`}>
                          
                    
                    {/* Detailed Continental Landmasses with realistic shapes */}
                    <g className="transition-all duration-500">
                      {geographies.map((geo, i) => (
                        <path
                          key={i}
                          d={pathGenerator(geo) || ''}
                          fill={mapTheme === 'satellite' ? '#1e293b' : mapTheme === 'terrain' ? '#e2f0d9' : '#f8fafc'}
                          stroke={mapTheme === 'satellite' ? '#334155' : mapTheme === 'terrain' ? '#b8d8a5' : '#cbd5e1'}
                          strokeWidth="0.5"
                        />
                      ))}
                    </g>

                  {/* LATITUDE GRID LINES (위도선 15도 간격 정밀 마킹) */}
                  {[
                    { y: 80, label: "60° N", kr: "북위 60°" },
                    { y: 220, label: "45° N", kr: "북위 45°" },
                    { y: 350, label: "30° N", kr: "북위 30°" },
                    { y: 440, label: "15° N", kr: "북위 15°" },
                    { y: 490, label: "0° 적도", kr: "적도 (EQUATOR)", color: "#ef4444", width: 2 },
                    { y: 550, label: "15° S", kr: "남위 15°" },
                    { y: 580, label: "30° S", kr: "남위 30°" },
                  ].map((line, idx) => (
                    <g key={`lat-${idx}`} className="opacity-65 select-none pointer-events-none">
                      <line
                        x1="0"
                        y1={line.y}
                        x2="754"
                        y2={line.y}
                        stroke={line.color || (mapTheme === 'satellite' ? '#4f46e5' : '#cbd5e1')}
                        strokeWidth={line.width || 1}
                        strokeDasharray={line.width ? undefined : "3,4"}
                      />
                      <text
                        x="25"
                        y={line.y - 4}
                        fill={line.color || (mapTheme === 'satellite' ? '#818cf8' : '#64748b')}
                        className="text-[9px] font-mono font-black"
                      >
                        {line.label} ({line.kr})
                      </text>
                    </g>
                  ))}

                  {/* LONGITUDE GRID LINES (경도선 15도 간격 정밀 마킹) */}
                  {[
                    { x: 100, label: "30° W", kr: "서경 30°" },
                    { x: 180, label: "15° W", kr: "서경 15°" },
                    { x: 265, label: "0° 본초선", kr: "본초자오선", color: "#10b981", width: 2 },
                    { x: 350, label: "15° E", kr: "동경 15°" },
                    { x: 440, label: "30° E", kr: "동경 30°" },
                    { x: 520, label: "45° E", kr: "동경 45°" },
                    { x: 610, label: "60° E", kr: "동경 60°" },
                  ].map((line, idx) => (
                    <g key={`long-${idx}`} className="opacity-65 select-none pointer-events-none">
                      <line
                        x1={line.x}
                        y1="10"
                        x2={line.x}
                        y2="540"
                        stroke={line.color || (mapTheme === 'satellite' ? '#4f46e5' : '#cbd5e1')}
                        strokeWidth={line.width || 1}
                        strokeDasharray={line.width ? undefined : "3,4"}
                      />
                      <text
                        x={line.x + 4}
                        y="525"
                        fill={line.color || (mapTheme === 'satellite' ? '#818cf8' : '#64748b')}
                        className="text-[9px] font-mono font-black"
                      >
                        {line.label}
                      </text>
                    </g>
                  ))}

                  {/* TROPICS (회귀선 23.5° N/S 정밀 마킹) */}
                  {[
                    { y: 405, label: "Tropic of Cancer (북회귀선 23.5° N)" },
                    { y: 565, label: "Tropic of Capricorn (남회귀선 23.5° S)" },
                  ].map((tropic, idx) => (
                    <g key={`tropic-${idx}`} className="opacity-50 select-none pointer-events-none">
                      <line
                        x1="0"
                        y1={tropic.y}
                        x2="754"
                        y2={tropic.y}
                        stroke="#eab308"
                        strokeWidth="1"
                        strokeDasharray="2,3"
                      />
                      <text
                        x="400"
                        y={tropic.y - 3}
                        textAnchor="middle"
                        fill="#ca8a04"
                        className="text-[8px] font-mono font-black tracking-wider"
                      >
                        {tropic.label}
                      </text>
                    </g>
                  ))}

                  {/* Ocean text markings */}
                  <text x="40" y="270" fill={mapTheme === 'satellite' ? '#475569' : '#0284c7'} className="text-[10px] font-black italic opacity-50 font-mono">대서양 (ATLANTIC OCEAN)</text>
                  <text x="650" y="440" fill={mapTheme === 'satellite' ? '#475569' : '#0284c7'} className="text-[10px] font-black italic opacity-50 font-mono">인도양 (INDIAN OCEAN)</text>
                  <text x="310" y="315" fill={mapTheme === 'satellite' ? '#475569' : '#0284c7'} className="text-[9px] font-extrabold italic opacity-60 font-mono">지중해 (MEDITERRANEAN SEA)</text>

                  {/* Selected Country Active Focus Coordinates Crosshairs & Target Reticle HUD */}
                  <g className="transition-all duration-300">
                    {/* Concentric rings at focal coordinate */}
                    <circle
                      cx={getProjectedCoords(selectedCountry)[0]}
                      cy={getProjectedCoords(selectedCountry)[1]}
                      r="35"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="1"
                      strokeDasharray="1,2"
                      className="opacity-40"
                    />
                    
                    {/* Horizontal crosshair */}
                    <line 
                      x1="0" 
                      y1={getProjectedCoords(selectedCountry)[1]} 
                      x2="754" 
                      y2={getProjectedCoords(selectedCountry)[1]} 
                      stroke="#4f46e5" 
                      strokeWidth="1.5" 
                      strokeDasharray="4,4" 
                      className="opacity-50"
                    />
                    {/* Vertical crosshair */}
                    <line 
                      x1={getProjectedCoords(selectedCountry)[0]} 
                      y1="10" 
                      x2={getProjectedCoords(selectedCountry)[0]} 
                      y2="540" 
                      stroke="#4f46e5" 
                      strokeWidth="1.5" 
                      strokeDasharray="4,4" 
                      className="opacity-50"
                    />

                    {/* Floating HUD reticle badge over the focal point showing coordinates */}
                    <g transform={`translate(${getProjectedCoords(selectedCountry)[0]}, ${getProjectedCoords(selectedCountry)[1] + 26})`} className="opacity-95 select-none pointer-events-none">
                      <rect
                        x="-95"
                        y="-8"
                        width="190"
                        height="16"
                        rx="4"
                        fill="#1e1b4b"
                        stroke="#818cf8"
                        strokeWidth="1"
                      />
                      <text
                        textAnchor="middle"
                        y="3"
                        fill="#ffffff"
                        className="text-[8px] font-mono font-black"
                      >
                        GPS: {getCoordinateRange(selectedCountry.latitude)}, {getCoordinateRange(selectedCountry.longitude)}
                      </text>
                    </g>
                  </g>

                  {/* Draw connection lines to neighbors */}
                  {countriesData.map((c) => {
                    return c.surroundingCountries.map(neighName => {
                      const neigh = countriesData.find(n => n.name === neighName);
                      if (neigh && neigh.id > c.id) {
                        return (
                          <line
                            key={`${c.id}-${neigh.id}`}
                            x1={getProjectedCoords(c)[0]}
                            y1={getProjectedCoords(c)[1]}
                            x2={getProjectedCoords(neigh)[0]}
                            y2={getProjectedCoords(neigh)[1]}
                            stroke={mapTheme === 'satellite' ? '#4338ca' : '#94a3b8'}
                            strokeWidth="1.5"
                            strokeDasharray="3,3"
                            className="opacity-45"
                          />
                        );
                      }
                      return null;
                    });
                  })}

                  {/* Draw Nodes (Markers) for countries with National flags clearly showing */}
                  {countriesData.map((country) => {
                    const isSelected = selectedCountry?.id === country.id;
                    const isEurope = country.continent === '유럽';
                    const nodeColor = isEurope ? '#38bdf8' : '#fb923c';
                    
                    const [cx, cy] = getProjectedCoords(country);

                    return (
                      <g
                        key={country.id}
                        className="cursor-pointer"
                        onClick={(e) => {
                          if (dragged) {
                            e.stopPropagation();
                            return;
                          }
                          selectCountryDirect(country);
                        }}
                      >
                        {/* Red high visibility pinpoint icon or pulse ring for SELECTED country */}
                        {isSelected && (
                          <>
                            <circle
                              cx={cx}
                              cy={cy}
                              r="26"
                              fill="#ef4444"
                              className="opacity-20 animate-ping"
                            />
                            <circle
                              cx={cx}
                              cy={cy}
                              r="16"
                              fill="#ef4444"
                              className="opacity-10 animate-pulse"
                            />
                          </>
                        )}

                        {/* Standard Node Pin */}
                        <circle
                          cx={cx}
                          cy={cy}
                          r={isSelected ? "11" : "7"}
                          fill={isSelected ? '#ef4444' : nodeColor}
                          stroke={isSelected ? '#ffffff' : '#1e1b4b'}
                          strokeWidth={isSelected ? "3" : "1.5"}
                          className="transition-all duration-300"
                        />

                        {/* Text Label on Map with National Flag - EXPANDED and high fidelity */}
                        <g transform={`translate(${cx}, ${cy - 14})`}>
                          <rect
                            x="-38"
                            y="-9"
                            width="76"
                            height="17"
                            rx="4"
                            fill={isSelected ? '#ef4444' : '#ffffff'}
                            stroke={isSelected ? '#ffffff' : '#cbd5e1'}
                            strokeWidth="1"
                            className="shadow-md"
                          />
                          <image
                            href={getFlagImageUrl(country.id)}
                            x="-31"
                            y="-5.5"
                            width="14"
                            height="11"
                          />
                          <text
                            textAnchor="start"
                            x="-13"
                            y="3"
                            fill={isSelected ? '#ffffff' : '#0f172a'}
                            className="text-[9.5px] font-black font-sans"
                          >
                            {country.name}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                  
                        </g>
                      ));
                    })()}
</g>
                </svg>

              </div>

              {/* Associative Search Sidebar - Floating at the Bottom of Map viewport */}
              <div className="absolute bottom-4 right-4 z-10 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl text-white max-w-sm hidden md:block">
                <span className="text-[9px] text-blue-400 font-extrabold uppercase tracking-widest block mb-1">인접 지리 연관 검색어</span>
                <p className="text-xs text-slate-300 mb-3 font-semibold">이웃나라 국기를 누르면 지도가 즉시 포커스 이동해요.</p>
                <div className="flex flex-wrap gap-1.5">
                  {selectedCountry.surroundingCountries.map(neighName => {
                    const matchedCountry = countriesData.find(c => c.name === neighName);
                    return (
                      <button
                        key={neighName}
                        onClick={() => matchedCountry && selectCountryDirect(matchedCountry)}
                        disabled={!matchedCountry}
                        className={`text-[10px] px-2.5 py-1.5 rounded-full border transition-all flex items-center gap-1 ${
                          matchedCountry 
                            ? 'bg-slate-800 border-slate-700 hover:border-blue-400 hover:bg-slate-700 text-white cursor-pointer' 
                            : 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed'
                        }`}
                      >
                        {matchedCountry ? (
                          <img src={getFlagImageUrl(matchedCountry.id)} alt={matchedCountry.name} className="w-4 h-3 object-contain rounded-xs border border-slate-700" />
                        ) : '🌐'}
                        <span>{neighName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 mt-auto border-t border-slate-800 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center space-y-1.5">
          <p className="font-extrabold text-slate-300">🌍 세계 지리 사전 탐색 학습 플랫폼 (초등 6학년 사회과정)</p>
          <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto text-[11px]">
            본 서비스는 초등 교육과정을 효과적으로 시각화하고 학생들이 지형과 기후의 연관성을 스스로 발견할 수 있도록 돕는 인터랙티브 백과사전입니다.
          </p>
          <p className="text-slate-600 text-[10px]">© 2026 World Geography Interactive Platform. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
}
