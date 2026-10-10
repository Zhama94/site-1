import React from 'react';
import { REVIEWS_DATA } from '../data/toursData';
import { Star, Quote } from 'lucide-react';

interface ReviewsSectionProps {
  lang: 'ru' | 'en';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ lang }) => {
  return (
    <section id="reviews" className="py-24 sm:py-32 bg-[#090B0D] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
            <span>{lang === 'ru' ? 'Истории всадников' : 'Rider Testimonials'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
            {lang === 'ru'
              ? 'Что говорят те, кто уже покорил Сон-Куль'
              : 'Words from Those Who Rode Song-Kul'}
          </h2>
          <p className="text-base text-[#BFB7A8] mt-3 font-light">
            {lang === 'ru'
              ? 'Настоящие впечатления гостей экспедиций сезонов 2024–2025 годов.'
              : 'Verifiable memories from riders who joined our 2024–2025 Tian Shan departures.'}
          </p>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS_DATA.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#121518] border border-white/10 p-7 sm:p-8 rounded-sm flex flex-col justify-between"
            >
              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4 text-[#C9A86A]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#C9A86A]" />
                  ))}
                </div>

                <p className="text-sm text-[#D8D2C5] leading-relaxed italic mb-6 font-light">
                  "{rev.text}"
                </p>
              </div>

              {/* Author Attribution */}
              <div className="pt-5 border-t border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-serif-display text-base font-bold text-[#FDFBF7]">
                    {rev.author}
                  </div>
                  <div className="text-xs text-[#9E9688]">
                    {rev.location} · {rev.tourTaken}
                  </div>
                </div>
                <div className="text-[11px] text-[#C9A86A] font-medium">
                  {rev.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
