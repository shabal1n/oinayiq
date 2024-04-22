import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";
import { defaultHandler } from "ra-data-simple-prisma";

const getHandler = async (req: Request) => {
  const body = await req.json();
  const result = await defaultHandler(body, prisma);
  return NextResponse.json(result);
};

const postHandler = async (req: Request) => {
  const body = await req.json();
  const result = await defaultHandler(body, prisma);
  return NextResponse.json(result);
};

export { getHandler as GET, postHandler as POST };
