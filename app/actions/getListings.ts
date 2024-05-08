import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  sport?: string;
  date?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const { userId, sport, locationValue, date } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (sport) {
      query.sport = sport;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    //TODO: Add filter by busy date

    // if (date) {
    //   query.NOT = {
    //     reservations: {
    //       some: {
    //         OR: [
    //           {
    //             date: { gte: startDate },
    //             startDate: { lte: startDate },
    //           },
    //           {
    //             startDate: { lte: endDate },
    //             endDate: { gte: endDate },
    //           },
    //         ],
    //       },
    //     },
    //   };
    // }

    const listings = await prisma.listings.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listings) => ({
      ...listings,
      createdAt: listings.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
