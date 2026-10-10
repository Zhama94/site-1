import React, { useState, useEffect } from 'react';
import { TourPackage } from '../types';
import { X, Clock, Navigation, Mountain, Check, AlertCircle, Calendar } from 'lucide-react';

interface TourDetailModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onBookTour: (tourId: string) => void;
  lang: 'ru' | 'en';
}

export const TourDetailModal: React.FC<TourDetailModalProps> = ({
  tour,
  onClose,
  onBookTour,
  lang,
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!tour) return null;

  const currentDayData = tour.itinerary.find((d) => d.dayNumber === activeDay) || tour.itinerary[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl bg-[#101316] border border-white/15 rounded-sm shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#14181C]">
          <div className="flex items-center gap-3">
            <span className="font-serif-display text-lg text-[#C9A86A] font-semibold">
              ТАЙ ТРЭВЕЛ
            </span>
            <span className="text-white/20">/</span>
            <span className="text-xs uppercase tracking-wider text-[#A49C8F]">
              {tour.durationDays} {lang === 'ru' ? 'Дней Экспедиции' : 'Days Expedition'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#9C9486] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8 flex-grow">
          {/* Header Banner */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-xs text-[#C9A86A] font-medium uppercase tracking-wider mb-2">
                <span>{tour.difficulty}</span>
                <span>·</span>
                <span>{tour.seasonMonths}</span>
                <span>·</span>
                <span className="tabular-nums">до {tour.elevationMax} м</span>
              </div>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#FDFBF7] mb-3 leading-tight">
                {tour.title}
              </h2>
              <p className="text-sm sm:text-base text-[#D4CDC1] leading-relaxed">
                {tour.summary}
              </p>
            </div>
            <div className="lg:col-span-5 relative rounded-sm overflow-hidden aspect-[16/10] border border-white/10">
              <img
                src={tour.mainImage}
                alt={tour.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <span className="text-xs text-[#E8DFD1] font-medium">
                  {lang === 'ru' ? 'Высокогорное плато Сон-Куль (3016 м)' : 'Lake Song-Kul Plateau (3,016m)'}
                </span>
              </div>
            </div>
          </div>

          {/* Day-by-Day Interactive Schedule */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif-display text-2xl font-bold text-[#FDFBF7]">
                {lang === 'ru' ? 'Программа по дням' : 'Day-by-Day Itinerary'}
              </h3>
              <span className="text-xs text-[#9C9486]">
                {lang === 'ru' ? 'Выберите день для деталей' : 'Select a day for route details'}
              </span>
            </div>

            {/* Days Horizontal Tab Bar */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 border-b border-white/10 scrollbar-thin">
              {tour.itinerary.map((d) => (
                <button
                  key={d.dayNumber}
                  onClick={() => setActiveDay(d.dayNumber)}
                  className={`px-4 py-2 rounded-sm text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    activeDay === d.dayNumber
                      ? 'bg-[#C9A86A] text-[#0C0E10]'
                      : 'bg-[#181D21] text-[#A69E90] hover:text-white hover:bg-[#20272C]'
                  }`}
                >
                  {lang === 'ru' ? `День ${d.dayNumber}` : `Day ${d.dayNumber}`}
                </button>
              ))}
            </div>

            {/* Active Day Detail Card */}
            {currentDayData && (
              <div className="mt-6 bg-[#161B1F] border border-white/10 p-6 rounded-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold">
                      {lang === 'ru' ? `День ${currentDayData.dayNumber}` : `Day ${currentDayData.dayNumber}`}
                    </span>
                    <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#FDFBF7] mt-1">
                      {currentDayData.title}
                    </h4>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-[#C4BCAD]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#C9A86A]" />
                      <span>{currentDayData.ridingHours} {lang === 'ru' ? 'ч в седле' : 'hrs riding'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Navigation className="w-4 h-4 text-[#C9A86A]" />
                      <span>{currentDayData.distanceKm} км</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Mountain className="w-4 h-4 text-[#C9A86A]" />
                      <span className="tabular-nums">{currentDayData.altitudeFrom} → {currentDayData.altitudeTo} м</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#D8D0C3] leading-relaxed mb-6 font-light">
                  {currentDayData.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-[#8E8678] uppercase tracking-wider block mb-1">
                      {lang === 'ru' ? 'Ночевка:' : 'Overnight Camp:'}
                    </span>
                    <span className="text-[#EDE7DC] font-medium">
                      {currentDayData.overnight}
                    </span>
                  </div>

                  <div>
                    <span className="text-[#8E8678] uppercase tracking-wider block mb-1">
                      {lang === 'ru' ? 'Ключевые локации:' : 'Route Highlights:'}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentDayData.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="bg-[#20272D] text-[#D8D0C3] px-2 py-0.5 rounded-sm"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Included / Not Included Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-white/10 pt-8">
            <div>
              <h4 className="font-serif-display text-xl font-bold text-[#FDFBF7] mb-4 flex items-center gap-2">
                <Check className="w-5 h-5 text-[#C9A86A]" />
                <span>{lang === 'ru' ? 'Включено в стоимость' : 'Included in Package'}</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#C4BCAD]">
                {tour.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A86A] mt-2 shrink-0" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif-display text-xl font-bold text-[#FDFBF7] mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[#A69E90]" />
                <span>{lang === 'ru' ? 'Оплачивается отдельно' : 'Not Included'}</span>
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#A69E90]">
                {tour.notIncluded.map((ninc, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-2 shrink-0" />
                    <span>{ninc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Modal Sticky Bottom Actions */}
        <div className="p-4 sm:p-6 bg-[#14181C] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#8E8678]">
              {lang === 'ru' ? 'Тариф за 1 участника' : 'Per rider rate'}
            </div>
            <div className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FDFBF7] tabular-nums">
              ${tour.pricePerPersonUsd.toLocaleString()}{' '}
              <span className="text-sm font-sans text-[#8E8678] font-normal">
                ({tour.pricePerPersonRub.toLocaleString()} ₽)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-5 py-3 text-xs uppercase font-medium text-[#C4BCAD] hover:text-white bg-[#1C2227] rounded-sm transition-colors cursor-pointer w-1/2 sm:w-auto"
            >
              {lang === 'ru' ? 'Закрыть' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTour(tour.id);
              }}
              className="px-8 py-3 text-xs uppercase font-semibold tracking-wider text-[#0C0E10] bg-[#C9A86A] hover:bg-[#D8B97D] rounded-sm transition-all cursor-pointer w-1/2 sm:w-auto"
            >
              {lang === 'ru' ? 'Забронировать этот тур' : 'Book this Tour'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
