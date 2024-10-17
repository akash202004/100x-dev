"use server"
import { NextResponse } from "next/server";
import client from "../../db";

export async function signup(name: string, email: string, password: string) {
  try {
    await client.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
