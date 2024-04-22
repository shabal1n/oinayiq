"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import TimeSlots from "../inputs/TimeSlots";
import axios from "axios";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onTimeSlotChange: (value: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
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
}) => {
  const handleTimeSlotChange = async (value: string) => {
    try {
      const response = await axios.post("/api/reserve", { timeSlot: value });
      onTimeSlotChange(value);
    } catch (error) {
      console.error("Error reserving time slot:", error);
    }
  };

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
      <TimeSlots onChange={handleTimeSlotChange} />
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
