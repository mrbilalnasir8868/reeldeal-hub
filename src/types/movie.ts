export interface Movie {
  id: string;
  title: string;
  description: string;
  genre: string[];
  rating: number;
  duration: number;
  releaseDate: string;
  poster: string;
  trailer?: string;
  director: string;
  cast: string[];
  language: string;
  isActive: boolean;
  showTimes: string[];
}

export interface Genre {
  id: string;
  name: string;
  description?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}