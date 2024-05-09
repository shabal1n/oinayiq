"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { format } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { Order, SafeListings, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { sports } from "@/app/components/navbar/Sports";

interface ListingClientProps {
  reservations?: SafeReservation[];
  listings: SafeListings & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<ListingClientProps> = ({
  listings,
  reservations = [],
  currentUser,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [bookedTimeSlots, setBookedTimeSlots] = useState<string[]>([]);
  const sport = useMemo(() => {
    const sport = sports.find((sport) => sport.label === listings.sport);

    if (sport) {
      return sport;
    }

    return {
      icon: null,
      label: "",
      description: "",
    };
  }, [listings.sport]);

  const getHoursBeforeNow = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    let hours: string[] = [];

    if (
      date.getDate() === currentDate.getDate() ||
      date.getMonth() === currentDate.getMonth() ||
      date.getFullYear() === currentDate.getFullYear()
    ) {
      for (let i = 0; i <= currentHour; i++) {
        hours.push(i.toString().padStart(2, "0") + ":00");
      }
    }
    return hours;
  };

  const disabledHours = () => {
    let hours: string[] = [];
    const today = new Date();

    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      hours = [...hours, ...getHoursBeforeNow()];
      console.log("For date ", date, " disabled ", hours);
    }
    return hours;
  };

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation: any) => {
      const date = reservation.date;
      const timeSlots = reservation.timeSlots || [];
      const allTimesBooked = [
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
      ].every((time) => timeSlots.includes(time));

      if (allTimesBooked) {
        const dateStr = format(date, "yyyy-MM-dd");
        const disabledDateStr = format(
          new Date(reservation.date),
          "yyyy-MM-dd"
        );

        if (dateStr === disabledDateStr) {
          dates.push(date);
        }
      }
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<string[]>([]);
  const [totalPrice, setTotalPrice] = useState(listings.price);
  const [date, setDate] = useState<Date>(new Date());

  const handleTimeSlotChange = (slot: string[]) => {
    setSelectedTimeSlots(slot);
  };

  const handleTimeSlotDateChange = (value: Date) => {
    const selectedDateStr = format(value, "yyyy-MM-dd");
    setDate(value);
    setBookedTimeSlots([]);

    const reservedSlotsForSelectedDate = reservations.find((reservation) => {
      const reservationDateStr = format(
        new Date(reservation.date),
        "yyyy-MM-dd"
      );
      return reservationDateStr === selectedDateStr;
    })?.timeSlots;

    reservedSlotsForSelectedDate?.push(...disabledHours());
    if (reservedSlotsForSelectedDate) {
      setBookedTimeSlots(reservedSlotsForSelectedDate);
    } else {
      setBookedTimeSlots([]);
    }
  };

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    let response: Order;
    try {
      const res = await axios.post("/api/reservations", {
        totalPrice: totalPrice,
        date: date,
        timeSlots: selectedTimeSlots,
        listingId: listings?.id,
      });
      setDate(new Date());
      response = res.data.payment_order as Order;
      if (response) {
        window.location.href = response.order.checkout_url;
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [
    totalPrice,
    date,
    listings?.id,
    router,
    currentUser,
    loginModal,
    selectedTimeSlots,
  ]);

  useEffect(() => {
    if (date && selectedTimeSlots.length > 0) {
      if (listings.price) {
        setTotalPrice((selectedTimeSlots.length + 1) * listings.price);
      } else {
        setTotalPrice(0);
      }
    }
  }, [date, listings.price, selectedTimeSlots]);

  useEffect(() => {
    handleTimeSlotDateChange(date);
  }, [date, reservations]);

  return (
    <Container>
      <div
        className="
          max-w-screen-lg 
          mx-auto
        "
      >
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listings.title}
            imageSrc={listings.imageSrc}
            locationValue={listings.locationValue}
            sport={sport}
            id={listings.id}
            currentUser={currentUser}
          />
          <div
            className="
              grid 
              grid-cols-1 
              md:grid-cols-7 
              md:gap-10 
              mt-6
            "
          >
            <ListingInfo
              sport={sport}
              description={listings.description}
              locationValue={listings.locationValue}
              latitude={listings.latitude}
              longitude={listings.longitude}
            />
            <div
              className="
                order-first 
                mb-10 
                md:order-last 
                md:col-span-3
              "
            >
              <ListingReservation
                price={listings.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDate(value)}
                onTimeSlotChange={handleTimeSlotChange}
                onTimeSlotDateChange={handleTimeSlotDateChange}
                date={date}
                onSubmit={onCreateReservation}
                disabled={totalPrice === 0 || isLoading}
                disabledDates={disabledDates}
                bookedTimeSlots={bookedTimeSlots}
                timeSlots={selectedTimeSlots}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
