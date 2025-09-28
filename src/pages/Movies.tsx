import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import MovieFilters from '@/components/MovieFilters';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Grid, List } from 'lucide-react';
import { useMovieContext } from '@/context/MovieContext';

interface FilterState {
  genres: string[];
  minRating: number;
  selectedYear?: number;
}

const Movies = () => {
  const { user, logout, searchMovies } = useMovieContext();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [filters, setFilters] = useState<FilterState>({
    genres: [],
    minRating: 0,
  });
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Get filtered movies
  const filteredMovies = searchMovies(searchQuery, {
    genres: filters.genres,
    minRating: filters.minRating,
    year: filters.selectedYear,
  });

  // Handle search from URL params
  useEffect(() => {
    const query = searchParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ search: searchQuery.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handleMovieClick = (movieId: string) => {
    navigate(`/movie/${movieId}`);
  };

  const clearFilters = () => {
    setFilters({
      genres: [],
      minRating: 0,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Header 
        user={user} 
        onLogout={logout}
        onSearch={(query) => setSearchQuery(query)}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            Browse Movies
          </h1>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search movies, directors, actors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-secondary/50 border-border focus:border-primary"
              />
            </div>
          </form>

          {/* View Controls */}
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {filteredMovies.length} movie{filteredMovies.length !== 1 ? 's' : ''} found
            </p>
            
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <MovieFilters
              filters={filters}
              onFiltersChange={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Movies Grid/List */}
          <div className="lg:col-span-3">
            {filteredMovies.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? "grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
                  : "space-y-4"
              }>
                {filteredMovies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onClick={() => handleMovieClick(movie.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filters
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movies;