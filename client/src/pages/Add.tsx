"use client";
import z, { set } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormDescription, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    summary: z.string().min(1, "Summary is required"),
    linkToIMDB: z.string().url("Must be a valid URL").optional(),
    rating: z.string().min(1, "Rating must be at least 1").max(5, "Rating must be at most 5").optional(),
});

export function Add() {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState<Error | null>(null);
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            summary: "",
            linkToIMDB: "",
            rating: undefined,
        },
    });

    async function onSubmit(
        values: z.infer<typeof formSchema>
    ) {
        setIsLoading(true);
        const title = values.title;
        const summary = values.summary;
        const linkToIMDB = values.linkToIMDB;
        const rating = values.rating ? parseFloat(values.rating) : undefined;
        try {
            const url = '/api/movies';
            const req = {
                method: 'POST',
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
            alert(`Following movie added successfully: ${movie.title}`);
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
                Error Loading Players by ZipCode
                {error instanceof Error ? error.message : 'Unknown Error'}
            </div>
        );
    }


    return (
        <div className="container">
        <h1>Add Movie</h1>
    
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
                Enter the title of the movie you want to add.
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
                Enter a summary of the movie you want to add.
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
                Enter a link to IMDB for the movie you want to add.
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
                Rate the movie. Must be between 1 and 5.
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