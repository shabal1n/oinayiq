"use client";

import { Range } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";
import TimeSlots from "../inputs/TimeSlots";

interface ListingReservationProps {
  price: number;
  date: Date;
  timeSlots: string[];
  totalPrice: number;
  onChangeDate: (value: Date) => void;
  onTimeSlotChange: (value: string[]) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
  bookedTimeSlots: string[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  onTimeSlotChange,
  price,
  date,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
  bookedTimeSlots,
  timeSlots,
}) => {
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
        value={date}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value)}
      />
      <TimeSlots
        date={date}
        bookedSlots={bookedTimeSlots}
        onTimeSlotChange={(value) => {
          onTimeSlotChange(value);
        }}
        value={timeSlots}
      />
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
