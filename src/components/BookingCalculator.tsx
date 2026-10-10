import React, { useState } from 'react';
import { TOURS_DATA } from '../data/toursData';
import { BookingState } from '../types';
import { Calculator, Check, Users, Calendar, Shield, Sparkles, Send, CheckCircle2 } from 'lucide-react';

interface BookingCalculatorProps {
  initialTourId?: string;
  lang: 'ru' | 'en';
}

export const BookingCalculator: React.FC<BookingCalculatorProps> = ({
  initialTourId = 'korolevsky-sonkul',
  lang,
}) => {
  const [selectedTourId, setSelectedTourId] = useState<string>(initialTourId);
  const [ridingLevel, setRidingLevel] = useState<'beginner' | 'intermediate' | 'expert'>('beginner');
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [selectedMonth, setSelectedMonth] = useState<'june' | 'july' | 'august' | 'september'>('july');
  const [currency, setCurrency] = useState<'USD' | 'RUB'>('USD');

  // Add-ons
  const [addons, setAddons] = useState({
    helicopterTransfer: false,
    privateYurt: true,
    dronePhotographer: false,
    saunaExperience: true,
    eagleHuntingDemo: false,
  });

  // Client form
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedTour = TOURS_DATA.find((t) => t.id === selectedTourId) || TOURS_DATA[1];

  // Pricing math
  const baseRateUsd = selectedTour.pricePerPersonUsd;
  const baseRateRub = selectedTour.pricePerPersonRub;

  // Add-on costs in USD
  const addonPricesUsd = {
    helicopterTransfer: 1200, // group flat
    privateYurt: 350 * guestsCount,
    dronePhotographer: 600,
    saunaExperience: 180,
    eagleHuntingDemo: 250,
  };

  const exchangeRate = 93; // 1 USD = 93 RUB

  let totalUsd = baseRateUsd * guestsCount;
  if (addons.helicopterTransfer) totalUsd += addonPricesUsd.helicopterTransfer;
  if (addons.privateYurt) totalUsd += addonPricesUsd.privateYurt;
  if (addons.dronePhotographer) totalUsd += addonPricesUsd.dronePhotographer;
  if (addons.saunaExperience) totalUsd += addonPricesUsd.saunaExperience;
  if (addons.eagleHuntingDemo) totalUsd += addonPricesUsd.eagleHuntingDemo;

  const totalRub = Math.round(totalUsd * exchangeRate);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientPhone) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  return (
    <section id="calculator" className="py-24 sm:py-32 bg-[#090B0D] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
            <span>{lang === 'ru' ? 'Конструктор Экспедиции' : 'Expedition Configurator'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
            {lang === 'ru'
              ? 'Рассчитайте ваш конный тур на Сон-Куль'
              : 'Configure & Estimate Your Son-Kul Expedition'}
          </h2>
          <p className="text-base text-[#BFB7A8] mt-3 font-light">
            {lang === 'ru'
              ? 'Выберите подходящий маршрут, даты сезона 2026 и дополнительные премиум-опции для прозрачного расчета стоимости.'
              : 'Transparent real-time calculation based on your preferred route, group size, and bespoke luxury services.'}
          </p>
        </div>

        {/* Calculator Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Configurator Steps (7 cols) */}
          <div className="lg:col-span-7 space-y-8 bg-[#121518] border border-white/10 p-6 sm:p-8 rounded-sm">
            {/* Step 1: Select Tour */}
            <div>
              <div className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-3">
                1. {lang === 'ru' ? 'Выберите маршрут экспедиции' : 'Select Expedition Route'}
              </div>
              <div className="space-y-2.5">
                {TOURS_DATA.map((t) => {
                  const isSelected = t.id === selectedTourId;
                  return (
                    <div
                      key={t.id}
                      onClick={() => setSelectedTourId(t.id)}
                      className={`p-4 border rounded-sm transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isSelected
                          ? 'border-[#C9A86A] bg-[#1A1F24]'
                          : 'border-white/10 bg-[#161B1F] hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-serif-display text-lg font-bold text-[#FDFBF7]">
                            {t.title}
                          </span>
                          <span className="text-xs text-[#C9A86A]">
                            ({t.durationDays} {lang === 'ru' ? 'дней' : 'days'})
                          </span>
                        </div>
                        <div className="text-xs text-[#9E9688] mt-0.5">
                          {t.difficulty} · {t.seasonMonths}
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-serif-display text-lg font-bold text-[#FDFBF7] tabular-nums">
                          ${t.pricePerPersonUsd}
                        </div>
                        <div className="text-[10px] text-[#8E8678]">
                          {lang === 'ru' ? '/гость' : '/guest'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Riding Experience & Guests */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <label className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold block mb-3">
                  2. {lang === 'ru' ? 'Опыт верховой езды' : 'Riding Experience'}
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'beginner', labelRu: 'Начинающий (шаг)', labelEn: 'Beginner (Walk)' },
                    { id: 'intermediate', labelRu: 'Уверенный (шаг, рысь)', labelEn: 'Intermediate (Trot)' },
                    { id: 'expert', labelRu: 'Опытный всадник (галоп)', labelEn: 'Advanced (Canter)' },
                  ].map((level) => (
                    <button
                      key={level.id}
                      type="button"
                      onClick={() => setRidingLevel(level.id as any)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-sm text-xs transition-colors cursor-pointer border ${
                        ridingLevel === level.id
                          ? 'border-[#C9A86A] bg-[#1C2227] text-[#FDFBF7] font-medium'
                          : 'border-white/10 bg-[#161B1F] text-[#A69E90] hover:text-white'
                      }`}
                    >
                      {lang === 'ru' ? level.labelRu : level.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold block mb-3">
                  3. {lang === 'ru' ? 'Количество всадников' : 'Number of Guests'}
                </label>
                <div className="flex items-center gap-3 bg-[#161B1F] border border-white/10 p-2 rounded-sm mb-4">
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                    className="w-10 h-10 flex items-center justify-center bg-[#20262B] text-white hover:bg-[#2C343B] rounded-sm text-base font-bold transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <div className="flex-1 text-center">
                    <span className="font-serif-display text-2xl font-bold text-[#FDFBF7] tabular-nums">
                      {guestsCount}
                    </span>
                    <span className="text-xs text-[#9E9688] ml-1.5">
                      {lang === 'ru' ? 'чел.' : 'guests'}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setGuestsCount(Math.min(8, guestsCount + 1))}
                    className="w-10 h-10 flex items-center justify-center bg-[#20262B] text-white hover:bg-[#2C343B] rounded-sm text-base font-bold transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Season Month */}
                <label className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold block mb-2">
                  4. {lang === 'ru' ? 'Месяц экспедиции (2026)' : 'Month in 2026'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'june', labelRu: 'Июнь (Цветение)', labelEn: 'June (Flora)' },
                    { id: 'july', labelRu: 'Июль (Тепло)', labelEn: 'July (Warmest)' },
                    { id: 'august', labelRu: 'Август (Звезды)', labelEn: 'August (Milky Way)' },
                    { id: 'september', labelRu: 'Сентябрь (Золото)', labelEn: 'Sept (Golden)' },
                  ].map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedMonth(m.id as any)}
                      className={`px-2.5 py-2 rounded-sm text-xs transition-colors cursor-pointer border text-center ${
                        selectedMonth === m.id
                          ? 'border-[#C9A86A] bg-[#1C2227] text-[#FDFBF7] font-medium'
                          : 'border-white/10 bg-[#161B1F] text-[#A69E90] hover:text-white'
                      }`}
                    >
                      {lang === 'ru' ? m.labelRu : m.labelEn}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Step 3: Bespoke Add-ons */}
            <div className="pt-6 border-t border-white/10">
              <div className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-3">
                5. {lang === 'ru' ? 'Дополнительные премиум-услуги' : 'Bespoke Expedition Upgrades'}
              </div>

              <div className="space-y-3">
                {[
                  {
                    key: 'privateYurt',
                    nameRu: 'Индивидуальная VIP-юрта на двоих (без подселения)',
                    nameEn: 'Private 2-Person Luxury Yurt (No sharing)',
                    priceUsd: 350 * guestsCount,
                    descRu: 'Персональная юрта с дровяным камином и террасой с видом на озеро',
                    descEn: 'Exclusive yurt with personal fireplace and sunrise lake view',
                  },
                  {
                    key: 'saunaExperience',
                    nameRu: 'Походная баня-сауна на дровах на берегу Сон-Куля',
                    nameEn: 'Wood-fired Lakeside Nomad Sauna on Song-Kul',
                    priceUsd: 180,
                    descRu: 'Парение с горными вениками и купание в чистейшей озерной воде',
                    descEn: 'Steam therapy with alpine herb brooms & refreshing dip',
                  },
                  {
                    key: 'dronePhotographer',
                    nameRu: 'Личный фотограф и оператор с 4K-дроном',
                    nameEn: 'Dedicated Drone & Stills 4K Cinematographer',
                    priceUsd: 600,
                    descRu: 'Профессиональный кинематографический мини-фильм вашей экспедиции',
                    descEn: 'Edited 3-minute 4K documentary film + 100 high-res photos',
                  },
                  {
                    key: 'eagleHuntingDemo',
                    nameRu: 'Демонстрация охоты с беркутом (Сальбуурун)',
                    nameEn: 'Golden Eagle Hunting Demo (Salbuurun)',
                    priceUsd: 250,
                    descRu: 'Встреча с потомственным беркутчи и мастер-класс номадских лучников',
                    descEn: 'Encounter with master eagle falconer & archery showcase',
                  },
                  {
                    key: 'helicopterTransfer',
                    nameRu: 'Вертолетный трансфер (Airbus H125) Бишкек ⇄ Сон-Куль',
                    nameEn: 'Helicopter Transfer (Airbus H125) Bishkek ⇄ Song-Kul',
                    priceUsd: 1200,
                    descRu: '45 минут панорамного полета над Тянь-Шанем вместо автодороги',
                    descEn: '45-minute scenic flight directly into the camp helipad',
                  },
                ].map((addon) => {
                  const isChecked = addons[addon.key as keyof typeof addons];
                  return (
                    <label
                      key={addon.key}
                      className={`flex items-start gap-3.5 p-3.5 rounded-sm border transition-colors cursor-pointer ${
                        isChecked
                          ? 'border-[#C9A86A]/50 bg-[#1A1F24]'
                          : 'border-white/10 bg-[#161B1F] hover:border-white/20'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) =>
                          setAddons({ ...addons, [addon.key]: e.target.checked })
                        }
                        className="mt-1 w-4 h-4 accent-[#C9A86A] rounded-sm cursor-pointer"
                      />
                      <div className="flex-grow">
                        <div className="flex items-center justify-between text-xs sm:text-sm font-medium text-[#FDFBF7]">
                          <span>{lang === 'ru' ? addon.nameRu : addon.nameEn}</span>
                          <span className="font-serif-display font-bold text-[#C9A86A] tabular-nums shrink-0 ml-2">
                            +${addon.priceUsd}
                          </span>
                        </div>
                        <div className="text-[11px] text-[#8E8678] mt-0.5">
                          {lang === 'ru' ? addon.descRu : addon.descEn}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Summary & Booking Form (5 cols) */}
          <div className="lg:col-span-5 bg-[#121518] border border-white/10 p-6 sm:p-8 rounded-sm sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <h3 className="font-serif-display text-xl font-bold text-[#FDFBF7]">
                {lang === 'ru' ? 'Итог экспедиции' : 'Expedition Summary'}
              </h3>
              {/* Currency switcher */}
              <div className="flex items-center bg-[#181D21] border border-white/10 rounded-sm p-0.5 text-xs">
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 rounded-sm font-semibold transition-colors ${
                    currency === 'USD'
                      ? 'bg-[#C9A86A] text-[#0C0E10]'
                      : 'text-[#8E8678] hover:text-white'
                  }`}
                >
                  USD
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('RUB')}
                  className={`px-2.5 py-1 rounded-sm font-semibold transition-colors ${
                    currency === 'RUB'
                      ? 'bg-[#C9A86A] text-[#0C0E10]'
                      : 'text-[#8E8678] hover:text-white'
                  }`}
                >
                  RUB
                </button>
              </div>
            </div>

            {/* Line items */}
            <div className="space-y-3 text-xs sm:text-sm text-[#C4BCAD] mb-6">
              <div className="flex items-center justify-between">
                <span>
                  {selectedTour.title} ({guestsCount}{' '}
                  {lang === 'ru' ? 'всадн.' : 'riders'})
                </span>
                <span className="font-medium text-[#FDFBF7] tabular-nums">
                  ${(baseRateUsd * guestsCount).toLocaleString()}
                </span>
              </div>

              {addons.privateYurt && (
                <div className="flex items-center justify-between text-xs text-[#9E9688]">
                  <span>{lang === 'ru' ? 'Приватная VIP-юрта' : 'Private Yurt'}</span>
                  <span className="tabular-nums">+${addons.privateYurt ? addonPricesUsd.privateYurt : 0}</span>
                </div>
              )}

              {addons.saunaExperience && (
                <div className="flex items-center justify-between text-xs text-[#9E9688]">
                  <span>{lang === 'ru' ? 'Походная сауна на озере' : 'Lakeside Sauna'}</span>
                  <span className="tabular-nums">+${addonPricesUsd.saunaExperience}</span>
                </div>
              )}

              {addons.dronePhotographer && (
                <div className="flex items-center justify-between text-xs text-[#9E9688]">
                  <span>{lang === 'ru' ? 'Оператор с дроном 4K' : 'Drone Video 4K'}</span>
                  <span className="tabular-nums">+${addonPricesUsd.dronePhotographer}</span>
                </div>
              )}

              {addons.eagleHuntingDemo && (
                <div className="flex items-center justify-between text-xs text-[#9E9688]">
                  <span>{lang === 'ru' ? 'Охота с беркутом Сальбуурун' : 'Eagle Demo'}</span>
                  <span className="tabular-nums">+${addonPricesUsd.eagleHuntingDemo}</span>
                </div>
              )}

              {addons.helicopterTransfer && (
                <div className="flex items-center justify-between text-xs text-[#9E9688]">
                  <span>{lang === 'ru' ? 'Вертолет Airbus H125' : 'Helicopter Transfer'}</span>
                  <span className="tabular-nums">+${addonPricesUsd.helicopterTransfer}</span>
                </div>
              )}
            </div>

            {/* Total calculation */}
            <div className="p-4 bg-[#181D21] border border-white/5 rounded-sm mb-6">
              <div className="text-[11px] uppercase tracking-wider text-[#8E8678]">
                {lang === 'ru' ? 'Расчетная стоимость группы' : 'Estimated Group Total'}
              </div>
              <div className="font-serif-display text-3xl font-bold text-[#FDFBF7] tabular-nums mt-1">
                {currency === 'USD'
                  ? `$${totalUsd.toLocaleString()}`
                  : `${totalRub.toLocaleString()} ₽`}
              </div>
              <div className="text-[11px] text-[#A69E90] mt-1">
                {lang === 'ru'
                  ? `Включает всех участников (${guestsCount} чел.), коней, питание и трансфер`
                  : `Includes all ${guestsCount} riders, horses, VIP yurt accommodation & chef meals`}
              </div>
            </div>

            {/* Direct Booking Form */}
            {!isSuccess ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold">
                  {lang === 'ru' ? 'Оформить предварительную бронь' : 'Reserve Expedition Dates'}
                </div>

                <div>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder={lang === 'ru' ? 'Ваше имя и фамилия' : 'Full Name'}
                    className="w-full px-4 py-2.5 bg-[#161B1F] border border-white/10 rounded-sm text-sm text-[#FDFBF7] placeholder-[#766F62] focus:outline-none focus:border-[#C9A86A] transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder={lang === 'ru' ? 'Телефон / WhatsApp (+7 / +996 / +1...)' : 'WhatsApp / Phone Number'}
                    className="w-full px-4 py-2.5 bg-[#161B1F] border border-white/10 rounded-sm text-sm text-[#FDFBF7] placeholder-[#766F62] focus:outline-none focus:border-[#C9A86A] transition-colors"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder={lang === 'ru' ? 'Электронная почта (для договора)' : 'Email address'}
                    className="w-full px-4 py-2.5 bg-[#161B1F] border border-white/10 rounded-sm text-sm text-[#FDFBF7] placeholder-[#766F62] focus:outline-none focus:border-[#C9A86A] transition-colors"
                  />
                </div>

                <div>
                  <textarea
                    rows={2}
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    placeholder={lang === 'ru' ? 'Пожелания (рост, особые предпочтения в седле)' : 'Special requests or preferences'}
                    className="w-full px-4 py-2.5 bg-[#161B1F] border border-white/10 rounded-sm text-sm text-[#FDFBF7] placeholder-[#766F62] focus:outline-none focus:border-[#C9A86A] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-[#C9A86A] hover:bg-[#D8B97D] text-[#0C0E10] text-xs uppercase font-semibold tracking-wider rounded-sm transition-all shadow-[0_2px_15px_rgba(201,168,106,0.25)] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting
                      ? (lang === 'ru' ? 'Формирование брони...' : 'Processing...')
                      : (lang === 'ru' ? 'Забронировать тур' : 'Confirm Reservation')}
                  </span>
                </button>

                <p className="text-[11px] text-[#766F62] text-center leading-normal">
                  {lang === 'ru'
                    ? 'Оплата не списывается сейчас. Менеджер экспедиции свяжется с вами в течение 2 часов в WhatsApp.'
                    : 'No payment is taken now. Our expedition director will contact you via WhatsApp to finalize dates.'}
                </p>
              </form>
            ) : (
              <div className="p-6 bg-[#18231C] border border-[#2D5A3C] rounded-sm text-center animate-in fade-in duration-300">
                <CheckCircle2 className="w-10 h-10 text-[#4ADE80] mx-auto mb-3" />
                <h4 className="font-serif-display text-xl font-bold text-[#FDFBF7] mb-2">
                  {lang === 'ru' ? 'Заявка успешно принята!' : 'Expedition Reserved!'}
                </h4>
                <p className="text-xs text-[#A7C2AF] leading-relaxed mb-4">
                  {lang === 'ru'
                    ? `Спасибо, ${clientName}! Мы зафиксировали предварительную бронь на тур «${selectedTour.title}» (${guestsCount} гостей). Старший гид свяжется с вами по номеру ${clientPhone}.`
                    : `Thank you, ${clientName}! We have received your request for "${selectedTour.title}". Our expedition lead will connect with you via ${clientPhone}.`}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSuccess(false)}
                  className="text-xs text-[#C9A86A] underline hover:text-white cursor-pointer"
                >
                  {lang === 'ru' ? 'Рассчитать другой вариант' : 'Configure another tour'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
