import React, { useState, useEffect, useRef } from "react";
import FilterPanel from "./FilterPanel";
import styles from "@/styles/Pages/Movies/FilterPanel.module.css";
import { FilterPanelData } from "./FiltersInterfaces";

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
}

interface Country {
  iso_3166_1: string;
  english_name: string;
}

interface MoviesFiltersProps {
  countries: Country[];
  setMovies: (movies: Movie[]) => void;
}

const MoviesFilters: React.FC<MoviesFiltersProps> = ({
  countries,
  setMovies,
}) => {
  const countryOptions = countries.map(
    (country) => `${country.english_name}*${country.iso_3166_1}`
  );

  const [sortFilter, setSortFilter] = useState<FilterPanelData>({
    type: "Sort",
    isInfo: false,
    info: "",
    sections: [
      {
        label: "Sort Results By",
        type: "Dropdown",
        values: [
          "Popularity Descending",
          "Popularity Ascending",
          "Rating Descending",
          "Rating Ascending",
          "Release Date Descending",
          "Release Date Ascending",
          "Title (A-Z)",
          "Title (Z-A)",
        ],
        value: ["0"],
      },
    ],
  });

  const [whereToWatchFilter, setWhereToWatchFilter] = useState<FilterPanelData>(
    {
      type: "Where To Watch",
      isInfo: true,
      info: "30",
      sections: [
        {
          label: "My Services",
          type: "Checkboxes",
          values: ["Restrict searches to my subscribed services?"],
          value: ["0"],
        },
        {
          label: "Country",
          type: "CountriesDropDown",
          values: countryOptions,
          value: ["0"],
        },
      ],
    }
  );

  const [filters, setFilters] = useState<FilterPanelData>({
    type: "Filters",
    isInfo: false,
    info: "",
    sections: [
      {
        label: "Show Me",
        type: "RadioButtons",
        values: ["Everything", "Movies I Haven't Seen", "Movies I Have Seen"],
        value: ["0"],
      },
      {
        label: "Availabilities",
        type: "Checkboxes",
        values: ["Search all availabilities?"],
        value: ["0"],
      },
      {
        label: "Release Dates",
        type: "ReleaseDates",
        values: ["Search all releases?", "from", "to"],
        value: ["0", "1/8/1999", "4/9/2024"],
      },
      {
        label: "Genres",
        type: "Genres",
        values: ["Action", "Adventure", "Animation"],
        value: ["0", "0", "0"],
      },
      {
        label: "Certification",
        type: "Certification",
        values: [],
        value: [],
      },
      {
        label: "User Score",
        type: "Slider",
        values: ["0", "10"],
        value: ["0", "10"],
      },
      {
        label: "Minimum User Votes",
        type: "Slider",
        values: ["0", "100", "200", "300", "400", "500"],
        value: ["0", "500"],
      },
      {
        label: "Runtime",
        type: "Slider",
        values: ["0", "120", "240", "360"],
        value: ["0", "360"],
      },
      {
        label: "Keywords",
        type: "textbox",
        values: [""],
        value: [""],
      },
    ],
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const buildApiUrl = () => {
    let url = "https://api.themoviedb.org/3/discover/movie?language=en-US";

    const sortValue = sortFilter.sections[0].value[0];
    let sortByParam = "";

    switch (sortValue) {
      case "0":
        sortByParam = "popularity.desc";
        break;
      case "1":
        sortByParam = "popularity.asc";
        break;
      case "2":
        sortByParam = "vote_average.desc";
        break;
      case "3":
        sortByParam = "vote_average.asc";
        break;
      case "4":
        sortByParam = "primary_release_date.desc";
        break;
      case "5":
        sortByParam = "primary_release_date.asc";
        break;
      case "6":
        sortByParam = "title.desc";
        break;
      case "7":
        sortByParam = "title.asc";
        break;
      default:
        sortByParam = "";
        break;
    }

    if (sortByParam) {
      url += `&sort_by=${sortByParam}`;
    }

    const watchProviders = whereToWatchFilter.sections[1].value;

    if (watchProviders && watchProviders.length > 1) {
      const regionCode = watchProviders[0];
      const providersParam = watchProviders.slice(1).join("|");
      url += `&with_watch_providers=${providersParam}&watch_region=${regionCode}`;
    }
    console.log("URL: ", url);

    return url;
  };

  const fetchFilteredMovies = async () => {
    setIsLoading(true);
    const apiUrl = buildApiUrl();
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      setMovies(data.results);
      setIsButtonDisabled(true);
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    setIsButtonDisabled(false);
  }, [sortFilter, whereToWatchFilter, filters]);

  const isInitialMount = useRef(true);

  return (
    <div className={styles.filterPanel_section}>
      <FilterPanel data={sortFilter} setData={setSortFilter} />
      <FilterPanel data={whereToWatchFilter} setData={setWhereToWatchFilter} />
      <FilterPanel data={filters} setData={setFilters} />
      <button
        className={styles.search_button}
        disabled={isButtonDisabled || isLoading}
        onClick={fetchFilteredMovies}
      >
        {isLoading ? "Loading..." : "Search"}
      </button>
    </div>
  );
};

export default MoviesFilters;
