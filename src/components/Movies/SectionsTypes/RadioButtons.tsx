import React from "react";
import styles from "@/styles/Pages/Movies/SectionsTypes/RadioButtons.module.css";

interface RadioButtonsProps {
  values: string[];
  selectedValue: string;
  onChange: (newValue: string) => void;
}

const RadioButtons: React.FC<RadioButtonsProps> = ({
  values,
  selectedValue,
  onChange,
}) => {
  return (
    <div className={styles.radioButtons}>
      <div className={styles.options}>
        {values.map((value, index) => (
          <label key={index} className={styles.option}>
            <input
              type="radio"
              value={index}
              checked={selectedValue === String(index)}
              onChange={() => onChange(String(index))}
            />
            <span className={styles.custom_radio}></span>
            {value}
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButtons;
