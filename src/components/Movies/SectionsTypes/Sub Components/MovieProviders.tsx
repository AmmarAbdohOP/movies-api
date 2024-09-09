import React, { useEffect, useState } from "react";
import styles from "@/styles/Pages/Movies/SectionsTypes/MovieProviders.module.css";
import ProviderLogo from "./ProviderLogo";

interface MovieProvidersProps {
  region: string;
  onProviderSelectionChange: (selectedProviders: string[]) => void;
}

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

const MovieProviders: React.FC<MovieProvidersProps> = ({
  region,
  onProviderSelectionChange,
}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [selectedProviders, setSelectedProviders] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedProviders([]);
    onProviderSelectionChange([region]);
    const fetchProviders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=${region}`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProviders(data.results);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, [region]);

  const toggleSelect = (id: number) => {
    const newSelectedProviders = selectedProviders.includes(id)
      ? selectedProviders.filter((providerId) => providerId !== id)
      : [...selectedProviders, id];

    setSelectedProviders(newSelectedProviders);

    const updatedProvidersWithRegion = [
      region,
      ...newSelectedProviders.map(String),
    ];

    onProviderSelectionChange(updatedProvidersWithRegion);
  };

  return (
    <div className={styles.movie_providers}>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {providers.length > 0 ? (
        <ul className={styles.providers_list}>
          {providers.map((provider) => (
            <ProviderLogo
              key={provider.provider_id}
              provider={provider}
              isSelected={selectedProviders.includes(provider.provider_id)}
              toggleSelect={toggleSelect}
            />
          ))}
        </ul>
      ) : (
        !loading && <p>No providers available.</p>
      )}
    </div>
  );
};

export default MovieProviders;
