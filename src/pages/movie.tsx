import React, { useState, useEffect } from "react";
import styles from "@/styles/Pages/Movies/Movies.module.css";
import MoviesFilters from "@/components/Movies/MoviesFilters";
import { GetServerSideProps } from "next";
import MovieCard from "@/components/Movies/MovieCard";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface MoviesPageProps {
  popularMovies: { results: Movie[] };
  countries: { iso_3166_1: string; english_name: string }[];
}

const Movies: React.FC<MoviesPageProps> = ({
  popularMovies = { results: [] },
  countries = [],
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (popularMovies?.results?.length) {
      setMovies(popularMovies.results);
      setLoading(false);
    }
  }, [popularMovies]);

  return (
    <div className={styles.movies_page}>
      <div className={styles.movies_wrapper}>
        <section className={styles.filter_section}>
          <h2 className={styles.movies_header}>Popular Movies</h2>
          <MoviesFilters countries={countries} setMovies={setMovies} />
        </section>
        <section className={styles.popular_movies}>
          {loading ? (
            <p>Loading movies...</p>
          ) : movies ? (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          ) : (
            <p>No movies available</p>
          )}
        </section>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  try {
    const moviesResponse = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    );
    const popularMovies = await moviesResponse.json();

    const countriesResponse = await fetch(
      "https://api.themoviedb.org/3/configuration/countries?language=en-US",
      options
    );
    const countries = await countriesResponse.json();

    return {
      props: {
        popularMovies,
        countries,
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: {
        popularMovies: { results: [] },
        countries: [],
      },
    };
  }
};

export default Movies;
