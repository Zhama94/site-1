import React, { useState } from 'react';
import { Mountain, MapPin, Wind, Thermometer, Info } from 'lucide-react';

interface Waypoint {
  id: string;
  name: string;
  altitude: number;
  stage: string;
  terrain: string;
  oxygen: string;
  nightTemp: string;
  description: string;
  xPercent: number;
  yPercent: number; // mapped relative to height
}

interface ElevationProfileProps {
  lang: 'ru' | 'en';
}

export const ElevationProfile: React.FC<ElevationProfileProps> = ({ lang }) => {
  const waypoints: Waypoint[] = [
    {
      id: 'bishkek',
      name: lang === 'ru' ? 'Бишкек / Аэропорт Манас' : 'Bishkek / Manas Airport',
      altitude: 800,
      stage: lang === 'ru' ? 'День 1: Встреча' : 'Day 1: Arrival',
      terrain: lang === 'ru' ? 'Долинный асфальт' : 'Valley highway',
      oxygen: '100%',
      nightTemp: '+18°C',
      description: lang === 'ru'
        ? 'Встреча в VIP-зале, посадка во внедорожники Lexus GX/LX, трансфер через живописное Боомское ущелье.'
        : 'VIP airport pickup, luxury 4x4 transfer via dramatic Boom Gorge towards Kochkor valley.',
      xPercent: 5,
      yPercent: 88,
    },
    {
      id: 'kochkor',
      name: lang === 'ru' ? 'Кочкор / Кызарт' : 'Kochkor / Kyzart Base',
      altitude: 2100,
      stage: lang === 'ru' ? 'День 1–2: Старт' : 'Day 1–2: Base Camp',
      terrain: lang === 'ru' ? 'Предгорная степь' : 'Foothill steppe',
      oxygen: '79%',
      nightTemp: '+12°C',
      description: lang === 'ru'
        ? 'Базовый лагерь, знакомство с лошадьми, подгонка седел под анатомию всадника, тренировочный выезд.'
        : 'Stables & tack fitting, introductory saddle ride along peaceful mountain meadows.',
      xPercent: 22,
      yPercent: 62,
    },
    {
      id: 'kilemche',
      name: lang === 'ru' ? 'Джайлоо Килемче' : 'Kilemche Jailoo',
      altitude: 2600,
      stage: lang === 'ru' ? 'День 2: Подъем' : 'Day 2: Ascent',
      terrain: lang === 'ru' ? 'Ковровые альпийские луга' : 'Alpine carpet meadows',
      oxygen: '74%',
      nightTemp: '+8°C',
      description: lang === 'ru'
        ? 'Урочище Килемче («шелковый ковер»), поля диких горных цветов, ночевка в юртах у ручья перед перевалом.'
        : 'Named "The Carpet", emerald undulating hills, picnic lunch by crystal mountain stream.',
      xPercent: 38,
      yPercent: 50,
    },
    {
      id: 'zhalgyz',
      name: lang === 'ru' ? 'Перевал Жалгыз-Карагай' : 'Zhalgyz-Karagai Pass',
      altitude: 3325,
      stage: lang === 'ru' ? 'День 3: Гребень' : 'Day 3: Ridge Crest',
      terrain: lang === 'ru' ? 'Каменистый серпантин' : 'Rocky mountain switchback',
      oxygen: '68%',
      nightTemp: '+2°C',
      description: lang === 'ru'
        ? 'Крутой подъем шагом. С гребня впервые открывается необъятная чаша Сон-Куля, окруженная снежниками.'
        : 'Spectacular 360° crest where riders get their first breathtaking view of the turquoise lake basin.',
      xPercent: 52,
      yPercent: 25,
    },
    {
      id: 'sonkul',
      name: lang === 'ru' ? 'Озеро Сон-Куль (VIP Лагерь «Тай»)' : 'Lake Song-Kul (TAY VIP Camp)',
      altitude: 3016,
      stage: lang === 'ru' ? 'День 3–5: Плато' : 'Day 3–5: Lake Basin',
      terrain: lang === 'ru' ? 'Широкая мягкая степь' : 'Soft steppe lakeshore',
      oxygen: '70%',
      nightTemp: '+4°C',
      description: lang === 'ru'
        ? 'Жемчужина Тянь-Шаня. Простор для свободного галопа, теплая юрта, баня, дегустация кумыса и саамала.'
        : 'High-altitude inland sea at 3,016m. Pure galloping terrain, campfire hospitality, Milky Way astronomy.',
      xPercent: 68,
      yPercent: 36,
    },
    {
      id: 'kalmak',
      name: lang === 'ru' ? 'Перевал Калмак-Ашуу' : 'Kalmak-Ashuu Pass',
      altitude: 3446,
      stage: lang === 'ru' ? 'День 6: Высшая точка' : 'Day 6: Highest Apex',
      terrain: lang === 'ru' ? 'Высокогорная сыпуха' : 'Alpine ridge trail',
      oxygen: '66%',
      nightTemp: '0°C',
      description: lang === 'ru'
        ? 'Самый высокий перевал на пути каравана (3446 м). Место обитания снежных барсов и беркутов.'
        : 'The pinnacle pass of the expedition (3,446m). Crisp thin air, glaciers, and wild alpine raptors.',
      xPercent: 82,
      yPercent: 18,
    },
    {
      id: 'moldo',
      name: lang === 'ru' ? 'Серпантин Молдо-Ашуу & 33 Попугая' : 'Moldo-Ashuu Serpentine',
      altitude: 3201,
      stage: lang === 'ru' ? 'Спуск в Нарын' : 'Descent into Naryn',
      terrain: lang === 'ru' ? 'Скальный каньон' : 'Gorge switchback',
      oxygen: '69%',
      nightTemp: '+6°C',
      description: lang === 'ru'
        ? 'Знаменитые 33 петли серпантина сквозь облака и водопад урочища «33 попугая» с видом на ущелье реки Нарын.'
        : 'Famous dramatic 33-turn serpentine winding down towards cascading mountain waterfalls.',
      xPercent: 95,
      yPercent: 30,
    },
  ];

  const [selectedPoint, setSelectedPoint] = useState<Waypoint>(waypoints[4]); // default to Song-Kul

  return (
    <section id="elevation" className="py-24 sm:py-32 bg-[#0C0E10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
            <span>{lang === 'ru' ? 'Топография и Акклиматизация' : 'Topography & Acclimatization'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
            {lang === 'ru'
              ? 'Высотный профиль перехода на Сон-Куль'
              : 'Interactive Altitude Profile & Expedition Trail'}
          </h2>
          <p className="text-base text-[#BFB7A8] mt-3 font-light">
            {lang === 'ru'
              ? 'Наши экспедиции разработаны с учетом плавной физиологической акклиматизации: от 800 метров в Бишкеке до перевалов высотой свыше 3400 метров.'
              : 'Scientifically calibrated gradual acclimatization from Bishkek (800m) to passes surpassing 3,446m.'}
          </p>
        </div>

        {/* Profile Card Container */}
        <div className="bg-[#121518] border border-white/10 rounded-sm p-6 sm:p-8">
          {/* Elevation Interactive Graph Area */}
          <div className="relative w-full h-64 sm:h-80 bg-[#161B1F] border border-white/5 rounded-sm overflow-hidden mb-8">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between p-4 pointer-events-none opacity-20 text-[10px] text-[#A69E90]">
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <span>3500 м — Высокогорные перевалы</span>
                <span>Перевал Калмак-Ашуу (3446 м)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <span>3000 м — Чаша озера Сон-Куль</span>
                <span>Зеркало воды (3016 м)</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <span>2000 м — Джайлоо Килемче</span>
                <span>Предгорья Тянь-Шаня</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/20 pb-1">
                <span>800 м — Долина Чу</span>
                <span>Бишкек</span>
              </div>
            </div>

            {/* SVG Mountain Curve */}
            <svg
              className="absolute inset-0 w-full h-full preserve-3d"
              viewBox="0 0 1000 350"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="altitudeGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C9A86A" stopOpacity="0.4" />
                  <stop offset="60%" stopColor="#C9A86A" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#C9A86A" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Area under curve */}
              <path
                d="M 50 320 Q 150 310 220 230 T 380 180 T 520 70 T 680 120 T 820 45 T 950 100 L 950 350 L 50 350 Z"
                fill="url(#altitudeGradient)"
              />

              {/* Main stroke line */}
              <path
                d="M 50 320 Q 150 310 220 230 T 380 180 T 520 70 T 680 120 T 820 45 T 950 100"
                fill="none"
                stroke="#C9A86A"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </svg>

            {/* Interactive Waypoint Nodes */}
            {waypoints.map((wp) => {
              const isSelected = selectedPoint.id === wp.id;
              return (
                <button
                  key={wp.id}
                  onClick={() => setSelectedPoint(wp)}
                  style={{
                    left: `${wp.xPercent}%`,
                    top: `${wp.yPercent}%`,
                  }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer transition-transform p-1.5 focus:outline-none`}
                  title={`${wp.name}: ${wp.altitude}м`}
                >
                  <div
                    className={`w-3.5 h-3.5 rounded-full transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-[#C9A86A] ring-4 ring-[#C9A86A]/30 scale-125'
                        : 'bg-[#EDE7DC] hover:scale-125 border border-[#0C0E10]'
                    }`}
                  />
                  <span
                    className={`hidden sm:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 text-[10px] font-semibold whitespace-nowrap px-1.5 py-0.5 rounded-sm border transition-opacity ${
                      isSelected
                        ? 'bg-[#C9A86A] text-[#0C0E10] border-[#C9A86A]'
                        : 'bg-[#101316] text-[#D8D0C3] border-white/10 opacity-75 group-hover:opacity-100'
                    }`}
                  >
                    {wp.altitude} м
                  </span>
                </button>
              );
            })}
          </div>

          {/* Selected Waypoint Detailed Dossier */}
          <div className="bg-[#161B1F] border border-white/10 p-6 sm:p-7 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-1">
                <span>{selectedPoint.stage}</span>
                <span>·</span>
                <span className="tabular-nums font-bold text-base text-[#FDFBF7]">
                  {selectedPoint.altitude} метров
                </span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#FDFBF7] mb-2">
                {selectedPoint.name}
              </h3>
              <p className="text-sm text-[#BFB7A8] leading-relaxed font-light">
                {selectedPoint.description}
              </p>
            </div>

            {/* Quick Metrics of this spot */}
            <div className="grid grid-cols-3 gap-4 border-t md:border-t-0 md:border-l border-white/10 pt-4 md:pt-0 md:pl-6 shrink-0 text-xs">
              <div>
                <div className="flex items-center gap-1.5 text-[#8E8678] mb-1">
                  <Wind className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{lang === 'ru' ? 'Кислород' : 'Oxygen'}</span>
                </div>
                <div className="text-sm font-semibold text-[#FDFBF7] tabular-nums">
                  {selectedPoint.oxygen}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#8E8678] mb-1">
                  <Thermometer className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{lang === 'ru' ? 'Ночь' : 'Night'}</span>
                </div>
                <div className="text-sm font-semibold text-[#FDFBF7] tabular-nums">
                  {selectedPoint.nightTemp}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#8E8678] mb-1">
                  <Mountain className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>{lang === 'ru' ? 'Рельеф' : 'Terrain'}</span>
                </div>
                <div className="text-xs font-medium text-[#FDFBF7] line-clamp-1">
                  {selectedPoint.terrain}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
