import { Star, Clock, Calendar } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
  showAdminActions?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

const MovieCard = ({ 
  movie, 
  onClick, 
  showAdminActions, 
  onEdit, 
  onDelete 
}: MovieCardProps) => {
  return (
    <Card 
      className="group relative overflow-hidden bg-card hover:shadow-cinema transition-all duration-300 cursor-pointer border-border"
      onClick={onClick}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-darker/80 via-transparent to-transparent z-10" />
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1489599162024-e4b29ad3c1c0?w=400&h=600&fit=crop&crop=center`;
          }}
        />
        
        {/* Rating Badge */}
        <div className="absolute top-3 right-3 z-20">
          <Badge className="bg-cinema-gold/90 text-cinema-dark font-bold">
            <Star className="h-3 w-3 mr-1 fill-current" />
            {movie.rating}
          </Badge>
        </div>

        {/* Quick Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3 z-20 text-foreground">
          <div className="flex items-center gap-2 text-sm opacity-90">
            <Clock className="h-3 w-3" />
            <span>{movie.duration} min</span>
            <Calendar className="h-3 w-3 ml-2" />
            <span>{new Date(movie.releaseDate).getFullYear()}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {movie.description}
        </p>
        
        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 2).map((genre) => (
            <Badge key={genre} variant="secondary" className="text-xs">
              {genre}
            </Badge>
          ))}
          {movie.genre.length > 2 && (
            <Badge variant="secondary" className="text-xs">
              +{movie.genre.length - 2}
            </Badge>
          )}
        </div>

        {/* Director */}
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Director:</span> {movie.director}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        {showAdminActions ? (
          <div className="flex gap-2 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.();
              }}
              className="flex-1"
            >
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.();
              }}
              className="flex-1"
            >
              Delete
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full bg-gradient-gold text-cinema-dark hover:shadow-gold"
            onClick={(e) => {
              e.stopPropagation();
              // Handle booking logic
            }}
          >
            Book Tickets
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default MovieCard;