import React, { useState } from 'react';
import { CheckSquare, Square, Download, ShieldCheck, Sun, Layers, Compass } from 'lucide-react';

interface ChecklistItem {
  id: string;
  name: string;
  provided: boolean;
  category: string;
  tip: string;
}

interface PreparationChecklistProps {
  lang: 'ru' | 'en';
}

export const PreparationChecklist: React.FC<PreparationChecklistProps> = ({ lang }) => {
  const initialItems: ChecklistItem[] = [
    {
      id: 'helmet',
      name: lang === 'ru' ? 'Защитный шлем для верховой езды' : 'Equestrian Safety Helmet',
      provided: true,
      category: 'riding',
      tip: lang === 'ru' ? 'Предоставляем сертифицированные шлемы всех размеров' : 'Provided by us (all sizes)',
    },
    {
      id: 'chaps',
      name: lang === 'ru' ? 'Краги (кожаные накладки на голень)' : 'Leather Riding Chaps',
      provided: true,
      category: 'riding',
      tip: lang === 'ru' ? 'Предоставляем для защиты голени от трения стремян' : 'Provided to protect legs against stirrup friction',
    },
    {
      id: 'boots',
      name: lang === 'ru' ? 'Обувь с гладкой подошвой и небольшим каблуком 1.5–2 см' : 'Riding/Trekking Boots with Low Heel',
      provided: false,
      category: 'riding',
      tip: lang === 'ru' ? 'Чтобы нога безопасно лежала в стремени и не проскальзывала' : 'Essential so foot sits securely in stirrup',
    },
    {
      id: 'pants',
      name: lang === 'ru' ? 'Эластичные брюки / бриджи без жестких внутренних швов' : 'Comfortable Riding Breeches / Seamless Pants',
      provided: false,
      category: 'riding',
      tip: lang === 'ru' ? 'Обычные джинсы могут натереть при 4–5 часах в седле' : 'Prevents chafing during 4-5 hours in the saddle',
    },
    {
      id: 'thermal',
      name: lang === 'ru' ? 'Комплект термобелья (меринос или синтетика)' : 'Merino Wool Thermal Base Layer',
      provided: false,
      category: 'clothing',
      tip: lang === 'ru' ? 'На высоте 3016 м температура ночью может опускаться до +2°C' : 'Vital for crisp alpine nights at 3,016m',
    },
    {
      id: 'membrane',
      name: lang === 'ru' ? 'Ветро- и влагозащитная мембранная куртка (Gore-Tex)' : 'Windproof & Waterproof Membrane Jacket',
      provided: false,
      category: 'clothing',
      tip: lang === 'ru' ? 'Защита от внезапного горного ветра на перевалах' : 'Shields against swift mountain wind on passes',
    },
    {
      id: 'sunscreen',
      name: lang === 'ru' ? 'Солнцезащитный крем SPF 50+ и бальзам для губ' : 'SPF 50+ Sunscreen & UV Lip Balm',
      provided: false,
      category: 'personal',
      tip: lang === 'ru' ? 'Ультрафиолет на 3000 м чрезвычайно активен' : 'Intense alpine solar radiation at high altitude',
    },
    {
      id: 'sunglasses',
      name: lang === 'ru' ? 'Солнцезащитные поляризационные очки UV400' : 'Polarized Sunglasses UV400',
      provided: false,
      category: 'personal',
      tip: lang === 'ru' ? 'Обязательно со шнурком для фиксации во время рыси' : 'Must have retaining cord for riding',
    },
    {
      id: 'powerbank',
      name: lang === 'ru' ? 'Внешний аккумулятор (Powerbank 20 000 mAh)' : 'Power Bank (20,000 mAh)',
      provided: false,
      category: 'gadgets',
      tip: lang === 'ru' ? 'В лагере есть солнечная зарядка, но в седле пригодится' : 'Handy for capturing photos along remote trails',
    },
  ];

  const [checkedIds, setCheckedIds] = useState<string[]>(['helmet', 'chaps']);

  const toggleCheck = (id: string) => {
    if (checkedIds.includes(id)) {
      setCheckedIds(checkedIds.filter((i) => i !== id));
    } else {
      setCheckedIds([...checkedIds, id]);
    }
  };

  return (
    <section id="gear" className="py-24 sm:py-32 bg-[#0C0E10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
            <span>{lang === 'ru' ? 'Подготовка & Экипировка' : 'Preparation & Gear'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
            {lang === 'ru'
              ? 'Что взять с собой на высоту 3 016 метров'
              : 'What to Pack for 3,016m Alpine Trail'}
          </h2>
          <p className="text-base text-[#BFB7A8] mt-3 font-light">
            {lang === 'ru'
              ? 'Конный поход в высокогорье требует продуманного послойного гардероба. Все специализированное снаряжение для лошадей и лагеря мы предоставляем.'
              : 'Equestrian alpine treks require smart layering. All horse equipment, camp amenities, and helmets are fully provided by us.'}
          </p>
        </div>

        {/* Interactive Checklist Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {initialItems.map((item) => {
            const isChecked = checkedIds.includes(item.id);
            return (
              <div
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`p-5 rounded-sm border transition-all cursor-pointer flex flex-col justify-between ${
                  isChecked
                    ? 'bg-[#151A1E] border-[#C9A86A]/40'
                    : 'bg-[#121518] border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {isChecked ? (
                        <CheckSquare className="w-4 h-4 text-[#C9A86A] shrink-0" />
                      ) : (
                        <Square className="w-4 h-4 text-[#6E675B] shrink-0" />
                      )}
                      <span className={`text-sm font-medium ${isChecked ? 'text-[#FDFBF7]' : 'text-[#D8D0C3]'}`}>
                        {item.name}
                      </span>
                    </div>

                    {item.provided && (
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm bg-[#C9A86A]/20 text-[#C9A86A] font-semibold shrink-0">
                        {lang === 'ru' ? 'Выдаем' : 'Included'}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#9E9688] pl-6 leading-relaxed">
                    {item.tip}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-10 p-6 bg-[#161B1F] border border-white/10 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-sm bg-[#C9A86A]/10 border border-[#C9A86A]/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-[#C9A86A]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#FDFBF7]">
                {lang === 'ru'
                  ? 'Персональный чек-лист высылается каждому участнику'
                  : 'Personalized packing PDF sent upon booking'}
              </div>
              <div className="text-xs text-[#9E9688] mt-0.5">
                {lang === 'ru'
                  ? 'С рекомендациями брендов обуви, термобелья и солнцезащиты'
                  : 'Includes recommended alpine brands and layering guidelines'}
              </div>
            </div>
          </div>

          <div className="text-xs text-[#C9A86A] font-medium">
            {checkedIds.length} / {initialItems.length} {lang === 'ru' ? 'собрано' : 'packed'}
          </div>
        </div>
      </div>
    </section>
  );
};
