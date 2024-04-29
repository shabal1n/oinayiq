"use client";

import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval, format } from "date-fns";

import useLoginModal from "@/app/hooks/useLoginModal";
import { Order, SafeListings, SafeReservation, SafeUser } from "@/app/types";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/listings/ListingHead";
import ListingInfo from "@/app/components/listings/ListingInfo";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { sports } from "@/app/components/navbar/Sports";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

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
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      range.forEach((date) => {
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
            new Date(reservation.startDate),
            "yyyy-MM-dd"
          );

          if (dateStr === disabledDateStr) {
            dates.push(date);
          }
        }
      });
    });
    return dates;
  }, [reservations]);

  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listings.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);

  const onCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }
    setIsLoading(true);

    let response: Order;
    try {
      const res = await axios.post("/api/reservations", {
        totalPrice: totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        timeSlots: timeSlots,
        listingId: listings?.id,
      });
      setDateRange(initialDateRange);
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
  }, [totalPrice, dateRange, listings?.id, router, currentUser, loginModal]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listings.price) {
        setTotalPrice(dayCount * listings.price);
        // here Artur we need to add the missing dependency, hours are not being updated and inclided in the total price
      } else {
        setTotalPrice(listings.price);
      }
    }
  }, [dateRange, listings.price]);

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
                onChangeDate={(value) => setDateRange(value)}
                onTimeSlotChange={setTimeSlots}
                dateRange={dateRange}
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
