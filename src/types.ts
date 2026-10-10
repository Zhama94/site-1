export interface TourDay {
  dayNumber: number;
  title: string;
  description: string;
  ridingHours: number;
  distanceKm: number;
  altitudeFrom: number;
  altitudeTo: number;
  overnight: string;
  highlights: string[];
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  durationDays: number;
  durationNights: number;
  difficulty: 'Для всех уровней' | 'Средний' | 'Продвинутый';
  groupSize: string;
  pricePerPersonUsd: number;
  pricePerPersonRub: number;
  seasonMonths: string;
  mainImage: string;
  summary: string;
  elevationMax: number;
  elevationMin: number;
  included: string[];
  notIncluded: string[];
  itinerary: TourDay[];
}

export interface BookingState {
  tourId: string;
  ridingLevel: 'beginner' | 'intermediate' | 'expert';
  guestsCount: number;
  month: 'june' | 'july' | 'august' | 'september';
  selectedDate: string;
  addons: {
    helicopterTransfer: boolean;
    privateYurt: boolean;
    dronePhotographer: boolean;
    saunaExperience: boolean;
    eagleHuntingDemo: boolean;
  };
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  clientNotes: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  location: string;
  tourTaken: string;
  date: string;
  text: string;
  rating: number;
  avatarSeed: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'Лошади' | 'Высота и здоровье' | 'Проживание' | 'Логистика';
}
