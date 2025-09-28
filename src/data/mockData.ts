import { Movie, Genre } from '../types/movie';
import quantumNexusImage from '@/assets/movie-posters/quantum-nexus.jpg';
import lastSymphonyImage from '@/assets/movie-posters/last-symphony.jpg';
import crimsonShadowsImage from '@/assets/movie-posters/crimson-shadows.jpg';
import lunarExpeditionImage from '@/assets/movie-posters/lunar-expedition.jpg';
import midnightCafeImage from '@/assets/movie-posters/midnight-cafe.jpg';
import phantomsCurseImage from '@/assets/movie-posters/phantoms-curse.jpg';

export const mockGenres: Genre[] = [
  { id: '1', name: 'Action', description: 'High-octane thrills and adventure' },
  { id: '2', name: 'Comedy', description: 'Laugh-out-loud entertainment' },
  { id: '3', name: 'Drama', description: 'Compelling stories and characters' },
  { id: '4', name: 'Horror', description: 'Spine-chilling terror' },
  { id: '5', name: 'Sci-Fi', description: 'Futuristic worlds and technology' },
  { id: '6', name: 'Romance', description: 'Love stories that touch the heart' },
  { id: '7', name: 'Thriller', description: 'Edge-of-your-seat suspense' },
  { id: '8', name: 'Animation', description: 'Animated adventures for all ages' },
];

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Quantum Nexus',
    description: 'A mind-bending sci-fi thriller about interdimensional travel and the consequences of playing with reality.',
    genre: ['Sci-Fi', 'Thriller'],
    rating: 8.4,
    duration: 142,
    releaseDate: '2024-03-15',
    poster: quantumNexusImage,
    director: 'Sarah Chen',
    cast: ['Alex Rivera', 'Maya Patel', 'James Morrison'],
    language: 'English',
    isActive: true,
    showTimes: ['14:00', '17:30', '20:45', '23:15']
  },
  {
    id: '2',
    title: 'The Last Symphony',
    description: 'A beautiful drama about a composer who must overcome personal tragedy to create his masterpiece.',
    genre: ['Drama', 'Romance'],
    rating: 9.1,
    duration: 127,
    releaseDate: '2024-02-28',
    poster: lastSymphonyImage,
    director: 'Michael Anderson',
    cast: ['Emma Thompson', 'Oscar Isaac', 'Lupita Nyong\'o'],
    language: 'English',
    isActive: true,
    showTimes: ['15:30', '18:00', '20:30']
  },
  {
    id: '3',
    title: 'Crimson Shadows',
    description: 'An action-packed thriller following a vigilante seeking justice in the neon-lit streets of Neo Tokyo.',
    genre: ['Action', 'Thriller'],
    rating: 7.8,
    duration: 118,
    releaseDate: '2024-03-22',
    poster: crimsonShadowsImage,
    director: 'Hiroshi Tanaka',
    cast: ['Keanu Reeves', 'Scarlett Johansson', 'Toshiro Mifune'],
    language: 'English',
    isActive: true,
    showTimes: ['16:00', '19:15', '22:00']
  },
  {
    id: '4',
    title: 'Lunar Expedition',
    description: 'A thrilling space adventure about humanity\'s first mission to establish a colony on the moon.',
    genre: ['Sci-Fi', 'Adventure'],
    rating: 8.7,
    duration: 156,
    releaseDate: '2024-04-10',
    poster: lunarExpeditionImage,
    director: 'Christopher Nolan',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain'],
    language: 'English',
    isActive: true,
    showTimes: ['13:00', '16:45', '20:00']
  },
  {
    id: '5',
    title: 'Midnight Café',
    description: 'A heartwarming comedy about a late-night diner that brings together the most unlikely of friends.',
    genre: ['Comedy', 'Drama'],
    rating: 8.2,
    duration: 101,
    releaseDate: '2024-03-05',
    poster: midnightCafeImage,
    director: 'Greta Gerwig',
    cast: ['Ryan Gosling', 'Margot Robbie', 'Steve Carell'],
    language: 'English',
    isActive: true,
    showTimes: ['14:30', '17:00', '19:30', '22:15']
  },
  {
    id: '6',
    title: 'The Phantom\'s Curse',
    description: 'A spine-chilling horror about an ancient curse that haunts a small Victorian town.',
    genre: ['Horror', 'Thriller'],
    rating: 7.3,
    duration: 94,
    releaseDate: '2024-02-14',
    poster: phantomsCurseImage,
    director: 'Jordan Peele',
    cast: ['Lupita Nyong\'o', 'Daniel Kaluuya', 'Tilda Swinton'],
    language: 'English',
    isActive: true,
    showTimes: ['18:30', '21:00', '23:30']
  }
];