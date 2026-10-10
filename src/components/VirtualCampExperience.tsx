import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  Info,
  Flame,
  Moon,
  Sun,
  X,
  Volume2,
  VolumeX,
  Sparkles,
} from 'lucide-react';

interface Hotspot {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  xPercent: number; // 0 to 100 relative to panoramic canvas
  yPercent: number;
  icon: string;
}

interface VirtualCampExperienceProps {
  lang: 'ru' | 'en';
  onBookYurt?: () => void;
}

export const VirtualCampExperience: React.FC<VirtualCampExperienceProps> = ({
  lang,
  onBookYurt,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [panX, setPanX] = useState<number>(0); // pan offset in % or px
  const [zoom, setZoom] = useState<number>(1);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const [lightingMode, setLightingMode] = useState<'evening' | 'night' | 'morning'>('evening');
  const [soundPlaying, setSoundPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Audio synthesis for cozy fireplace crackle
  const audioCtxRef = useRef<AudioContext | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);

  const hotspots: Hotspot[] = [
    {
      id: 'tunduk',
      title: lang === 'ru' ? 'Түндүк (Купол в небо)' : 'Tündük (Sky Dome Wheel)',
      subtitle: lang === 'ru' ? 'Священное окно к звездам' : 'Celestial roof ring',
      description: lang === 'ru'
        ? 'Вершина юрты и древний символ очага. Ночью через него виден Млечный Путь и падающие звезды на высоте 3016 метров. Днем обеспечивает мягкий естественный свет.'
        : 'The sacred crown of the yurt and national symbol. At night, it frames the Milky Way and shooting stars at 3,016m altitude with zero light pollution.',
      xPercent: 49.5,
      yPercent: 12,
      icon: 'sparkles',
    },
    {
      id: 'fireplace',
      title: lang === 'ru' ? 'Печь-камин на арче' : 'Cast-Iron Juniper Fireplace',
      subtitle: lang === 'ru' ? 'Живое тепло до утра' : 'Continuous mountain heating',
      description: lang === 'ru'
        ? 'Чугунная печь в самом сердце юрты. Топится сухой тянь-шаньской арчой и березовыми дровами. Поддерживает уютные +22°C в юрте даже при заморозках снаружи.'
        : 'Centerpiece cast-iron wood stove fueled by mountain juniper. Maintains a steady +22°C inside while alpine frosts dip to 0°C outdoors.',
      xPercent: 50,
      yPercent: 68,
      icon: 'flame',
    },
    {
      id: 'bed',
      title: lang === 'ru' ? 'Кровать из массива кедра' : 'Cedar Orthopedic Bed',
      subtitle: lang === 'ru' ? 'Премиум-сон кочевника' : 'High-altitude luxury sleep',
      description: lang === 'ru'
        ? 'Ортопедический матрас, натуральное постельное белье из египетского хлопка и пуховые одеяла из верблюжьей шерсти для идеального отдыха после 5 часов верховой езды.'
        : 'Hand-carved cedar timber bed with orthopedic mattress, crisp Egyptian cotton linens, and double camel-wool duvets after a full day in the saddle.',
      xPercent: 18,
      yPercent: 64,
      icon: 'bed',
    },
    {
      id: 'shyrdak',
      title: lang === 'ru' ? 'Шырдак и Туш-Кийиз' : 'Handmade Shyrdak Felt Carpets',
      subtitle: lang === 'ru' ? 'Шедевр нематериального наследия ЮНЕСКО' : 'UNESCO Intangible Heritage',
      description: lang === 'ru'
        ? 'Оригинальные ковры из прессованного войлока ручной работы мастериц из Нарына и Кочкора. Геометрические узоры «кочкор мюйюз» защищают от холода земли и дарят гармонию.'
        : 'Artisanal felt mosaics crafted by master Kyrgyz weavers. Ancient ram-horn motifs insulate against cold ground and bless the dwelling with peace.',
      xPercent: 48,
      yPercent: 88,
      icon: 'carpet',
    },
    {
      id: 'dastorkon',
      title: lang === 'ru' ? 'Дасторкон и чайный уголок' : 'Dastorkon & Tea Corner',
      subtitle: lang === 'ru' ? 'Обряд гостеприимства' : 'Ceremonial welcome tea',
      description: lang === 'ru'
        ? 'Низкий резной круглый столик с фарфоровыми пиалами, свежим кобыльим молоком (саамал), горным медом и горячими боорсоками прямо из казана.'
        : 'Carved table with porcelain pialas, fresh mare\'s milk (saamal), wild thyme honey, and warm boorsok bread delivered straight from the camp tandoor.',
      xPercent: 68,
      yPercent: 68,
      icon: 'tea',
    },
    {
      id: 'door',
      title: lang === 'ru' ? 'Дверь с выходом к Сон-Кулю' : 'Lake Vista Doorway',
      subtitle: lang === 'ru' ? 'Утро на берегу озера' : 'Sunrise over turquoise waters',
      description: lang === 'ru'
        ? 'Распахнув деревянные створки, вы сразу ступаете на альпийский берег Сон-Куля. Утренний туман над бирюзовой водой и пасущийся на рассвете табун лошадей.'
        : 'Step directly from your yurt onto the pristine alpine shoreline. Morning mist rising over turquoise water with wild horse herds grazing on the meadow.',
      xPercent: 92,
      yPercent: 54,
      icon: 'door',
    },
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (!autoRotate || isDragging) return;
    const interval = setInterval(() => {
      setPanX((prev) => {
        const next = prev + 0.15;
        return next >= 100 ? 0 : next;
      });
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate, isDragging]);

  // Touch and Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setAutoRotate(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    const deltaX = e.clientX - startX;
    setStartX(e.clientX);
    // Convert deltaX to percentage
    const width = containerRef.current.clientWidth;
    const deltaPercent = (deltaX / width) * 45;
    setPanX((prev) => {
      let next = prev - deltaPercent;
      if (next < 0) next += 100;
      if (next > 100) next -= 100;
      return next;
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      setStartX(e.touches[0].clientX);
      setAutoRotate(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - startX;
    setStartX(e.touches[0].clientX);
    const width = containerRef.current.clientWidth;
    const deltaPercent = (deltaX / width) * 45;
    setPanX((prev) => {
      let next = prev - deltaPercent;
      if (next < 0) next += 100;
      if (next > 100) next -= 100;
      return next;
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Step nudges
  const nudgeLeft = () => {
    setAutoRotate(false);
    setPanX((prev) => (prev - 12 < 0 ? prev - 12 + 100 : prev - 12));
  };

  const nudgeRight = () => {
    setAutoRotate(false);
    setPanX((prev) => (prev + 12 > 100 ? prev + 12 - 100 : prev + 12));
  };

  const resetView = () => {
    setPanX(0);
    setZoom(1);
    setAutoRotate(true);
  };

  // Ambient sound synthesizer (white/pink noise generator for fireplace warmth)
  const toggleSound = () => {
    if (soundPlaying) {
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
        audioCtxRef.current = null;
      }
      setSoundPlaying(false);
    } else {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        // Generate gentle crackling buffer
        const bufferSize = ctx.sampleRate * 2;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          // Pink noise filter
          data[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = data[i];
          // Occasional gentle crackle impulse
          if (Math.random() < 0.001) {
            data[i] += (Math.random() - 0.5) * 0.8;
          }
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.loop = true;

        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 550;

        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.12;

        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        noise.start();
        noiseNodeRef.current = noise;
        setSoundPlaying(true);
      } catch (err) {
        console.warn('AudioContext failed:', err);
      }
    }
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
      setIsFullscreen(false);
    }
  };

  // Lighting styles filter
  const getLightingFilter = () => {
    switch (lightingMode) {
      case 'night':
        return 'brightness(0.85) contrast(1.15) hue-rotate(-10deg) saturate(1.1)';
      case 'morning':
        return 'brightness(1.08) contrast(1.02) saturate(1.12) sepia(0.08)';
      case 'evening':
      default:
        return 'brightness(1.0) contrast(1.08) saturate(1.15)';
    }
  };

  return (
    <section id="virtual-tour" className="py-24 sm:py-32 bg-[#0C0E10] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-[#C9A86A] font-semibold mb-3">
              <span className="w-6 h-[1px] bg-[#C9A86A]" />
              <span>
                {lang === 'ru' ? 'Virtual Camp Experience · 360°' : 'Virtual Camp Experience · 360°'}
              </span>
            </div>
            <h2 className="font-serif-display text-3xl sm:text-5xl font-bold text-[#FDFBF7] tracking-tight [text-wrap:balance]">
              {lang === 'ru'
                ? 'Интерактивный 360° тур внутри VIP-юрты «Тай»'
                : 'Interactive 360° Virtual Tour Inside TAY Luxury Yurt'}
            </h2>
            <p className="text-sm sm:text-base text-[#BFB7A8] mt-3 font-light max-w-2xl leading-relaxed">
              {lang === 'ru'
                ? 'Загляните внутрь традиционного войлочного шатра на высоте 3016 метров. Поворачивайте обзор мышью или свайпом, исследуйте дровяной камин, деревянный свод тюндюк и ковры ручной работы.'
                : 'Step inside our authentic felt yurt at 3,016m. Pan 360° with smooth transitions, explore the juniper fireplace, carved tündük dome, and bespoke shyrdak tapestries.'}
            </p>
          </div>

          {/* Quick atmosphere and sound buttons */}
          <div className="flex items-center gap-2.5">
            {/* Sound toggle */}
            <button
              onClick={toggleSound}
              className={`px-3.5 py-2 rounded-sm text-xs font-medium border transition-colors flex items-center gap-2 cursor-pointer ${
                soundPlaying
                  ? 'border-[#C9A86A] bg-[#C9A86A]/20 text-[#C9A86A]'
                  : 'border-white/10 bg-[#161B1F] text-[#9E9688] hover:text-white'
              }`}
              title={lang === 'ru' ? 'Звук костра в юрте' : 'Fireplace sound'}
            >
              {soundPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">
                {soundPlaying
                  ? (lang === 'ru' ? 'Треск камина вкл.' : 'Fireplace audio on')
                  : (lang === 'ru' ? 'Звук камина' : 'Fireplace audio')}
              </span>
            </button>

            {/* Atmosphere Mode */}
            <div className="flex items-center bg-[#161B1F] border border-white/10 rounded-sm p-0.5 text-xs">
              <button
                onClick={() => setLightingMode('morning')}
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  lightingMode === 'morning'
                    ? 'bg-[#C9A86A] text-[#0C0E10] font-semibold'
                    : 'text-[#9E9688] hover:text-white'
                }`}
                title="Утро"
              >
                <Sun className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{lang === 'ru' ? 'Рассвет' : 'Dawn'}</span>
              </button>
              <button
                onClick={() => setLightingMode('evening')}
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  lightingMode === 'evening'
                    ? 'bg-[#C9A86A] text-[#0C0E10] font-semibold'
                    : 'text-[#9E9688] hover:text-white'
                }`}
                title="Сумерки"
              >
                <Flame className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{lang === 'ru' ? 'Сумерки' : 'Dusk'}</span>
              </button>
              <button
                onClick={() => setLightingMode('night')}
                className={`px-2.5 py-1.5 rounded-sm transition-colors cursor-pointer flex items-center gap-1 ${
                  lightingMode === 'night'
                    ? 'bg-[#C9A86A] text-[#0C0E10] font-semibold'
                    : 'text-[#9E9688] hover:text-white'
                }`}
                title="Ночь"
              >
                <Moon className="w-3.5 h-3.5" />
                <span className="hidden md:inline">{lang === 'ru' ? 'Звезды' : 'Stars'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* 360 Panoramic Viewport Stage */}
        <div
          ref={containerRef}
          className="relative w-full h-[460px] sm:h-[560px] lg:h-[620px] rounded-sm overflow-hidden border border-white/15 bg-[#0A0C0E] shadow-2xl select-none cursor-grab active:cursor-grabbing group"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Panoramic Continuous Triple Image Canvas */}
          <div
            className="absolute top-0 bottom-0 flex h-full"
            style={{
              width: '300%',
              left: `${-panX * 1.5}%`,
              transform: `scale(${zoom})`,
              transformOrigin: '50% 50%',
              transition: isDragging ? 'none' : 'transform 0.4s ease-out, filter 0.8s ease',
              filter: getLightingFilter(),
            }}
          >
            {/* Triple repeat for seamless wrap-around 360 illusion */}
            {[0, 1, 2].map((idx) => (
              <div key={idx} className="relative w-1/3 h-full shrink-0 overflow-hidden">
                <img
                  src="/images/yurt_interior_panorama_1791472866796.jpg"
                  alt="Интерьер юрты 360"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />

                {/* Hotspot Pins overlaid on the active panoramic projection */}
                {hotspots.map((spot) => (
                  <button
                    key={`${idx}-${spot.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedHotspot(spot);
                    }}
                    style={{
                      left: `${spot.xPercent}%`,
                      top: `${spot.yPercent}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group/pin p-2 cursor-pointer focus:outline-none"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Pulsing beacon glow */}
                      <span className="absolute w-7 h-7 rounded-full bg-[#C9A86A]/40 animate-ping" />
                      <div className="w-5 h-5 rounded-full bg-[#C9A86A] text-[#0C0E10] border-2 border-white flex items-center justify-center shadow-lg group-hover/pin:scale-125 transition-transform">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#0C0E10]" />
                      </div>

                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/pin:flex flex-col items-center pointer-events-none whitespace-nowrap">
                        <div className="bg-[#121518]/95 backdrop-blur-md px-2.5 py-1 rounded-sm border border-white/20 text-[11px] font-semibold text-[#FDFBF7] shadow-xl">
                          {spot.title}
                        </div>
                        <div className="w-1.5 h-1.5 bg-[#121518] rotate-45 -mt-1 border-r border-b border-white/20" />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Vignette Overlay for cinematic curve effect */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,12,14,0.75)_100%)]" />

          {/* Top Bar HUD inside viewport */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-30">
            {/* 360 Indicator */}
            <div className="bg-[#0C0E10]/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm flex items-center gap-2 pointer-events-auto">
              <div className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="font-serif-display text-sm font-bold text-[#FDFBF7]">
                360° LIVE VIEW
              </span>
              <span className="text-[#8E8678]">·</span>
              <span className="text-xs text-[#C4BCAD]">
                {lang === 'ru' ? 'VIP-Юрта «Тай»' : 'TAY VIP Yurt'}
              </span>
            </div>

            {/* Instruction tooltip */}
            <div className="hidden sm:flex items-center gap-2 bg-[#0C0E10]/85 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-sm text-xs text-[#BFB7A8]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
              <span>
                {lang === 'ru'
                  ? 'Тяните мышью для вращения · Нажмите на точки для деталей'
                  : 'Drag to look around · Click glowing pins to inspect'}
              </span>
            </div>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-[#121518]/90 backdrop-blur-md border border-white/15 px-3 py-2 rounded-sm shadow-2xl">
            {/* Nudge Left */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nudgeLeft();
              }}
              className="p-1.5 text-[#C4BCAD] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
              title={lang === 'ru' ? 'Повернуть влево' : 'Turn Left'}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Auto-Rotate Play/Pause */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setAutoRotate(!autoRotate);
              }}
              className={`p-1.5 rounded-sm transition-colors cursor-pointer ${
                autoRotate
                  ? 'text-[#C9A86A] bg-[#C9A86A]/10 hover:bg-[#C9A86A]/20'
                  : 'text-[#C4BCAD] hover:text-white hover:bg-white/10'
              }`}
              title={autoRotate ? 'Остановить авто-вращение' : 'Включить авто-вращение'}
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            {/* Nudge Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nudgeRight();
              }}
              className="p-1.5 text-[#C4BCAD] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
              title={lang === 'ru' ? 'Повернуть вправо' : 'Turn Right'}
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <span className="w-[1px] h-4 bg-white/15 mx-1" />

            {/* Zoom In */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((prev) => Math.min(prev + 0.2, 1.6));
              }}
              disabled={zoom >= 1.6}
              className="p-1.5 text-[#C4BCAD] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer disabled:opacity-30"
              title="Приблизить"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            {/* Zoom Out */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setZoom((prev) => Math.max(prev - 0.2, 0.9));
              }}
              disabled={zoom <= 0.9}
              className="p-1.5 text-[#C4BCAD] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer disabled:opacity-30"
              title="Отдалить"
            >
              <ZoomOut className="w-4 h-4" />
            </button>

            {/* Reset */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetView();
              }}
              className="p-1.5 text-[#C4BCAD] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
              title="Сброс положения"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <span className="w-[1px] h-4 bg-white/15 mx-1" />

            {/* Fullscreen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFullscreen();
              }}
              className="p-1.5 text-[#C4BCAD] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
              title="На весь экран"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Interactive Hotspot Inspector Card Modal */}
          {selectedHotspot && (
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 w-[92%] sm:w-[440px] bg-[#121518]/95 backdrop-blur-xl border border-[#C9A86A]/40 rounded-sm shadow-2xl p-6 text-left animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-3 pb-3 border-b border-white/10 mb-3">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#C9A86A] font-semibold">
                    {selectedHotspot.subtitle}
                  </div>
                  <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#FDFBF7] mt-0.5">
                    {selectedHotspot.title}
                  </h4>
                </div>

                <button
                  onClick={() => setSelectedHotspot(null)}
                  className="p-1 text-[#8E8678] hover:text-white hover:bg-white/10 rounded-sm transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs sm:text-sm text-[#D4CDC1] leading-relaxed mb-6 font-light">
                {selectedHotspot.description}
              </p>

              <div className="flex items-center justify-between gap-3 pt-3 border-t border-white/10">
                <span className="text-[11px] text-[#8E8678]">
                  {lang === 'ru' ? 'Входит во все тарифы тура' : 'Included in all expedition tiers'}
                </span>
                <button
                  onClick={() => {
                    setSelectedHotspot(null);
                    if (onBookYurt) onBookYurt();
                  }}
                  className="px-4 py-2 bg-[#C9A86A] hover:bg-[#D8B97D] text-[#0C0E10] text-xs uppercase font-semibold tracking-wider rounded-sm transition-colors cursor-pointer"
                >
                  {lang === 'ru' ? 'Забронировать юрту' : 'Book this yurt'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Highlights Ribbon Below Virtual Tour */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[#121518] border border-white/5 rounded-sm">
            <div className="font-serif-display text-lg font-bold text-[#FDFBF7]">100% Войлок</div>
            <div className="text-xs text-[#8E8678] mt-1">
              {lang === 'ru' ? 'Натуральная овечья шерсть' : 'Pure Kyrgyz sheep wool'}
            </div>
          </div>

          <div className="p-4 bg-[#121518] border border-white/5 rounded-sm">
            <div className="font-serif-display text-lg font-bold text-[#FDFBF7]">+22°C Круглосуточно</div>
            <div className="text-xs text-[#8E8678] mt-1">
              {lang === 'ru' ? 'Отопление арчой и березой' : 'Wood-burning juniper fire'}
            </div>
          </div>

          <div className="p-4 bg-[#121518] border border-white/5 rounded-sm">
            <div className="font-serif-display text-lg font-bold text-[#FDFBF7]">3016 м Высота</div>
            <div className="text-xs text-[#8E8678] mt-1">
              {lang === 'ru' ? 'Вид на водную гладь озера' : 'Direct alpine lakeshore'}
            </div>
          </div>

          <div className="p-4 bg-[#121518] border border-white/5 rounded-sm">
            <div className="font-serif-display text-lg font-bold text-[#FDFBF7]">Горячий Душ & Сауна</div>
            <div className="text-xs text-[#8E8678] mt-1">
              {lang === 'ru' ? 'Полноценный эко-санузел' : 'Private hot shower & sauna'}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
