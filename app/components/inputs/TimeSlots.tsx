"use client";

import React, { useState } from "react";

interface TimeSlotsProps {
  date: Date | undefined;
  bookedSlots: string[];
  value: string[];
  onTimeSlotChange: (value: string[]) => void;
}

const TimeSlots: React.FC<TimeSlotsProps> = ({ bookedSlots = [] }) => {
  const [selectedSlots, setSelectedSlots] = useState<string[]>([]);

  const handleSelect = (slot: string) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const renderTimeSlots = () => {
    const slots = [
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ];

    return slots.map((slot) => (
      <button
        key={slot}
        className={`${
          selectedSlots.includes(slot)
            ? "bg-gray-500 text-white"
            : bookedSlots.includes(slot)
            ? "bg-gray-100 text-gray-400"
            : "bg-transparent text-black border border-gray-500"
        } px-4 py-2 rounded-md mr-2 mb-2`}
        onClick={() => handleSelect(slot)}
        disabled={bookedSlots.includes(slot)}
      >
        {slot}
      </button>
    ));
  };

  return (
    <div className="p-4">
      <div className="font-semibold text-lg mb-2">Time Slots</div>
      <div className="flex flex-wrap">{renderTimeSlots()}</div>
    </div>
  );
};

export default TimeSlots;
