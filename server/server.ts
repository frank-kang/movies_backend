import 'dotenv/config';
import express from 'express';
import pg from 'pg';
import { ClientError, errorMiddleware } from './lib/index.js';

type Movie = {
  title: string;
  summary: string;
  linkToIMDB: string;
  rating: number;
};

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
app.use(express.json());

app.get('/api/movies', async (req, res, next) => {
  try {
    const sql = `
      select *
        from "movies"
        order by "movieId" asc
    `;
    const result = await db.query<Movie>(sql);
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.post('/api/movies', async (req, res, next) => {
  try {
    const { title, summary, linkToIMDB, rating } = req.body;
    if (!title || !summary || !linkToIMDB || typeof rating !== 'number') {
      throw new ClientError(400, 'title, summary, linkToIMDB, and rating are required');
    }
    const sql = `
      insert into "movies" ("title", "summary", "linkToIMDB", "rating")
        values ($1, $2, $3, $4)
        returning *
    `;
    const params = [title, summary, linkToIMDB, rating];
    const result = await db.query<Movie>(sql, params);
    
    const [movie] = result.rows;
    res.status(201).json(movie);
  } catch (err) {
    next(err);
  }
});

app.put('/api/movies/:movieId', async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    if (!Number.isInteger(movieId) || movieId < 1) {
      throw new ClientError(400, 'movieId must be a positive integer');
    }
    const { title, summary, linkToIMDB, rating } = req.body;
    if (!title || !summary || !linkToIMDB || typeof rating !== 'number') {
      throw new ClientError(400, 'title, summary, linkToIMDB, and rating are required');
    }
    const sql = `
      update "movies"
        set "title" = $1,
            "summary" = $2,
            "linkToIMDB" = $3,
            "rating" = $4
        where "movieId" = $5
        returning *
    `;
    const params = [title, summary, linkToIMDB, rating, movieId];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    if (!movie) {
      throw new ClientError(404, `cannot find movie with movieId ${movieId}`);
    }
    res.json(movie);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/movies/:movieId', async (req, res, next) => {
  try {
    const movieId = Number(req.params.movieId);
    if (!Number.isInteger(movieId) || movieId < 1) {
      throw new ClientError(400, 'movieId must be a positive integer');
    }
    const sql = `
      delete from "movies"
        where "movieId" = $1
        returning *
    `;
    const params = [movieId];
    const result = await db.query<Movie>(sql, params);
    const [movie] = result.rows;
    if (!movie) {
      throw new ClientError(404, `cannot find movie with movieId ${movieId}`);
    }
    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(`express server listening on port ${process.env.PORT}`);
});
