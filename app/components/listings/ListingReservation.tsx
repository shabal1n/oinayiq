"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import TimeSlots from "../inputs/TimeSlots";
import axios from "axios";
import { useState } from "react";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onTimeSlotChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  bookedTimeSlots: string[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  onTimeSlotChange,
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  bookedTimeSlots,
}) => {
  const handleTimeSlotChange = async (value: string) => {
    try {
      const response = await axios.post("/api/reserve", { timeSlot: value });
      onTimeSlotChange(value);
    } catch (error) {
      console.error("Error reserving time slot:", error);
    }
  };

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedSlots, setBookedSlots] = useState([]);

  return (
    <div
      className="
      bg-white 
        rounded-xl 
        border-[1px]
      border-neutral-200 
        overflow-hidden
      "
    >
      <div
        className="
      flex flex-row items-center gap-1 p-4"
      >
        <div className="text-2xl font-semibold">₸ {price}</div>
        <div className="font-light text-neutral-600">/hour</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <TimeSlots date={dateRange.startDate} bookedSlots={bookedTimeSlots} />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div
        className="
          p-4 
          flex 
          flex-row 
          items-center 
          justify-between
          font-semibold
          text-lg
        "
      >
        <div>Total</div>
        <div>₸ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
