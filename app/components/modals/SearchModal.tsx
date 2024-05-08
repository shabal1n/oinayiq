"use client";

import qs from "query-string";
import dynamic from "next/dynamic";
import { FieldValues, useForm } from "react-hook-form";
import { useCallback, useMemo, useState } from "react";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { sports } from "@/app/components/navbar/Sports";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Calendar from "../inputs/Calendar";
import DistrictSelect, { DistrictSelectValue } from "../inputs/DistrictSelect";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";

enum STEPS {
  LOCATION = 0,
  SPORT = 1,
  DATE = 2,
}

const SearchModal = () => {
  const router = useRouter();
  const searchModal = useSearchModal();
  const params = useSearchParams();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<DistrictSelectValue>();
  const [date, setDate] = useState<Date>(new Date());

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      sport: "",
      location: null,
      imageSrc: "",
      price: 1,
      title: "",
      description: "",
    },
  });

  const sport = watch("sport");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.DATE) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      sport: sport,
    };

    if (date) {
      updatedQuery.date = formatISO(date);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(STEPS.LOCATION);
    searchModal.onClose();
    router.push(url);
  }, [step, searchModal, location, router, sport, date, onNext, params]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.DATE) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna play?"
        subtitle="Find the perfect location!"
      />
      <DistrictSelect
        value={location}
        onChange={(value) => setLocation(value as DistrictSelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );

  if (step === STEPS.DATE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDate(value)}
          value={date}
        />
      </div>
    );
  }

  if (step === STEPS.SPORT) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Which of these best describes your place?"
          subtitle="Pick a sport"
        />
        <div
          className="
          grid 
          grid-cols-1 
          md:grid-cols-2 
          gap-3
          max-h-[50vh]
          overflow-y-auto
        "
        >
          {sports &&
            sports.map((item) => (
              <div key={item.label} className="col-span-1">
                <CategoryInput
                  onClick={(sport) => setCustomValue("sport", sport)}
                  selected={sport === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={searchModal.onClose}
      body={bodyContent}
    />
  );
};

export default SearchModal;
