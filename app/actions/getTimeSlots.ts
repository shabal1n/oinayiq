import prisma from "@/app/libs/prismadb";

interface IParams {
  listingId?: string;
  date: Date;
}

export default async function getTimeSlots(params: IParams) {
  try {
    const { listingId, date } = params;

    const reservations = await prisma.reservations.findMany({
      where: {
        listingId,
        date: {
          equals: date,
        },
      },
    });

    const timeSlots = reservations.map((reservation) => ({
      date: reservation.date.toISOString(),
    }));

    return timeSlots;
  } catch (error: any) {
    throw new Error(error);
  }
}
