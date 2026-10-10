import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ToursSection } from './components/ToursSection';
import { TourDetailModal } from './components/TourDetailModal';
import { ExperienceBento } from './components/ExperienceBento';
import { VirtualCampExperience } from './components/VirtualCampExperience';
import { ElevationProfile } from './components/ElevationProfile';
import { MapSection } from './components/MapSection';
import { BookingCalculator } from './components/BookingCalculator';
import { PreparationChecklist } from './components/PreparationChecklist';
import { ReviewsSection } from './components/ReviewsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { FloatingConcierge } from './components/FloatingConcierge';
import { TourPackage } from './types';

export default function App() {
  const [lang, setLang] = useState<'ru' | 'en'>('ru');
  const [selectedTourForModal, setSelectedTourForModal] = useState<TourPackage | null>(null);
  const [calculatorTourId, setCalculatorTourId] = useState<string>('korolevsky-sonkul');

  const handleOpenBooking = (tourId?: string) => {
    if (tourId && tourId !== 'custom') {
      setCalculatorTourId(tourId);
    }
    const calcEl = document.getElementById('calculator');
    if (calcEl) {
      calcEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreRoutes = () => {
    const routesEl = document.getElementById('routes');
    if (routesEl) {
      routesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C0E10] text-[#EDE7DC] selection:bg-[#C9A86A] selection:text-[#0C0E10]">
      {/* 3-Zone Contract Header */}
      <Header
        lang={lang}
        setLang={setLang}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Hero Section */}
      <Hero
        lang={lang}
        onExploreRoutes={handleExploreRoutes}
        onOpenCalculator={() => handleOpenBooking()}
      />

      {/* Main Expedition Packages */}
      <ToursSection
        lang={lang}
        onOpenDetails={(tour) => setSelectedTourForModal(tour)}
        onBookTour={(tourId) => handleOpenBooking(tourId)}
      />

      {/* Nomadic Luxury & Camp Experience Bento */}
      <ExperienceBento lang={lang} />

      {/* Virtual Camp Experience 360 Yurt Viewer */}
      <VirtualCampExperience lang={lang} onBookYurt={() => handleOpenBooking()} />

      {/* Topographic Altitude Profile & Trail Map */}
      <ElevationProfile lang={lang} />

      {/* Google Interactive Satellite Map */}
      <MapSection lang={lang} />

      {/* Interactive Tour Builder & Real-time Booking Calculator */}
      <BookingCalculator
        key={calculatorTourId}
        initialTourId={calculatorTourId}
        lang={lang}
      />

      {/* Gear & Preparation Guide */}
      <PreparationChecklist lang={lang} />

      {/* Rider Testimonials */}
      <ReviewsSection lang={lang} />

      {/* Frequently Asked Questions */}
      <FaqSection lang={lang} />

      {/* Quiet Luxury Footer */}
      <Footer lang={lang} />

      {/* 24/7 Concierge Floating Trigger */}
      <FloatingConcierge lang={lang} />

      {/* Detailed Itinerary Modal */}
      <TourDetailModal
        tour={selectedTourForModal}
        onClose={() => setSelectedTourForModal(null)}
        onBookTour={(tourId) => {
          setSelectedTourForModal(null);
          handleOpenBooking(tourId);
        }}
        lang={lang}
      />
    </div>
  );
}
