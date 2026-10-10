import React, { useState } from 'react';
import { TOURS_DATA } from '../data/toursData';
import { TourPackage } from '../types';
import { TourCard } from './TourCard';

interface ToursSectionProps {
  onOpenDetails: (tour: TourPackage) => void;
  onBookTour: (tourId: string) => void;
  lang: 'ru' | 'en';
}

export const ToursSection: React.FC<ToursSectionProps> = ({
  onOpenDetails,
  onBookTour,
  lang,
}) => {
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all');
  const [currency, setCurrency] = useState<'USD' | 'RUB'>('USD');

  const filteredTours = TOURS_DATA.filter((tour) => {
    if (filterDifficulty === 'all') return true;
    if (filterDifficulty === 'beginner') return tour.difficulty === 'Для всех уровней';
    if (filterDifficulty === 'intermediate') return tour.difficulty === 'Средний';
    if (filterDifficulty === 'advanced') return tour.difficulty === 'Продвинутый';
    return true;
  });

  return (
    <section id="routes" className="py-24 sm:py-32 bg-[#0C0E10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
              <span className="w-6 h-[1px] bg-[#C9A86A]" />
              <span>{lang === 'ru' ? 'Сезон 2026 · Экспедиции' : 'Season 2026 · Expeditions'}</span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
              {lang === 'ru'
                ? 'Коллекция авторских конных маршрутов'
                : 'Curated Horseback Expedition Routes'}
            </h2>
          </div>

          {/* Controls: Difficulty filter + Currency Switch */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Currency Selector */}
            <div className="flex items-center bg-[#15191C] border border-white/10 rounded-sm p-1 text-xs">
              <button
                onClick={() => setCurrency('USD')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${
                  currency === 'USD'
                    ? 'bg-[#C9A86A] text-[#0C0E10]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                USD ($)
              </button>
              <button
                onClick={() => setCurrency('RUB')}
                className={`px-3 py-1.5 rounded-sm font-semibold transition-colors cursor-pointer ${
                  currency === 'RUB'
                    ? 'bg-[#C9A86A] text-[#0C0E10]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                RUB (₽)
              </button>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center bg-[#15191C] border border-white/10 rounded-sm p-1 text-xs">
              <button
                onClick={() => setFilterDifficulty('all')}
                className={`px-3 py-1.5 rounded-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterDifficulty === 'all'
                    ? 'bg-white/15 text-[#FDFBF7]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Все туры' : 'All Tours'}
              </button>
              <button
                onClick={() => setFilterDifficulty('beginner')}
                className={`px-3 py-1.5 rounded-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterDifficulty === 'beginner'
                    ? 'bg-white/15 text-[#FDFBF7]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Для начинающих' : 'Beginner Friendly'}
              </button>
              <button
                onClick={() => setFilterDifficulty('intermediate')}
                className={`px-3 py-1.5 rounded-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterDifficulty === 'intermediate'
                    ? 'bg-white/15 text-[#FDFBF7]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Средний уровень' : 'Intermediate'}
              </button>
              <button
                onClick={() => setFilterDifficulty('advanced')}
                className={`px-3 py-1.5 rounded-sm font-medium transition-colors cursor-pointer whitespace-nowrap ${
                  filterDifficulty === 'advanced'
                    ? 'bg-white/15 text-[#FDFBF7]'
                    : 'text-[#9E9688] hover:text-white'
                }`}
              >
                {lang === 'ru' ? 'Экспедиция 10 дней' : '10-Day Pro'}
              </button>
            </div>
          </div>
        </div>

        {/* 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => (
            <TourCard
              key={tour.id}
              tour={tour}
              onOpenDetails={onOpenDetails}
              onBookTour={onBookTour}
              currency={currency}
              lang={lang}
            />
          ))}
        </div>

        {/* Private Expedition Callout */}
        <div className="mt-14 p-8 sm:p-10 bg-[#121518] border border-white/10 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h4 className="font-serif-display text-2xl font-bold text-[#FDFBF7] mb-2">
              {lang === 'ru'
                ? 'Желаете полностью закрытую приватную экспедицию?'
                : 'Looking for a Bespoke Private Expedition?'}
            </h4>
            <p className="text-sm text-[#BDB5A5] leading-relaxed">
              {lang === 'ru'
                ? 'Мы организуем эксклюзивные выезды для семей, закрытых клубов и друзей: индивидуальный темп верховой езды, личный шеф-повар, вертолетный трансфер и маршруты вне туристических троп.'
                : 'Custom dates, personal chef, helicopter airlift, private yurt camp, and off-grid mountain trails tailored exclusively to your group.'}
            </p>
          </div>
          <button
            onClick={() => onBookTour('custom')}
            className="px-7 py-3.5 bg-[#C9A86A] hover:bg-[#D8B97D] text-[#0C0E10] text-xs uppercase font-semibold tracking-wider rounded-sm transition-all whitespace-nowrap cursor-pointer"
          >
            {lang === 'ru' ? 'Запросить VIP-экспедицию' : 'Request Private Tour'}
          </button>
        </div>
      </div>
    </section>
  );
};
