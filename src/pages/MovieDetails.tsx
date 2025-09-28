import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Clock, Calendar, MapPin, Users, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import { useMovieContext } from '@/context/MovieContext';

const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { movies, user, logout } = useMovieContext();
  
  const movie = movies.find(m => m.id === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gradient-cinema">
        <Header user={user} onLogout={logout} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Movie Not Found</h1>
            <Button onClick={() => navigate('/movies')} variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Movies
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Header user={user} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Movie Poster */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-cinema">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `https://images.unsplash.com/photo-1489599162024-e4b29ad3c1c0?w=600&h=900&fit=crop&crop=center`;
                  }}
                />
                <div className="absolute top-4 right-4">
                  <Badge className="bg-cinema-gold/90 text-cinema-dark font-bold">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    {movie.rating}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Movie Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-4xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
                {movie.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(movie.releaseDate).getFullYear()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{movie.duration} minutes</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{movie.language}</span>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genre.map((genre) => (
                  <Badge key={genre} variant="secondary">
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Description */}
              <p className="text-lg leading-relaxed text-foreground/90">
                {movie.description}
              </p>
            </div>

            <Separator />

            {/* Cast and Crew */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="text-lg">Director</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-medium">{movie.director}</p>
                </CardContent>
              </Card>

              <Card className="bg-card/50 border-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Cast
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {movie.cast.map((actor, index) => (
                      <p key={index} className="text-sm">{actor}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Showtimes */}
            <Card className="bg-card/50 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Showtimes Today</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {movie.showTimes.map((time, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="h-12 border-border hover:bg-primary hover:text-primary-foreground"
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg"
                className="bg-gradient-gold text-cinema-dark hover:shadow-gold flex-1 min-w-[200px]"
              >
                <MapPin className="h-4 w-4 mr-2" />
                Book Tickets
              </Button>
              
              {movie.trailer && (
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-border"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Watch Trailer
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;