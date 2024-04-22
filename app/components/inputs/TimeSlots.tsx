"use client";

import React from "react";

interface TimeSlotsProps {
  onChange: (value: string) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ onChange }) => {
  const handleSelect = (value: string) => {
    onChange(value);
  };

  const renderTimeSlots = () => {
    const slots = [
      "9 AM",
      "10 AM",
      "11 AM",
      "12 PM",
      "1 PM",
      "2 PM",
      "3 PM",
      "4 PM",
      "5 PM",
    ];

    const selectedSlots: string[] = []; // Declare the selectedSlots variable

    return slots.map((slot) => (
      <button
        key={slot}
        className={`${
          selectedSlots.includes(slot)
            ? "bg-blue-500 text-white"
            : "bg-gray-200 text-gray-700"
        } px-4 py-2 rounded-md mr-2 mb-2`}
        onClick={() => handleSelect(slot)}
      >
        {slot}
      </button>
    ));
  };

  return (
    <div className="p-4">
      <div className="font-semibold text-lg mb-2">Time Slots</div>
      <div className="flex flex-wrap">{renderTimeSlots()}</div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
          handleSelect(event.currentTarget.value)
        }
      >
        Confirm Selection
      </button>
    </div>
  );
};

export default TimeSlots;
