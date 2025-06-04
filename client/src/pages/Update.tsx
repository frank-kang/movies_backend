"use client";
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(1, "Summary is required"),
    linkToIMDB: z.string().url("Must be a valid URL").optional(),
    rating: z.string().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
});

export function Update() {
    const [isLoading, setIsLoading] = useState(false);
    const { movieId } = useParams<{ movieId: string }>();
    const navigate = useNavigate();
    const [error, setError] = useState<Error | null>(null);
    const [movie, setMovie] = useState<{
        title: string;
        summary: string;
        linkToIMDB: string;
        rating?: number;
    } | null>(null);
    const form = useForm({
            resolver: zodResolver(formSchema),
            defaultValues: {
                title: "",
                summary: "",
                linkToIMDB: "",
                rating: undefined,
            },
        });
    useEffect(() => {
        async function fetchMovie(movieId: string) {
            setIsLoading(true);
            try {
                const response = await fetch(`/api/movies/${movieId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movie');
                }
                const movie = await response.json();
                setMovie(movie);
                form.reset({
                    title: movie.title,
                    summary: movie.summary,
                    linkToIMDB: movie.linkToIMDB,
                    rating: movie.rating ? movie.rating.toString() : "",
                });
                
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error('An unexpected error occurred'));
                }
            } finally {
                setIsLoading(false);
            }
        }
        if (movieId) {
            fetchMovie(movieId);
        }
    }, [movieId, form]);

    async function onSubmit(
            values: z.infer<typeof formSchema>
        ) {
            setIsLoading(true);
            
        
            const title = values.title;
            const summary = values.summary;
            const linkToIMDB = values.linkToIMDB;
            const rating = values.rating ? parseFloat(values.rating) : undefined;
            try {
                const url = `/api/movies/${movieId}`;
                const req = {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ title, summary, linkToIMDB, rating }),
                };
    
                const response = await fetch(url, req);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const movie = await response.json();
                alert(`Following movie updated successfully: ${movie.title}`);
                navigate('/'); // Redirect to the home page after successful submission
            } catch (err) {
                if (err instanceof Error) {
                    setError(err);
                } else {
                    setError(new Error(String(err)));
                }
            } finally {
                setIsLoading(false);
            }
        }

    if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Loading Movie with ID {movieId}.
      </div>
    );
  }

    return (
        <div className="container">
        <h1>Update Movie</h1>
    
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormDescription>
                Enter a new title.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormDescription>
                Enter a new summary.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="linkToIMDB"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link to IMDB</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormDescription>
                Update the link to IMDB for the movie you want to add.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
              <FormControl>
                <Input placeholder=" " {...field} />
              </FormControl>
              <FormDescription>
                Update rating for the movie. Must be between 1 and 5.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
      </Form>
    </div>
    );
}