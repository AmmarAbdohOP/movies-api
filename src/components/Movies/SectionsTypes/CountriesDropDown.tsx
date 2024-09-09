import React, { useState } from "react";
import styles from "@/styles/Pages/Movies/SectionsTypes/CountriesDropDown.module.css";
import MovieProviders from "./Sub Components/MovieProviders";

interface CountriesDropDownProps {
  values: string[];
  selectedValue: string;
  onProviderChange: (selectedProviders: string[]) => void;
}

const CountriesDropDown: React.FC<CountriesDropDownProps> = ({
  values,
  selectedValue,
  onProviderChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const defaultCountry = "Jordan*JO";
  const initialCountry =
    values.find((value) => value.includes(selectedValue)) || defaultCountry;

  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(
    initialCountry.split("*")[1]
  );
  const [selectedCountryName, setSelectedCountryName] = useState<string>(
    initialCountry.split("*")[0]
  );

  const handleOptionClick = (countryName: string, countryCode: string) => {
    setSelectedCountryCode(countryCode);
    setSelectedCountryName(countryName);
    setIsOpen(false);
    // Reset provider selection and set the country code as the first element
    onProviderChange([countryCode]);
  };

  return (
    <div className={styles.CountriesDropDown}>
      <div className={styles.selected} onClick={() => setIsOpen(!isOpen)}>
        <img
          src={`https://flagcdn.com/16x12/${selectedCountryCode.toLowerCase()}.png`}
          alt={selectedCountryName}
          className={styles.flag}
        />
        {selectedCountryName}
      </div>
      {isOpen && (
        <ul className={styles.dropdown}>
          {values.map((value, index) => {
            const [countryName, countryCode] = value.split("*");
            return (
              <li
                key={index}
                onClick={() => handleOptionClick(countryName, countryCode)}
                className={styles.option}
              >
                <img
                  src={`https://flagcdn.com/16x12/${countryCode.toLowerCase()}.png`}
                  alt={countryName}
                  className={styles.flag}
                />{" "}
                {countryName}
              </li>
            );
          })}
        </ul>
      )}
      <MovieProviders
        region={selectedCountryCode}
        onProviderSelectionChange={onProviderChange}
      />
    </div>
  );
};

export default CountriesDropDown;
