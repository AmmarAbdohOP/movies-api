import React from "react";
import styles from "@/styles/Pages/Movies/SectionsTypes/MovieProviders.module.css";

interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

interface ProviderLogoProps {
  provider: Provider;
  isSelected: boolean;
  toggleSelect: (id: number) => void;
}

const ProviderLogo: React.FC<ProviderLogoProps> = ({
  provider,
  isSelected,
  toggleSelect,
}) => {
  return (
    <li
      className={`${styles.provider_logo_item} ${
        isSelected ? styles.isSelected : ""
      }`}
      onClick={() => toggleSelect(provider.provider_id)}
      title={provider.provider_name}
    >
      <img
        className={styles.provider_logo}
        src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}
        alt={provider.provider_name}
      />
      <div className={styles.overlay}></div>
    </li>
  );
};

export default ProviderLogo;
