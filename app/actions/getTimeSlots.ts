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
        startDate: {
          lte: date,
        },
        endDate: {
          gte: date,
        },
      },
    });

    const timeSlots = reservations.map((reservation) => ({
      startDate: reservation.startDate.toISOString(),
      endDate: reservation.endDate.toISOString(),
    }));

    return timeSlots;
  } catch (error: any) {
    throw new Error(error);
  }
}
