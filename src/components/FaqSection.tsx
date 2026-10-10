import React, { useState } from 'react';
import { FAQ_DATA } from '../data/toursData';
import { ChevronDown } from 'lucide-react';

interface FaqSectionProps {
  lang: 'ru' | 'en';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ lang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 sm:py-32 bg-[#0C0E10] border-t border-white/5 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14 text-center mx-auto">
          <div className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
            <span>{lang === 'ru' ? 'Вопросы и Ответы' : 'Frequently Asked Questions'}</span>
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
            {lang === 'ru'
              ? 'Все, что важно знать перед поездкой'
              : 'Essential Details Before the Saddle'}
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#121518] border border-white/10 rounded-sm overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span className="font-serif-display text-lg sm:text-xl font-bold text-[#FDFBF7]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C9A86A] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#BFB7A8] leading-relaxed border-t border-white/5 font-light">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
