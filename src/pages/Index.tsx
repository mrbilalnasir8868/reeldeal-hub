import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Film, Star, Calendar, Clock, Play } from 'lucide-react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { useMovieContext } from '@/context/MovieContext';
import cinemaHeroImage from '@/assets/cinema-hero.jpg';

const Index = () => {
  const { movies, user, logout } = useMovieContext();
  
  // Get featured movies (highest rated)
  const featuredMovies = movies
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const latestMovies = movies
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Header user={user} onLogout={logout} />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cinemaHeroImage}
            alt="Cinema Interior"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-darker/90 via-cinema-darker/60 to-transparent" />
        </div>
        
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-gold bg-clip-text text-transparent">
              Welcome to iCinema
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-foreground/90 leading-relaxed">
              Experience the magic of movies like never before. Book your tickets, explore new releases, and immerse yourself in cinematic excellence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/movies">
                <Button size="lg" className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                  <Film className="h-5 w-5 mr-2" />
                  Browse Movies
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-2 border-foreground/20 text-foreground hover:bg-foreground/10">
                <Play className="h-5 w-5 mr-2" />
                Watch Trailers
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-16">
        {/* Featured Movies */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-gold bg-clip-text text-transparent">
                Featured Movies
              </h2>
              <p className="text-muted-foreground">
                Our highest-rated movies you shouldn't miss
              </p>
            </div>
            <Link to="/movies">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        </section>

        {/* Latest Releases */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-gold bg-clip-text text-transparent">
                Latest Releases
              </h2>
              <p className="text-muted-foreground">
                The newest movies in theaters
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestMovies.map((movie) => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-card/50 border-border text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-primary">
                  {movies.length}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Movies Available</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-primary">
                  {movies.reduce((acc, movie) => acc + movie.showTimes.length, 0)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Daily Showtimes</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-primary">
                  {(movies.reduce((acc, movie) => acc + movie.rating, 0) / movies.length).toFixed(1)}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Average Rating</p>
              </CardContent>
            </Card>

            <Card className="bg-card/50 border-border text-center">
              <CardHeader className="pb-3">
                <CardTitle className="text-3xl font-bold text-primary">
                  5
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium">Theater Screens</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gradient-to-r from-cinema-red/10 to-primary/10 rounded-2xl p-12 border border-border/50">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-gold bg-clip-text text-transparent">
            Ready for Your Next Movie Experience?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of movie lovers who trust iCinema for their entertainment needs. 
            Sign up today and never miss a great movie again.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Link to="/movies">
                <Button size="lg" className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                  Browse Movies
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/signup">
                  <Button size="lg" className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                    Sign Up Today
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Index;
