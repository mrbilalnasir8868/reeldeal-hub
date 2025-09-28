import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { X, Filter } from 'lucide-react';
import { mockGenres } from '@/data/mockData';

interface FilterState {
  genres: string[];
  minRating: number;
  selectedYear?: number;
}

interface MovieFiltersProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

const MovieFilters = ({ filters, onFiltersChange, onClearFilters }: MovieFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleGenre = (genreName: string) => {
    const newGenres = filters.genres.includes(genreName)
      ? filters.genres.filter(g => g !== genreName)
      : [...filters.genres, genreName];
    
    onFiltersChange({ ...filters, genres: newGenres });
  };

  const handleRatingChange = (value: number[]) => {
    onFiltersChange({ ...filters, minRating: value[0] });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  const hasActiveFilters = filters.genres.length > 0 || filters.minRating > 0 || filters.selectedYear;

  return (
    <Card className="bg-card border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-primary" />
            Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-3 w-3 mr-1" />
                Clear
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="md:hidden"
            >
              {isExpanded ? 'Hide' : 'Show'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className={`space-y-6 ${isExpanded || 'hidden md:block'}`}>
        {/* Genre Filters */}
        <div>
          <h4 className="font-medium mb-3 text-foreground">Genres</h4>
          <div className="flex flex-wrap gap-2">
            {mockGenres.map((genre) => (
              <Badge
                key={genre.id}
                variant={filters.genres.includes(genre.name) ? "default" : "outline"}
                className={`cursor-pointer transition-colors ${
                  filters.genres.includes(genre.name)
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'hover:bg-secondary'
                }`}
                onClick={() => toggleGenre(genre.name)}
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium mb-3 text-foreground">
            Minimum Rating: <span className="text-primary">{filters.minRating.toFixed(1)}+</span>
          </h4>
          <Slider
            value={[filters.minRating]}
            onValueChange={handleRatingChange}
            max={10}
            min={0}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0</span>
            <span>10</span>
          </div>
        </div>

        <Separator />

        {/* Release Year Filter */}
        <div>
          <h4 className="font-medium mb-3 text-foreground">Release Year</h4>
          <div className="flex flex-wrap gap-2">
            <Badge
              variant={!filters.selectedYear ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => onFiltersChange({ ...filters, selectedYear: undefined })}
            >
              All Years
            </Badge>
            {years.map((year) => (
              <Badge
                key={year}
                variant={filters.selectedYear === year ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => onFiltersChange({ ...filters, selectedYear: year })}
              >
                {year}
              </Badge>
            ))}
          </div>
        </div>

        {/* Active Filters Summary */}
        {hasActiveFilters && (
          <>
            <Separator />
            <div>
              <h4 className="font-medium mb-2 text-foreground">Active Filters</h4>
              <div className="flex flex-wrap gap-1">
                {filters.genres.map((genre) => (
                  <Badge key={genre} variant="secondary" className="text-xs">
                    {genre}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleGenre(genre)}
                    />
                  </Badge>
                ))}
                {filters.minRating > 0 && (
                  <Badge variant="secondary" className="text-xs">
                    Rating {filters.minRating.toFixed(1)}+
                  </Badge>
                )}
                {filters.selectedYear && (
                  <Badge variant="secondary" className="text-xs">
                    {filters.selectedYear}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => onFiltersChange({ ...filters, selectedYear: undefined })}
                    />
                  </Badge>
                )}
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MovieFilters;