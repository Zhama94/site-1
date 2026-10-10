import React from 'react';
import { TourPackage } from '../types';
import { ArrowUpRight, Calendar, Users, Mountain, Check } from 'lucide-react';

interface TourCardProps {
  tour: TourPackage;
  onOpenDetails: (tour: TourPackage) => void;
  onBookTour: (tourId: string) => void;
  currency: 'USD' | 'RUB';
  lang: 'ru' | 'en';
}

export const TourCard: React.FC<TourCardProps> = ({
  tour,
  onOpenDetails,
  onBookTour,
  currency,
  lang,
}) => {
  const priceDisplay =
    currency === 'USD'
      ? `$${tour.pricePerPersonUsd.toLocaleString()}`
      : `${tour.pricePerPersonRub.toLocaleString()} ₽`;

  return (
    <article className="group bg-[#121518] border border-white/10 hover:border-[#C9A86A]/40 transition-all duration-300 flex flex-col h-full rounded-sm overflow-hidden">
      {/* Visual Asset Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#181D21]">
        <img
          src={tour.mainImage}
          alt={tour.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#121518] via-transparent to-black/30" />

        {/* Clean unboxed difficulty & season indicator */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 drop-shadow-md">
          <span className="bg-[#0C0E10]/80 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10 font-medium">
            {tour.difficulty}
          </span>
          <span className="text-[#EDE8DF] text-[11px] font-medium bg-[#0C0E10]/80 backdrop-blur-sm px-2.5 py-1 rounded-sm border border-white/10">
            {tour.seasonMonths}
          </span>
        </div>
      </div>

      {/* Card Content Area */}
      <div className="p-6 sm:p-7 flex flex-col flex-grow">
        {/* Unboxed Metadata Line with typographic separators */}
        <div className="flex items-center gap-2 text-xs text-[#A8A093] mb-3">
          <span>{tour.durationDays} {lang === 'ru' ? 'дней' : 'days'} / {tour.durationNights} {lang === 'ru' ? 'ночей' : 'nights'}</span>
          <span aria-hidden="true">·</span>
          <span>{tour.groupSize}</span>
          <span aria-hidden="true">·</span>
          <span className="tabular-nums">до {tour.elevationMax} м</span>
        </div>

        {/* Title */}
        <h3 className="font-serif-display text-2xl font-bold text-[#FDFBF7] mb-2 group-hover:text-[#D8B97D] transition-colors">
          {tour.title}
        </h3>

        {/* Subtitle / Description */}
        <p className="text-sm text-[#BFB7A8] line-clamp-2 leading-relaxed mb-6 font-light">
          {tour.subtitle}
        </p>

        {/* Selected Highlights */}
        <div className="space-y-2 mb-6 flex-grow">
          <div className="text-[11px] uppercase tracking-wider text-[#C9A86A] font-semibold">
            {lang === 'ru' ? 'Включено в экспедицию:' : 'Expedition Highlights:'}
          </div>
          {tour.included.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-[#D8D2C5]">
              <Check className="w-3.5 h-3.5 text-[#C9A86A] shrink-0 mt-0.5" />
              <span className="line-clamp-2">{item}</span>
            </div>
          ))}
        </div>

        {/* Bottom Price & Actions */}
        <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8F877A]">
              {lang === 'ru' ? 'Стоимость / гость' : 'Price / guest'}
            </div>
            <div className="font-serif-display text-2xl font-bold text-[#FDFBF7] tabular-nums">
              {priceDisplay}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenDetails(tour)}
              className="px-3.5 py-2.5 text-xs font-medium text-[#D8D2C5] hover:text-white bg-[#1B2024] hover:bg-[#252B31] border border-white/10 rounded-sm transition-colors cursor-pointer"
            >
              {lang === 'ru' ? 'Маршрут' : 'Itinerary'}
            </button>
            <button
              onClick={() => onBookTour(tour.id)}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0C0E10] bg-[#C9A86A] hover:bg-[#D8B97D] rounded-sm transition-colors cursor-pointer"
            >
              {lang === 'ru' ? 'Выбрать' : 'Select'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
