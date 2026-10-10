import React from 'react';
import { Compass, ShieldCheck, ArrowRight, Play } from 'lucide-react';

interface HeroProps {
  onExploreRoutes: () => void;
  onOpenCalculator: () => void;
  lang: 'ru' | 'en';
}

export const Hero: React.FC<HeroProps> = ({ onExploreRoutes, onOpenCalculator, lang }) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#0C0E10]">
      {/* Background Hero Photography */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_sonkul_riders_1791469936703.jpg"
          alt="Конная экспедиция на озере Сон-Куль в Кыргызстане"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Measured Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0C0E10] via-[#0C0E10]/65 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0C0E10]/85 via-transparent to-[#0C0E10]/60" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 text-left w-full">
        <div className="max-w-3xl">
          {/* Editorial Kicker */}
          <div className="flex items-center gap-3 text-xs sm:text-sm uppercase tracking-[0.25em] text-[#D8B97D] font-medium mb-5">
            <span className="w-8 h-[1px] bg-[#C9A86A]/70" />
            <span>
              {lang === 'ru'
                ? 'Высокогорные Экспедиции · Тянь-Шань · 3 016 м'
                : 'High-Altitude Expeditions · Tian Shan · 3,016 m'}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif-display text-4xl sm:text-6xl lg:text-7xl font-bold text-[#FDFBF7] tracking-tight leading-[1.08] mb-6 [text-wrap:balance]">
            {lang === 'ru' ? (
              <>
                Древний зов кочевников: <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#E2D4B7]">конные экспедиции</span> на жемчужину Сон-Куль
              </>
            ) : (
              <>
                The Ancient Nomadic Call: <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#E2D4B7]">Equestrian Expeditions</span> to Lake Song-Kul
              </>
            )}
          </h1>

          {/* Body Prose Value Proposition */}
          <p className="text-base sm:text-lg lg:text-xl text-[#D8D0C3] leading-relaxed max-w-2xl mb-10 font-light">
            {lang === 'ru'
              ? 'Бескрайние изумрудные джайлоо Тянь-Шаня, надежные кыргызские скакуны, тепло войлочных VIP-юрт под галактическим Млечным Путем и сертифицированные горные проводники с 15-летним опытом.'
              : 'Endless emerald Tian Shan alpine jailoo pastures, sure-footed Kyrgyz mountain horses, warm felt VIP yurts under the Milky Way, and certified expedition guides with 15+ years in the saddle.'}
          </p>

          {/* Action Points */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={onExploreRoutes}
              className="px-8 py-4 bg-[#C9A86A] hover:bg-[#D8B97D] text-[#0C0E10] text-sm uppercase font-semibold tracking-wider rounded-sm transition-all shadow-[0_4px_20px_rgba(201,168,106,0.3)] flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>{lang === 'ru' ? 'Выбрать маршрут 2026' : 'Explore 2026 Routes'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenCalculator}
              className="px-7 py-4 bg-[#14181B]/80 hover:bg-[#1E2328] border border-white/20 text-[#EDE7DC] hover:text-white text-sm uppercase font-medium tracking-wider rounded-sm transition-all flex items-center justify-center gap-2.5 backdrop-blur-sm cursor-pointer"
            >
              <Compass className="w-4 h-4 text-[#C9A86A]" />
              <span>{lang === 'ru' ? 'Рассчитать тур' : 'Custom Tour Builder'}</span>
            </button>
          </div>

          {/* Editorial Trust Markers & Key Altitude Facts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-white/15">
            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F3EFE6] tabular-nums">
                3 016 м
              </div>
              <div className="text-xs text-[#A8A093] mt-0.5">
                {lang === 'ru' ? 'Высота чаши озера' : 'Lake elevation'}
              </div>
            </div>

            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F3EFE6] tabular-nums">
                4–8 мест
              </div>
              <div className="text-xs text-[#A8A093] mt-0.5">
                {lang === 'ru' ? 'Камерные группы' : 'Intimate expedition size'}
              </div>
            </div>

            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F3EFE6] tabular-nums">
                100% VIP
              </div>
              <div className="text-xs text-[#A8A093] mt-0.5">
                {lang === 'ru' ? 'Печи, душ, шеф-повар' : 'Heated yurts & hot shower'}
              </div>
            </div>

            <div>
              <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F3EFE6] tabular-nums">
                Starlink
              </div>
              <div className="text-xs text-[#A8A093] mt-0.5">
                {lang === 'ru' ? 'Спутник и безопасность' : 'Satellite emergency link'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
