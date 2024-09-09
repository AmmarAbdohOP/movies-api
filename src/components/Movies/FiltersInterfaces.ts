export interface Section {
  label: string;
  type: string;
  values: string[];
  value: string[];
}

export interface FilterPanelData {
  type: string;
  isInfo: boolean;
  info: string;
  sections: Section[];
}

export interface FilterPanelProps {
  data: FilterPanelData;
  setData: React.Dispatch<React.SetStateAction<FilterPanelData>>;
}
