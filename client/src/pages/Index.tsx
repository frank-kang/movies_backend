import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useEffect } from "react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"


export function Index() {
type Movie = {
  movieId: string | number;
  title: string;
  summary: string;
  linkToIMDB: string;
  rating: number;
};

const [movies, setMovies] = useState<Movie[]>([]);
const [isLoading, setIsLoading] = useState(true);
const [error, setError] = useState<string | null>();
useEffect(() => {
  async function fetchMovies(): Promise<void> {
    try {
      const response = await fetch('/api/movies');
      if (!response.ok) {
        setError("Movies not found");
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    } finally {
        setIsLoading(false);
    }
    
    }
    fetchMovies();
    }, []);

    if (isLoading) return <div>Loading...</div>;
    if (error) {
    return (
      <div>
        Error Loading movies: {error}
      </div>
    );
  }


  return (
    <>
    <div className="container">
      <h1>Welcome to the Movie App</h1>
      <p>Number of movies: {movies.length}</p>
      
        <Carousel>
            
            <CarouselContent className="flex gap-4">
                {movies.map((movie) => (
                    <CarouselItem key={movie.movieId} className="md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                        <Card>
                            <CardContent className="aspect-square items-center justify-center p-6">
                                <h2>{movie.title}</h2>
                                <p>{movie.summary}</p>
                                <a href={movie.linkToIMDB} target="_blank" rel="noopener noreferrer">View on IMDb</a>
                                <p>Rating: {movie.rating}</p>
                            </CardContent>
                        </Card>
                        </div>
                        
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    </div>
    </>
  );
}