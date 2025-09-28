import { useState } from 'react';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Film, Tag, Trash2, Edit } from 'lucide-react';
import { useMovieContext } from '@/context/MovieContext';
import { mockGenres } from '@/data/mockData';
import { Movie, Genre } from '@/types/movie';

const Admin = () => {
  const { movies, genres, user, logout, addMovie, updateMovie, deleteMovie, addGenre, deleteGenre } = useMovieContext();
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isMovieDialogOpen, setIsMovieDialogOpen] = useState(false);
  const [isGenreDialogOpen, setIsGenreDialogOpen] = useState(false);

  // Movie form state
  const [movieForm, setMovieForm] = useState({
    title: '',
    description: '',
    genre: [] as string[],
    rating: 0,
    duration: 0,
    releaseDate: '',
    poster: '',
    director: '',
    cast: [] as string[],
    language: 'English',
    showTimes: [] as string[],
  });

  // Genre form state
  const [genreForm, setGenreForm] = useState({
    name: '',
    description: '',
  });

  // Cast input state
  const [castInput, setCastInput] = useState('');
  const [showTimesInput, setShowTimesInput] = useState('');

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-cinema">
        <Header user={user} onLogout={logout} />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4 text-destructive">Access Denied</h1>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </div>
        </div>
      </div>
    );
  }

  const handleMovieSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const movieData = {
      ...movieForm,
      cast: castInput.split(',').map(s => s.trim()).filter(s => s),
      showTimes: showTimesInput.split(',').map(s => s.trim()).filter(s => s),
      isActive: true,
    };

    if (selectedMovie) {
      updateMovie(selectedMovie.id, movieData);
    } else {
      addMovie(movieData);
    }

    resetMovieForm();
    setIsMovieDialogOpen(false);
  };

  const handleGenreSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addGenre(genreForm);
    setGenreForm({ name: '', description: '' });
    setIsGenreDialogOpen(false);
  };

  const resetMovieForm = () => {
    setMovieForm({
      title: '',
      description: '',
      genre: [],
      rating: 0,
      duration: 0,
      releaseDate: '',
      poster: '',
      director: '',
      cast: [],
      language: 'English',
      showTimes: [],
    });
    setCastInput('');
    setShowTimesInput('');
    setSelectedMovie(null);
  };

  const handleEditMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setMovieForm({
      title: movie.title,
      description: movie.description,
      genre: movie.genre,
      rating: movie.rating,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      poster: movie.poster,
      director: movie.director,
      cast: movie.cast,
      language: movie.language,
      showTimes: movie.showTimes,
    });
    setCastInput(movie.cast.join(', '));
    setShowTimesInput(movie.showTimes.join(', '));
    setIsMovieDialogOpen(true);
  };

  const handleDeleteMovie = (movieId: string) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(movieId);
    }
  };

  const handleDeleteGenre = (genreId: string) => {
    if (confirm('Are you sure you want to delete this genre?')) {
      deleteGenre(genreId);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-cinema">
      <Header user={user} onLogout={logout} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-gold bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">Manage movies and genres</p>
        </div>

        <Tabs defaultValue="movies" className="space-y-6">
          <TabsList className="bg-secondary">
            <TabsTrigger value="movies" className="flex items-center gap-2">
              <Film className="h-4 w-4" />
              Movies ({movies.length})
            </TabsTrigger>
            <TabsTrigger value="genres" className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              Genres ({genres.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="movies">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Movie Management</h2>
                <Dialog open={isMovieDialogOpen} onOpenChange={setIsMovieDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={resetMovieForm} className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Movie
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>
                        {selectedMovie ? 'Edit Movie' : 'Add New Movie'}
                      </DialogTitle>
                      <DialogDescription>
                        {selectedMovie ? 'Update movie details' : 'Fill in the movie information'}
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleMovieSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={movieForm.title}
                            onChange={(e) => setMovieForm({ ...movieForm, title: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="director">Director</Label>
                          <Input
                            id="director"
                            value={movieForm.director}
                            onChange={(e) => setMovieForm({ ...movieForm, director: e.target.value })}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={movieForm.description}
                          onChange={(e) => setMovieForm({ ...movieForm, description: e.target.value })}
                          required
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="rating">Rating (0-10)</Label>
                          <Input
                            id="rating"
                            type="number"
                            min="0"
                            max="10"
                            step="0.1"
                            value={movieForm.rating}
                            onChange={(e) => setMovieForm({ ...movieForm, rating: parseFloat(e.target.value) || 0 })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="duration">Duration (minutes)</Label>
                          <Input
                            id="duration"
                            type="number"
                            min="1"
                            value={movieForm.duration}
                            onChange={(e) => setMovieForm({ ...movieForm, duration: parseInt(e.target.value) || 0 })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="language">Language</Label>
                          <Select value={movieForm.language} onValueChange={(value) => setMovieForm({ ...movieForm, language: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="English">English</SelectItem>
                              <SelectItem value="Spanish">Spanish</SelectItem>
                              <SelectItem value="French">French</SelectItem>
                              <SelectItem value="German">German</SelectItem>
                              <SelectItem value="Italian">Italian</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="releaseDate">Release Date</Label>
                        <Input
                          id="releaseDate"
                          type="date"
                          value={movieForm.releaseDate}
                          onChange={(e) => setMovieForm({ ...movieForm, releaseDate: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="poster">Poster URL</Label>
                        <Input
                          id="poster"
                          value={movieForm.poster}
                          onChange={(e) => setMovieForm({ ...movieForm, poster: e.target.value })}
                          placeholder="https://example.com/poster.jpg"
                        />
                      </div>

                      <div>
                        <Label htmlFor="cast">Cast (comma-separated)</Label>
                        <Input
                          id="cast"
                          value={castInput}
                          onChange={(e) => setCastInput(e.target.value)}
                          placeholder="Actor 1, Actor 2, Actor 3"
                        />
                      </div>

                      <div>
                        <Label htmlFor="showTimes">Show Times (comma-separated)</Label>
                        <Input
                          id="showTimes"
                          value={showTimesInput}
                          onChange={(e) => setShowTimesInput(e.target.value)}
                          placeholder="14:00, 17:30, 20:00"
                        />
                      </div>

                      <div>
                        <Label>Genres</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {mockGenres.map((genre) => (
                            <Badge
                              key={genre.id}
                              variant={movieForm.genre.includes(genre.name) ? "default" : "outline"}
                              className="cursor-pointer"
                              onClick={() => {
                                const newGenres = movieForm.genre.includes(genre.name)
                                  ? movieForm.genre.filter(g => g !== genre.name)
                                  : [...movieForm.genre, genre.name];
                                setMovieForm({ ...movieForm, genre: newGenres });
                              }}
                            >
                              {genre.name}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsMovieDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                          {selectedMovie ? 'Update Movie' : 'Add Movie'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    showAdminActions
                    onEdit={() => handleEditMovie(movie)}
                    onDelete={() => handleDeleteMovie(movie.id)}
                  />
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="genres">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Genre Management</h2>
                <Dialog open={isGenreDialogOpen} onOpenChange={setIsGenreDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Genre
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Genre</DialogTitle>
                      <DialogDescription>
                        Create a new movie genre category
                      </DialogDescription>
                    </DialogHeader>
                    
                    <form onSubmit={handleGenreSubmit} className="space-y-4">
                      <div>
                        <Label htmlFor="genreName">Genre Name</Label>
                        <Input
                          id="genreName"
                          value={genreForm.name}
                          onChange={(e) => setGenreForm({ ...genreForm, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="genreDescription">Description (optional)</Label>
                        <Textarea
                          id="genreDescription"
                          value={genreForm.description}
                          onChange={(e) => setGenreForm({ ...genreForm, description: e.target.value })}
                          placeholder="Brief description of the genre"
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => setIsGenreDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-gradient-gold text-cinema-dark hover:shadow-gold">
                          Add Genre
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {genres.map((genre) => (
                  <Card key={genre.id} className="bg-card/50 border-border">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <CardTitle className="text-lg">{genre.name}</CardTitle>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteGenre(genre.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </CardHeader>
                    {genre.description && (
                      <CardContent>
                        <p className="text-sm text-muted-foreground">
                          {genre.description}
                        </p>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;