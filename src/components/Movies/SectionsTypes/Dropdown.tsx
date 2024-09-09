import React from "react";
import styles from "@/styles/Pages/Movies/SectionsTypes/Dropdown.module.css";
interface DropdownProps {
  values: string[];
  selectedValue: string;
  onChange: (newValue: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  values,
  selectedValue,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIndex = event.target.selectedIndex;
    onChange(String(selectedIndex));
  };

  return (
    <div className={styles.dropdown}>
      <select
        className={styles.select}
        value={selectedValue}
        onChange={handleChange}
      >
        {values.map((value, index) => (
          <option key={index} value={index}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
