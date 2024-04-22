"use client";

import Select from "react-select";

import useDistricts from "@/app/hooks/useDistricts";

export type DistrictSelectValue = {
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface DistrictSelectProps {
  value?: DistrictSelectValue;
  onChange: (value: DistrictSelectValue) => void;
}

const DistrictSelect: React.FC<DistrictSelectProps> = ({ value, onChange }) => {
  const { getAll } = useDistricts();

  return (
    <div>
      <Select
        placeholder="Anywhere"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as DistrictSelectValue)}
        formatOptionLabel={(option: any) => (
          <div
            className="
          flex flex-row items-center gap-3"
          >
            <div>
              {option.label},
              <span className="text-neutral-500 ml-1">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
};

export default DistrictSelect;
