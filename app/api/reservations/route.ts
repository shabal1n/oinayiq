import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import createOrder from "@/app/actions/createOrder";
import { Order } from "@/app/types";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { listingId, startDate, endDate, totalPrice, timeSlots } = body;

  if (!listingId || !startDate || !endDate || !totalPrice || !timeSlots) {
    return NextResponse.error();
  }

  const payment_order = await createOrder<Order>({
    amount: totalPrice,
    description: "Payment for sport center reservation",
    back_url: `https://${request.headers.get("host")}/listings/${listingId}`,
    success_url: `https://${request.headers.get("host")}/rents`,
    failure_url: `https://${request.headers.get("host")}/listings/${listingId}`,
  });

  const listingAndReservation = await prisma.listings.update({
    where: {
      id: listingId,
    },
    data: {
      reservations: {
        create: {
          userId: currentUser.id,
          startDate,
          endDate,
          totalPrice,
          orderId: payment_order.order.id.trim(),
          timeSlots,
        },
      },
    },
  });

  payment_order.order.checkout_url += "?autoRedirectMs=5000";

  return NextResponse.json({ payment_order, listingAndReservation });
}
