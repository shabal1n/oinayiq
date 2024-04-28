"use client";

import dynamic from "next/dynamic";
import { IconType } from "react-icons";


import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface ListingInfoProps {
  description: string;
  sport:
    | {
        icon: IconType | null;
        label: string;
        description: string;
      }
    | undefined;
  locationValue: string;
  latitude: number;
  longitude: number;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
  description,
  sport,
  locationValue,
  latitude,
  longitude,
}) => {
  const coordinates = [latitude, longitude];

  return (
    <div className="col-span-4 flex flex-col gap-8">
      {sport && (
        <ListingCategory
          icon={sport.icon}
          label={sport.label}
          description={sport.description}
        />
      )}
      <hr />
      <div
        className="
      text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
