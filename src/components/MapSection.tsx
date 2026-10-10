import React, { useState } from 'react';
import { MapPin, Navigation, Mountain, Compass, ExternalLink, Layers, Eye } from 'lucide-react';

interface MapPoint {
  id: string;
  name: string;
  category: 'camp' | 'pass' | 'scenic';
  elevation: number;
  lat: number;
  lng: number;
  description: string;
  queryParam: string;
}

interface MapSectionProps {
  lang: 'ru' | 'en';
  onBookPoint?: (name: string) => void;
}

export const MapSection: React.FC<MapSectionProps> = ({ lang }) => {
  const points: MapPoint[] = [
    {
      id: 'lake-center',
      name: lang === 'ru' ? 'Озеро Сон-Куль (3016 м)' : 'Lake Song-Kul Center',
      category: 'scenic',
      elevation: 3016,
      lat: 41.7755,
      lng: 75.1415,
      description: lang === 'ru'
        ? 'Высокогорное пресноводное озеро в котловине между хребтами Сонкёльтау и Молдотау. Зеркало — 270 км².'
        : 'High alpine alpine lake located between the Sonköl-Too and Moldo-Too ranges. 270 km² surface area.',
      queryParam: '41.7755,75.1415',
    },
    {
      id: 'camp-deluxe',
      name: lang === 'ru' ? 'VIP-Лагерь «Тай Делюкс» (Северный берег)' : 'TAY Deluxe Camp (North Shore)',
      category: 'camp',
      elevation: 3018,
      lat: 41.8322,
      lng: 75.1389,
      description: lang === 'ru'
        ? 'Главный базовый лагерь агентства ТАЙ ТРЭВЕЛ. Отапливаемые юрты с каминами, ресторанная юрта и вертолетная площадка.'
        : 'Main base camp for TAY Travel. Heated yurts with fireplaces, dining yurt, and helicopter pad.',
      queryParam: '41.8322,75.1389',
    },
    {
      id: 'pass-kalmak',
      name: lang === 'ru' ? 'Перевал Калмак-Ашуу (3446 м)' : 'Kalmak-Ashuu Pass (3,446 m)',
      category: 'pass',
      elevation: 3446,
      lat: 41.9167,
      lng: 75.4167,
      description: lang === 'ru'
        ? 'Ключевой восточный перевал экспедиции. Высшая точка классического маршрута с панорамой 360° на хребты Тянь-Шаня.'
        : 'Key eastern mountain pass and highest summit of the classic horseback crossing with panoramic views.',
      queryParam: '41.9167,75.4167',
    },
    {
      id: 'pass-moldo',
      name: lang === 'ru' ? 'Серпантин Молдо-Ашуу (3201 м)' : 'Moldo-Ashuu Pass (3,201 m)',
      category: 'pass',
      elevation: 3201,
      lat: 41.6167,
      lng: 75.0667,
      description: lang === 'ru'
        ? 'Грандиозный серпантин на южном спуске в сторону Нарына. 33 крутых петли над каньоном реки Куртка.'
        : 'Dramatic 33-switchback pass descending towards Naryn across the Kurtka river canyon.',
      queryParam: '41.6167,75.0667',
    },
    {
      id: 'pass-zhalgyz',
      name: lang === 'ru' ? 'Перевал Жалгыз-Карагай (3325 м)' : 'Zhalgyz-Karagai Pass (3,325 m)',
      category: 'pass',
      elevation: 3325,
      lat: 41.8752,
      lng: 75.0211,
      description: lang === 'ru'
        ? 'Северный входной перевал из урочища Килемче. Отсюда всадники впервые видят бирюзовое зеркало озера.'
        : 'Northern gateway pass leading from Kilemche meadows where riders catch their first vista of the lake.',
      queryParam: '41.8752,75.0211',
    },
    {
      id: 'camp-vostok',
      name: lang === 'ru' ? 'VIP-Лагерь «Тай Восток» (Батай-Арал)' : 'TAY East Camp (Batai-Aral)',
      category: 'camp',
      elevation: 3016,
      lat: 41.8021,
      lng: 75.2892,
      description: lang === 'ru'
        ? 'Восточная стоянка у песчано-травяной косы. Идеальное место для купания лошадей и закатных фотосессий.'
        : 'East shore camp on grassy spit, ideal for horses watering and golden hour photography.',
      queryParam: '41.8021,75.2892',
    },
    {
      id: 'waterfall-parrots',
      name: lang === 'ru' ? 'Водопад урочища «33 Попугая»' : '33 Parrots Waterfall Gorge',
      category: 'scenic',
      elevation: 2600,
      lat: 41.6055,
      lng: 75.0811,
      description: lang === 'ru'
        ? 'Живописный каскадный водопад высотой 30 метров в скальной расщелине по пути к Сон-Кулю.'
        : 'Spectacular 30-meter cascading mountain waterfall hidden in a rocky gorge near Moldo-Ashuu.',
      queryParam: '41.6055,75.0811',
    },
  ];

  const [selectedPoint, setSelectedPoint] = useState<MapPoint>(points[0]);
  const [mapType, setMapType] = useState<'k' | 'm'>('k'); // 'k' = satellite, 'm' = standard/terrain
  const [activeCategory, setActiveCategory] = useState<'all' | 'camp' | 'pass' | 'scenic'>('all');

  const filteredPoints = points.filter((p) => {
    if (activeCategory === 'all') return true;
    return p.category === activeCategory;
  });

  // Google Maps embed URL
  const embedUrl = `https://maps.google.com/maps?q=${selectedPoint.queryParam}&t=${mapType}&z=12&ie=UTF8&iwloc=&output=embed`;
  const fullGoogleMapsLink = `https://www.google.com/maps/search/?api=1&query=${selectedPoint.lat},${selectedPoint.lng}`;

  return (
    <section id="map" className="py-24 sm:py-32 bg-[#090B0D] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
              <span className="w-6 h-[1px] bg-[#C9A86A]" />
              <span>{lang === 'ru' ? 'Спутниковая Карта Google' : 'Google Satellite Map'}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
              {lang === 'ru'
                ? 'Интерактивная карта озера Сон-Куль и стоянок'
                : 'Interactive Map of Lake Song-Kul & Camps'}
            </h2>
            <p className="text-sm sm:text-base text-[#BFB7A8] mt-3 font-light max-w-2xl">
              {lang === 'ru'
                ? 'Исследуйте ключевые перевалы, базовые VIP-лагеря «Тай» и панорамные точки маршрутов прямо на спутниковых снимках Google.'
                : 'Explore mountain passes, TAY VIP yurt outposts, and scenic waypoints directly on high-resolution Google imagery.'}
            </p>
          </div>

          {/* Controls: Satellite toggle + Category Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-[#15191C] border border-white/10 rounded-sm p-1 text-xs">
              <button
                onClick={() => setMapType('k')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mapType === 'k'
                    ? 'bg-[#C9A86A] text-[#0C0E10]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Спутник' : 'Satellite'}</span>
              </button>
              <button
                onClick={() => setMapType('m')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer flex items-center gap-1.5 ${
                  mapType === 'm'
                    ? 'bg-[#C9A86A] text-[#0C0E10]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>{lang === 'ru' ? 'Схема' : 'Terrain'}</span>
              </button>
            </div>

            <div className="flex items-center bg-[#15191C] border border-white/10 rounded-sm p-1 text-xs">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-white/15 text-[#FDFBF7] font-semibold'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Все точки' : 'All'}
              </button>
              <button
                onClick={() => setActiveCategory('camp')}
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  activeCategory === 'camp'
                    ? 'bg-white/15 text-[#FDFBF7] font-semibold'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Лагеря' : 'Camps'}
              </button>
              <button
                onClick={() => setActiveCategory('pass')}
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer ${
                  activeCategory === 'pass'
                    ? 'bg-white/15 text-[#FDFBF7] font-semibold'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Перевалы' : 'Passes'}
              </button>
            </div>
          </div>
        </div>

        {/* Map Layout: Left Sidebar + Right Google Map Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-[#121518] border border-white/10 rounded-sm overflow-hidden p-3 sm:p-5">
          {/* Waypoint Navigator List (4 cols) */}
          <div className="lg:col-span-4 flex flex-col space-y-2.5 max-h-[560px] overflow-y-auto pr-1">
            <div className="text-[11px] uppercase tracking-wider text-[#C9A86A] font-semibold px-2 pb-1">
              {lang === 'ru' ? 'Локации экспедиции ТАЙ ТРЭВЕЛ:' : 'TAY Travel Expedition Points:'}
            </div>

            {filteredPoints.map((point) => {
              const isSelected = selectedPoint.id === point.id;
              return (
                <div
                  key={point.id}
                  onClick={() => setSelectedPoint(point)}
                  className={`p-3.5 rounded-sm border transition-all cursor-pointer text-left ${
                    isSelected
                      ? 'border-[#C9A86A] bg-[#1A1F24]'
                      : 'border-white/5 bg-[#161B1F] hover:border-white/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-6 h-6 rounded-sm flex items-center justify-center shrink-0 ${
                          point.category === 'camp'
                            ? 'bg-[#C9A86A]/20 text-[#C9A86A]'
                            : point.category === 'pass'
                            ? 'bg-[#60A5FA]/20 text-[#60A5FA]'
                            : 'bg-[#34D399]/20 text-[#34D399]'
                        }`}
                      >
                        {point.category === 'camp' && <Navigation className="w-3.5 h-3.5" />}
                        {point.category === 'pass' && <Mountain className="w-3.5 h-3.5" />}
                        {point.category === 'scenic' && <Compass className="w-3.5 h-3.5" />}
                      </div>

                      <div className="font-serif-display text-sm sm:text-base font-bold text-[#FDFBF7] leading-snug">
                        {point.name}
                      </div>
                    </div>

                    <span className="text-[11px] font-mono text-[#C9A86A] shrink-0 font-semibold tabular-nums">
                      {point.elevation} м
                    </span>
                  </div>

                  <p className="text-xs text-[#9E9688] mt-2 line-clamp-2 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Interactive Google Maps Frame (8 cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[500px] rounded-sm overflow-hidden border border-white/10 bg-[#161B1F]">
              <iframe
                title="Google Map Song-Kul Lake"
                src={embedUrl}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Float badge over map */}
              <div className="absolute top-3 left-3 bg-[#0C0E10]/85 backdrop-blur-md px-3 py-2 rounded-sm border border-white/10 text-xs text-[#EDE8DF] flex items-center gap-2 pointer-events-none shadow-lg">
                <MapPin className="w-4 h-4 text-[#C9A86A]" />
                <span className="font-medium">{selectedPoint.name}</span>
                <span className="text-[#8E8678]">·</span>
                <span className="tabular-nums font-mono text-[#C9A86A]">{selectedPoint.elevation} м</span>
              </div>
            </div>

            {/* Bottom Info Bar & External Google Maps Link */}
            <div className="mt-3 pt-3 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#9E9688]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[#FDFBF7]">
                  GPS: {selectedPoint.lat.toFixed(4)}° N, {selectedPoint.lng.toFixed(4)}° E
                </span>
                <span>·</span>
                <span>{selectedPoint.description}</span>
              </div>

              <a
                href={fullGoogleMapsLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1B2126] hover:bg-[#252D34] text-[#C9A86A] hover:text-white rounded-sm border border-white/10 transition-colors shrink-0"
              >
                <span>{lang === 'ru' ? 'Открыть в Google Maps' : 'Open in Google Maps'}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
