import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import RentsClient from "./RentsClient";

const RentsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No sports found"
          subtitle="Looks like you havent reserved any sport."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <RentsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default RentsPage;
