"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

import useSearchModal from "@/app/hooks/useSearchModal";
import useDistricts from "@/app/hooks/useDistricts";

const Search = () => {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const { getByValue } = useDistricts();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const sportValue = params?.get("sport");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }

    return "Anywhere";
  }, [locationValue, getByValue]);

  const sportLabel = useMemo(() => {
    if (sportValue) {
      return sportValue as string;
    }
    return "Any Sport";
  }, [sportValue, getByValue]);

  const durationLabel = useMemo(() => {
    if (startDate) {
      const start = new Date(startDate as string);
      return `${start.getDate()} ${start.toLocaleString("en", {
        month: "short",
      })}`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="
        border-[1px] 
        w-full 
        md:w-auto 
        py-2 
        rounded-full 
        shadow-sm 
        hover:shadow-md 
        transition 
        cursor-pointer
      "
    >
      <div
        className="
          flex 
          flex-row 
          items-center 
          justify-between
        "
      >
        <div
          className="
            text-sm 
            font-semibold 
            px-6
          "
        >
          {locationLabel}
        </div>
        <div
          className="
            hidden 
            sm:block 
            text-sm 
            font-semibold 
            px-6 
            border-x-[1px] 
            flex-1 
            text-center
          "
        >
          {sportLabel}
        </div>
        <div
          className="
            text-sm 
            pl-6 
            pr-2 
            text-gray-600 
            flex 
            flex-row 
            items-center 
            gap-3
          "
        >
          <div className="hidden sm:block">{durationLabel}</div>
          <div
            className="
              p-2 
              bg-violet-600
              rounded-full 
              text-white
            "
          >
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
