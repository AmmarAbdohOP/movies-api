import React from "react";
import styles from "@/styles/Pages/Movies/SectionsTypes/Checkboxes.module.css";

interface CheckboxesProps {
  values: string[];
  selectedValues: string[];
  onChange: (checkboxIndex: number) => void;
}

const Checkboxes: React.FC<CheckboxesProps> = ({
  values,
  selectedValues,
  onChange,
}) => {
  return (
    <div className={styles.checkboxes}>
      <div className={styles.options}>
        {values.map((value, index) => (
          <label key={index} className={styles.option}>
            <input
              type="checkbox"
              value={value}
              checked={selectedValues[index] === "1"}
              onChange={() => onChange(index)}
            />
            <span className={styles.custom_checkbox}></span>
            {value}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Checkboxes;
