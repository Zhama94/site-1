import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

interface HeaderProps {
  onOpenBooking: (tourId?: string) => void;
  lang: 'ru' | 'en';
  setLang: (lang: 'ru' | 'en') => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking, lang, setLang }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = lang === 'ru' ? [
    { label: 'Маршруты', href: '#routes' },
    { label: 'Юрта 360°', href: '#virtual-tour' },
    { label: 'Карта Сон-Куль', href: '#map' },
    { label: 'Лагеря', href: '#experience' },
    { label: 'Калькулятор', href: '#calculator' },
    { label: 'Экипировка', href: '#gear' },
  ] : [
    { label: 'Routes', href: '#routes' },
    { label: '360° Yurt', href: '#virtual-tour' },
    { label: 'Google Map', href: '#map' },
    { label: 'Camp Comfort', href: '#experience' },
    { label: 'Calculator', href: '#calculator' },
    { label: 'Gear Guide', href: '#gear' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0C0E10]/90 border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand wordmark in display serif */}
        <a href="#" className="flex items-center gap-3 group text-left">
          <div className="w-9 h-9 rounded-sm border border-[#C9A86A]/40 flex items-center justify-center bg-[#15191C] group-hover:border-[#C9A86A] transition-colors">
            <span className="font-serif-display text-lg text-[#C9A86A] font-semibold">Т</span>
          </div>
          <div>
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-wider text-[#F3EFE6] block">
              ТАЙ ТРЭВЕЛ
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-[#C9A86A] block font-sans-body">
              {lang === 'ru' ? 'Конные Экспедиции · Сон-Куль' : 'TAY Travel · Song-Kul'}
            </span>
          </div>
        </a>

        {/* Zone 2: 4-6 text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#C4BCAD]">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-[#F3EFE6] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C9A86A] hover:after:w-full after:transition-all whitespace-nowrap"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Language toggle & Primary Action */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language selector */}
          <div className="flex items-center bg-[#161A1D] border border-white/10 rounded-sm p-0.5 text-xs">
            <button
              onClick={() => setLang('ru')}
              className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${
                lang === 'ru' ? 'bg-[#C9A86A] text-[#0C0E10]' : 'text-[#A0988A] hover:text-white'
              }`}
            >
              RU
            </button>
            <button
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-sm font-medium transition-colors ${
                lang === 'en' ? 'bg-[#C9A86A] text-[#0C0E10]' : 'text-[#A0988A] hover:text-white'
              }`}
            >
              EN
            </button>
          </div>

          {/* Primary CTA */}
          <button
            onClick={() => onOpenBooking()}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0C0E10] bg-[#C9A86A] hover:bg-[#D8B97D] active:scale-[0.98] rounded-sm transition-all shadow-[0_2px_12px_rgba(201,168,106,0.2)] whitespace-nowrap cursor-pointer"
          >
            <span>{lang === 'ru' ? 'Забронировать тур' : 'Book Expedition'}</span>
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#C4BCAD] hover:text-white focus:outline-none focus:ring-1 focus:ring-[#C9A86A]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#101316] border-b border-white/10 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base text-[#D4CDC1] hover:text-[#C9A86A] py-1 border-b border-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-[#0C0E10] bg-[#C9A86A] rounded-sm"
            >
              {lang === 'ru' ? 'Забронировать тур' : 'Book Expedition'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
