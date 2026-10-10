import React from 'react';
import { Compass, MapPin, Phone, Mail, ShieldCheck } from 'lucide-react';

interface FooterProps {
  lang: 'ru' | 'en';
}

export const Footer: React.FC<FooterProps> = ({ lang }) => {
  return (
    <footer className="bg-[#08090B] border-t border-white/10 text-[#A69E90] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-white/10">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm border border-[#C9A86A]/40 flex items-center justify-center bg-[#15191C]">
                <span className="font-serif-display text-base text-[#C9A86A] font-semibold">Т</span>
              </div>
              <span className="font-serif-display text-2xl font-bold tracking-wider text-[#FDFBF7]">
                ТАЙ ТРЭВЕЛ
              </span>
            </div>

            <p className="text-sm text-[#9A9284] leading-relaxed max-w-sm font-light">
              {lang === 'ru'
                ? 'ТАЙ ТРЭВЕЛ — премиальное экспедиционное агентство конного туризма на озере Сон-Куль. Лицензированные горные проводники, комфортабельные юртовые лагеря и аутентичное погружение в культуру кочевников Кыргызстана.'
                : 'TAY TRAVEL — premier luxury equestrian expedition agency operating high-mountain traverses to Lake Song-Kul, Kyrgyzstan. Certified guides, heated VIP yurt camps, and bespoke nomadic expeditions.'}
            </p>

            <div className="flex items-center gap-3 text-xs text-[#C9A86A] pt-2">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {lang === 'ru'
                  ? 'Лицензия туроператора КР №048291 · Страхование интуристов'
                  : 'Licensed Tour Operator of Kyrgyz Republic #048291'}
              </span>
            </div>
          </div>

          {/* Quick Nav (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#FDFBF7] font-semibold">
              {lang === 'ru' ? 'Навигация' : 'Navigation'}
            </div>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#routes" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Маршруты и программы' : 'Expedition Routes'}
                </a>
              </li>
              <li>
                <a href="#virtual-tour" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Виртуальный 360° тур по юрте' : '360° Yurt Virtual Tour'}
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'VIP-юрты и комфорт' : 'Yurt Camp & Comfort'}
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Google Карта Сон-Куль' : 'Google Satellite Map'}
                </a>
              </li>
              <li>
                <a href="#elevation" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Высотный профиль перевала' : 'Altitude Profile'}
                </a>
              </li>
              <li>
                <a href="#calculator" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Калькулятор бронирования' : 'Booking Calculator'}
                </a>
              </li>
              <li>
                <a href="#gear" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Чек-лист экипировки' : 'Gear & Packing Guide'}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#FDFBF7] transition-colors">
                  {lang === 'ru' ? 'Отзывы всадников' : 'Rider Reviews'}
                </a>
              </li>
            </ul>
          </div>

          {/* Expedition Bases & Contacts (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs uppercase tracking-wider text-[#FDFBF7] font-semibold">
              {lang === 'ru' ? 'Базы и координаты' : 'Bases & Contacts'}
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                <span>
                  {lang === 'ru'
                    ? 'Главный офис: г. Бишкек, бул. Эркиндик, 35 (БЦ «Атриум»)'
                    : 'HQ: 35 Erkindik Blvd, Bishkek, Kyrgyz Republic'}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Compass className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                <span>
                  {lang === 'ru'
                    ? 'Лагерь «Тай Делюкс»: оз. Сон-Куль (41°46′52″ с. ш., 75°08′34″ в. д.)'
                    : 'TAY Deluxe Camp: Lake Song-Kul (41°46′52″ N, 75°08′34″ E)'}
                </span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>+996 555 789 202 (WhatsApp / Telegram)</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#C9A86A] shrink-0" />
                <span>concierge@tay-travel.kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Sub-Footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#736B5E]">
          <div>
            © {new Date().getFullYear()} ТАЙ ТРЭВЕЛ (TAY TRAVEL). {lang === 'ru' ? 'Все права защищены.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-6">
            <span>{lang === 'ru' ? 'Сделано с любовью к горам Кыргызстана' : 'Crafted with respect to Kyrgyz nomadic heritage'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
