import prisma from "@/app/libs/prismadb";
import { PaymentWebhook } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (req.method === "POST") {
    if (!req.body) {
      return NextResponse.error();
    }

    let paymentStatus: PaymentWebhook;
    if (req.body instanceof ReadableStream) {
      const reader = req.body.getReader();
      const result = await reader.read();
      const decoder = new TextDecoder("utf-8");
      const jsonData = decoder.decode(result.value);
      paymentStatus = JSON.parse(jsonData);
    } else {
      paymentStatus = req.body as PaymentWebhook;
    }

    console.log(`Body: ${JSON.stringify(paymentStatus, null, 2)}`);
    console.log(
      `Received payment status: ${paymentStatus.event} for order ${paymentStatus.order.id}`
    );
    try {
      await changeStatus(paymentStatus.order.id, paymentStatus.event);
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }

    return NextResponse.json({ message: "Payment status updated" });
  }
  return NextResponse.error();
}

async function changeStatus(orderId: string, event: string) {
  if (event === "PAYMENT_CAPTURED") {
    const tmp = await prisma.reservations.findUnique({
      where: {
        orderId: orderId.trim(),
      },
    });
    try {
      const updatedReservation = await prisma.reservations.update({
        where: {
          orderId: orderId.trim(),
        },
        data: {
          isPaid: true,
        },
      });
      console.log(`Reservation ${JSON.stringify(updatedReservation)} is paid`);
    } catch (error) {
      console.error("Error: ", error);
    }
  } else if (event === "PAYMENT_CANCELLED") {
    try {
      const updatedReservation = await prisma.reservations.update({
        where: {
          orderId: orderId.trim(),
        },
        data: {
          isPaid: false,
        },
      });
      console.log(`Reservation ${updatedReservation} is cancelled`);
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}
