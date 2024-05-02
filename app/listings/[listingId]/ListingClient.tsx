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

  const disabledHours = useMemo(() => {
    let hours: string[] = [];

    reservations.forEach((reservation: any) => {
      hours = [...hours, ...reservation.timeSlots];
    });

    return hours;
  }, [reservations]);

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
  const [totalPrice, setTotalPrice] = useState(listings.price);
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const handleTimeSlotChange = (slots: string[]) => {
    setTimeSlots(slots);
  };

  const handleTimeSlotDateChange = (value: Date) => {
    const selectedDateStr = format(value, "yyyy-MM-dd");

    const slotsForSelectedDate = reservations.find((reservation) => {
      const reservationDateStr = format(
        new Date(reservation.date),
        "yyyy-MM-dd"
      );
      return reservationDateStr === selectedDateStr;
    })?.timeSlots;

    if (slotsForSelectedDate) {
      setTimeSlots(slotsForSelectedDate);
      console.log("Chnged Date: ", value, " ", slotsForSelectedDate);
    } else {
      setTimeSlots([]);
      console.log("Chnged Date: ", value, "with no timeSlots");
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
        timeSlots: timeSlots,
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
    timeSlots,
  ]);

  useEffect(() => {
    if (date && timeSlots) {
      if (listings.price && timeSlots.length > 0) {
        setTotalPrice((timeSlots.length + 1) * listings.price);
      } else {
        setTotalPrice(listings.price);
      }
    }
  }, [date, listings.price, timeSlots]);

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
                disabled={isLoading}
                disabledDates={disabledDates}
                bookedTimeSlots={disabledHours}
                timeSlots={timeSlots}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
