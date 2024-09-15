import React, { useState, useEffect, useRef } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [currentURL, setCurrentURL] = useState<string>(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1"
  );
  const [isLoadMore, setIsLoadMore] = useState<boolean>(false); 
  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null); 

  useEffect(() => {
    if (popularMovies?.results?.length) {
      setMovies(popularMovies.results);
    }
  }, [popularMovies]);

  const loadMoreMovies = async () => {
    setLoading(true);

    try {
      const newPage = page + 1;
      setPage(newPage);

      const newURL = `${currentURL}&page=${newPage}`;
      setCurrentURL(newURL);

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
        },
      };

      const response = await fetch(newURL, options);
      const data = await response.json();

      if (data?.results?.length) {
        setMovies((prevMovies) => [...prevMovies, ...data.results]);
      }
    } catch (error) {
      console.error("Error fetching more movies:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && isLoadMore && !loading) {
          loadMoreMovies();
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1.0, 
      }
    );

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current);
    }

    return () => {
      if (loadMoreTriggerRef.current) {
        observer.unobserve(loadMoreTriggerRef.current);
      }
    };
  }, [isLoadMore, loading]);

  return (
    <div className={styles.movies_page}>
      <div className={styles.movies_wrapper}>
        <section className={styles.filter_section}>
          <h2 className={styles.movies_header}>Popular Movies</h2>
          <MoviesFilters
            countries={countries}
            setMovies={setMovies}
            currentURL={currentURL}
            setCurrentURL={setCurrentURL}
            setIsLoadMore={setIsLoadMore}
          />
        </section>
        <section className={styles.popular_movies}>
          {movies.length === 0 ? (
            <p>No movies available</p>
          ) : (
            movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)
          )}

          {!isLoadMore && (
            <button
              className={`button ${styles.load_more_button}`}
              disabled={loading}
              onClick={() => setIsLoadMore(true)}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          )}

          <div ref={loadMoreTriggerRef} className={styles.load_more_trigger}></div>

          {loading && <h1>Loading more movies...</h1>}
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
