import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie, Genre, User } from '@/types/movie';
import { mockMovies, mockGenres } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';

interface MovieContextType {
  movies: Movie[];
  genres: Genre[];
  user: User | null;
  loading: boolean;
  
  // Movie operations
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, updates: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  
  // Genre operations
  addGenre: (genre: Omit<Genre, 'id'>) => void;
  deleteGenre: (id: string) => void;
  
  // Auth operations
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  
  // Search and filter
  searchMovies: (query: string, filters?: {
    genres?: string[];
    minRating?: number;
    year?: number;
  }) => Movie[];
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
};

interface MovieProviderProps {
  children: React.ReactNode;
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [movies, setMovies] = useState<Movie[]>(mockMovies);
  const [genres, setGenres] = useState<Genre[]>(mockGenres);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('icinema_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  // Movie operations
  const addMovie = (movieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...movieData,
      id: Date.now().toString(),
    };
    setMovies(prev => [newMovie, ...prev]);
    toast({
      title: "Success",
      description: "Movie added successfully!",
    });
  };

  const updateMovie = (id: string, updates: Partial<Movie>) => {
    setMovies(prev => prev.map(movie => 
      movie.id === id ? { ...movie, ...updates } : movie
    ));
    toast({
      title: "Success",
      description: "Movie updated successfully!",
    });
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(movie => movie.id !== id));
    toast({
      title: "Success",
      description: "Movie deleted successfully!",
    });
  };

  // Genre operations
  const addGenre = (genreData: Omit<Genre, 'id'>) => {
    const newGenre: Genre = {
      ...genreData,
      id: Date.now().toString(),
    };
    setGenres(prev => [newGenre, ...prev]);
    toast({
      title: "Success",
      description: "Genre added successfully!",
    });
  };

  const deleteGenre = (id: string) => {
    setGenres(prev => prev.filter(genre => genre.id !== id));
    toast({
      title: "Success",
      description: "Genre deleted successfully!",
    });
  };

  // Auth operations
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock login logic - in real app, this would call an API
    const mockUser: User = {
      id: '1',
      email,
      name: email.includes('admin') ? 'Admin User' : 'Regular User',
      role: email.includes('admin') ? 'admin' : 'user',
    };
    
    setUser(mockUser);
    localStorage.setItem('icinema_user', JSON.stringify(mockUser));
    
    setLoading(false);
    toast({
      title: "Welcome back!",
      description: `Logged in as ${mockUser.name}`,
    });
    
    return true;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    setLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      role: 'user',
    };
    
    setUser(newUser);
    localStorage.setItem('icinema_user', JSON.stringify(newUser));
    
    setLoading(false);
    toast({
      title: "Welcome to iCinema!",
      description: `Account created successfully for ${name}`,
    });
    
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('icinema_user');
    toast({
      title: "Goodbye!",
      description: "You have been logged out successfully.",
    });
  };

  // Search and filter
  const searchMovies = (
    query: string,
    filters: {
      genres?: string[];
      minRating?: number;
      year?: number;
    } = {}
  ): Movie[] => {
    return movies.filter(movie => {
      // Text search
      const matchesQuery = !query || 
        movie.title.toLowerCase().includes(query.toLowerCase()) ||
        movie.description.toLowerCase().includes(query.toLowerCase()) ||
        movie.director.toLowerCase().includes(query.toLowerCase()) ||
        movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()));

      // Genre filter
      const matchesGenres = !filters.genres?.length || 
        filters.genres.some(genre => movie.genre.includes(genre));

      // Rating filter
      const matchesRating = !filters.minRating || 
        movie.rating >= filters.minRating;

      // Year filter
      const matchesYear = !filters.year || 
        new Date(movie.releaseDate).getFullYear() === filters.year;

      return matchesQuery && matchesGenres && matchesRating && matchesYear;
    });
  };

  const value: MovieContextType = {
    movies,
    genres,
    user,
    loading,
    addMovie,
    updateMovie,
    deleteMovie,
    addGenre,
    deleteGenre,
    login,
    signup,
    logout,
    searchMovies,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};