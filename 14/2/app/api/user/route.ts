import { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const body = await req.json();
  await prisma.user.create({
    data:{
      name: body?.name,
      email: body.email,
      password: body.password,
    }
  })

  console.log(body);

  return Response.json({
    message: "You are logged in",
  });
}
