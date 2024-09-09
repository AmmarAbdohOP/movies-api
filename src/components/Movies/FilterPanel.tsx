import React, { useEffect, useState } from "react";
import styles from "@/styles/Pages/Movies/FilterPanel.module.css";
import { FilterPanelProps } from "./FiltersInterfaces";
import PanelReader from "./PanelReader";

const FilterPanel: React.FC<FilterPanelProps> = ({ data, setData }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data.type === "Filters") {
      setIsOpen(true);
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles.filterPanel}>
      <div className={styles.header} onClick={toggleDropdown}>
        <span>{data.type}</span>
        {data.isInfo && <span className={styles.infoInput}>{data.info}</span>}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={styles.content}>
          <PanelReader data={data} setData={setData} />
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
