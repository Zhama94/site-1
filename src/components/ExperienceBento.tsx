import React from 'react';
import { Sparkles, Bed, ShieldCheck, UtensilsCrossed, Radio, Flame, Award, HeartHandshake } from 'lucide-react';

interface ExperienceBentoProps {
  lang: 'ru' | 'en';
}

export const ExperienceBento: React.FC<ExperienceBentoProps> = ({ lang }) => {
  return (
    <section id="experience" className="py-24 sm:py-32 bg-[#090B0D] relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl mb-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
            <span className="w-6 h-[1px] bg-[#C9A86A]" />
            <span>{lang === 'ru' ? 'Стандарт экспедиций' : 'Expedition Standard'}</span>
          </div>
          <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
            {lang === 'ru'
              ? 'Дикая природа без компромиссов в комфорте'
              : 'Untamed Wilderness with Five-Star Comfort'}
          </h2>
          <p className="text-base text-[#BFB7A8] mt-4 font-light leading-relaxed">
            {lang === 'ru'
              ? 'Мы разрушаем стереотип о спартанском конном туризме. В наших экспедициях дикая первозданная мощь Тянь-Шаня сочетается с теплом отапливаемых юрт, бельем египетского хлопка и ресторанной кухней на высоте 3016 метров.'
              : 'We redefine high-mountain equestrian travel. Pristine alpine passes meet heated felt yurts, crisp luxury linens, artisanal cuisine, and round-the-clock expedition care.'}
          </p>
        </div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          {/* Bento Card 1: Luxury Yurt Glamping under Milky Way (Large 8 cols) */}
          <div className="md:col-span-12 lg:col-span-8 bg-[#121518] border border-white/10 rounded-sm overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src="/src/assets/images/luxury_yurt_camp_1791469957136.jpg"
                alt="Юртовый лагерь на Сон-Куле под Млечным Путем"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121518] via-transparent to-black/30" />
            </div>

            <div className="p-7 sm:p-9">
              <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-2">
                <span>01. {lang === 'ru' ? 'Аутентичный VIP-Глэмпинг' : 'Nomadic Yurt Glamping'}</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FDFBF7] mb-3">
                {lang === 'ru'
                  ? 'Теплые войлочные юрты с каминами на арче'
                  : 'Handcrafted Wool Yurts with Juniper Fireplaces'}
              </h3>
              <p className="text-sm text-[#BFB7A8] leading-relaxed mb-6 font-light">
                {lang === 'ru'
                  ? 'Стены из натурального овечьего войлока хранят живое тепло. Внутри — деревянные кровати с ортопедическими матрасами, пуховые одеяла, авторские шырдаки ручной работы, индивидуальные дровяные печи и горячий душ на джайлоо.'
                  : 'Felt walls insulated with pure sheep wool. Inside: cedar beds with orthopedic mattresses, down duvets, bespoke shyrdak carpets, wood stoves, and hot alpine showers.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-[#D8D0C3]">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#C9A86A]" />
                  <span>{lang === 'ru' ? 'Отопление 24/7' : '24/7 Juniper Fire'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="w-4 h-4 text-[#C9A86A]" />
                  <span>{lang === 'ru' ? 'Ортопедические кровати' : 'Orthopedic Beds'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#C9A86A]" />
                  <span>{lang === 'ru' ? 'Походная сауна на дровах' : 'Wood-Fired Sauna'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Horses & Tack (4 cols) */}
          <div className="md:col-span-12 lg:col-span-4 bg-[#121518] border border-white/10 rounded-sm overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src="/src/assets/images/mountain_pass_ride_1791469975063.jpg"
                alt="Кыргызские кони на горном перевале"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121518] via-transparent to-black/30" />
            </div>

            <div className="p-7">
              <div className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-2">
                <span>02. {lang === 'ru' ? 'Кыргызские Скакуны' : 'Tian Shan Steeds'}</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#FDFBF7] mb-3">
                {lang === 'ru' ? 'Истинные хозяева перевалов' : 'Masters of the High Passes'}
              </h3>
              <p className="text-sm text-[#BFB7A8] leading-relaxed mb-6 font-light">
                {lang === 'ru'
                  ? 'Кони аборигенной кыргызской породы с железными копытами и невозмутимым нравом. Седла с гелевыми вставками исключают усталость спины всадника.'
                  : 'Aboriginal Kyrgyz mountain horses bred for sure-footed terrain and calm temperament. Outfitted with ergonomic saddles and gel cushions for effortless riding.'}
              </p>

              <div className="pt-4 border-t border-white/10 text-xs text-[#D8D0C3] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8678]">{lang === 'ru' ? 'Порода:' : 'Breed:'}</span>
                  <span className="font-medium">{lang === 'ru' ? 'Аборигенная кыргызская' : 'Kyrgyz Mountain'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#8E8678]">{lang === 'ru' ? 'Амуниция:' : 'Tack:'}</span>
                  <span className="font-medium">{lang === 'ru' ? 'Евро/Номад с гелем' : 'Custom Ergonomic Gel'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bento Card 3: Gourmet Nomadic Gastronomy (4 cols) */}
          <div className="md:col-span-12 lg:col-span-5 bg-[#121518] border border-white/10 rounded-sm overflow-hidden group flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src="/src/assets/images/nomadic_hospitality_tea_1791469991500.jpg"
                alt="Чайная церемония и кочевая гастрономия"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121518] via-transparent to-black/30" />
            </div>

            <div className="p-7">
              <div className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-2">
                <span>03. {lang === 'ru' ? 'Гастрономический Опыт' : 'High Cuisine'}</span>
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#FDFBF7] mb-3">
                {lang === 'ru' ? 'Трапеза кочевников от шеф-повара' : 'Nomadic Feasts by Camp Chefs'}
              </h3>
              <p className="text-sm text-[#BFB7A8] leading-relaxed mb-6 font-light">
                {lang === 'ru'
                  ? 'Свежайший ягненок на углях, горячие боорсоки, горный мед с чабрецом, парной саамал (кобылье молоко) и ароматный чай из самовара на еловых шишках.'
                  : 'Slow-cooked lamb over open fire, hot golden boorsok pastries, mountain honey with wild thyme, sweet saamal mare\'s milk, and samovar herbal tea infusions.'}
              </p>

              <div className="pt-4 border-t border-white/10 flex items-center gap-3 text-xs text-[#C9A86A]">
                <UtensilsCrossed className="w-4 h-4 shrink-0" />
                <span className="text-[#D8D0C3]">
                  {lang === 'ru' ? 'Индивидуальное меню (веган / без лактозы / халяль)' : 'Custom dietary menus available'}
                </span>
              </div>
            </div>
          </div>

          {/* Bento Card 4: Safety, Starlink & Wilderness Medicine (7 cols) */}
          <div className="md:col-span-12 lg:col-span-7 bg-[#121518] border border-white/10 rounded-sm p-7 sm:p-9 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#C9A86A] font-semibold mb-2">
                <span>04. {lang === 'ru' ? 'Безопасность 360°' : '360° Mountain Safety'}</span>
              </div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#FDFBF7] mb-4">
                {lang === 'ru'
                  ? 'Спутниковая связь, кислород и сертифицированные гиды'
                  : 'Starlink, Garmin InReach & Wilderness First Responders'}
              </h3>
              <p className="text-sm text-[#BFB7A8] leading-relaxed mb-6 font-light">
                {lang === 'ru'
                  ? 'Высокогорье требует профессионализма. Каждая группа оснащена спутниковыми трекерами Garmin InReach, в базовом лагере доступен спутниковый интернет Starlink для связи с родными. У гидов с собой высотная фармакология, кислородные баллоны и прямая линия с вертолетной службой экстренной эвакуации.'
                  : 'Altitude requires precision. Groups are equipped with Garmin InReach dual-satellite communicators and Starlink in base camp. Certified mountain guides carry medical oxygen concentrators and maintain direct air ambulance evacuation coordination.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div className="p-4 bg-[#181D21] border border-white/5 rounded-sm">
                <Radio className="w-5 h-5 text-[#C9A86A] mb-2" />
                <div className="text-xs font-semibold text-[#FDFBF7]">Starlink & InReach</div>
                <div className="text-[11px] text-[#8E8678] mt-1">
                  {lang === 'ru' ? 'Связь в любой точке плато' : 'Global satellite coverage'}
                </div>
              </div>

              <div className="p-4 bg-[#181D21] border border-white/5 rounded-sm">
                <ShieldCheck className="w-5 h-5 text-[#C9A86A] mb-2" />
                <div className="text-xs font-semibold text-[#FDFBF7]">
                  {lang === 'ru' ? 'Высотная медицина' : 'Altitude Medkit'}
                </div>
                <div className="text-[11px] text-[#8E8678] mt-1">
                  {lang === 'ru' ? 'Кислород и пульсоксиметры' : 'Oxygen & vital checks'}
                </div>
              </div>

              <div className="p-4 bg-[#181D21] border border-white/5 rounded-sm">
                <Award className="w-5 h-5 text-[#C9A86A] mb-2" />
                <div className="text-xs font-semibold text-[#FDFBF7]">
                  {lang === 'ru' ? '15+ лет стажа' : 'Master Guides'}
                </div>
                <div className="text-[11px] text-[#8E8678] mt-1">
                  {lang === 'ru' ? 'Мастера конного спорта КР' : 'Certified trail leaders'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
