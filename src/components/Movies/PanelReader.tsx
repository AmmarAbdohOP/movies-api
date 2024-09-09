import React from "react";
import Dropdown from "./SectionsTypes/Dropdown";
import { FilterPanelProps } from "./FiltersInterfaces";
import Checkboxes from "./SectionsTypes/Checkboxes";
import RadioButtons from "./SectionsTypes/RadioButtons";
import styles from "@/styles/Pages/Movies/PanelReader.module.css";
import Certification from "./SectionsTypes/Certification";
import CountriesDropDown from "./SectionsTypes/CountriesDropDown";

const PanelReader: React.FC<FilterPanelProps> = ({ data, setData }) => {
  const handleDropDownChange = (sectionIndex: number, newValue: string) => {
    const updatedSections = [...data.sections];
    updatedSections[sectionIndex].value = [newValue];
    setData({ ...data, sections: updatedSections });
    console.log("Hello", data.sections[sectionIndex].value);
  };

  const handleCheckboxChange = (
    sectionIndex: number,
    checkboxIndex: number
  ) => {
    const updatedSections = [...data.sections];
    const updatedValues = [...updatedSections[sectionIndex].value];

    updatedValues[checkboxIndex] =
      updatedValues[checkboxIndex] === "1" ? "0" : "1";

    updatedSections[sectionIndex].value = updatedValues;
    setData({ ...data, sections: updatedSections });

    console.log(data.sections[sectionIndex].value);
  };

  const handleRadioChange = (sectionIndex: number, newValue: string) => {
    const updatedSections = [...data.sections];
    updatedSections[sectionIndex].value = [newValue];
    setData({ ...data, sections: updatedSections });
    console.log(data.sections[sectionIndex].value);
  };

  const handleProviderSelectionChange = (
    sectionIndex: number,
    selectedProviders: string[]
  ) => {
    const updatedSections = [...data.sections];
    updatedSections[sectionIndex].value = selectedProviders;
    setData({ ...data, sections: updatedSections });
    console.log(data.sections[sectionIndex].value);
  };

  return (
    <div>
      {data.sections.map((section, index) => {
        switch (section.type) {
          case "Dropdown":
            return (
              <section className={styles.section} key={index}>
                <label className={styles.label}>{section.label}</label>
                <Dropdown
                  values={section.values}
                  selectedValue={
                    Array.isArray(section.value) ? section.value[0] : ""
                  }
                  onChange={(newValue) => handleDropDownChange(index, newValue)}
                />
              </section>
            );
          case "Checkboxes":
            return (
              <section className={styles.section} key={index}>
                <label className={styles.label}>{section.label}</label>
                <Checkboxes
                  values={section.values}
                  selectedValues={
                    Array.isArray(section.value) ? section.value : []
                  }
                  onChange={(newValues) =>
                    handleCheckboxChange(index, newValues)
                  }
                />
              </section>
            );
          case "RadioButtons":
            return (
              <section className={styles.section} key={index}>
                <label className={styles.label}>{section.label}</label>
                <RadioButtons
                  values={section.values}
                  selectedValue={section.value[0]}
                  onChange={(newValue) => handleRadioChange(index, newValue)}
                />
              </section>
            );
          case "Certification":
            return (
              <section className={styles.section} key={index}>
                <label className={styles.label}>{section.label}</label>
                <Certification />
              </section>
            );
          case "CountriesDropDown":
            return (
              <section className={styles.section} key={index}>
                <label className={styles.label}>{section.label}</label>
                <CountriesDropDown
                  values={section.values}
                  selectedValue={
                    Array.isArray(section.value) ? section.value[0] : ""
                  }
                  onProviderChange={(selectedProviders: string[]) =>
                    handleProviderSelectionChange(index, selectedProviders)
                  }
                />
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};

export default PanelReader;
