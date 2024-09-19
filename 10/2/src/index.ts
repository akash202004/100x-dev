import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function insertUser(
  email: string,
  firstName: string,
  lastName: string,
  password: string
) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const res = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPassword,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
      },
    });
    console.log("User created successfully");
    console.log(res);
  } catch (error) {
    console.error("Error creating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// insertUser("maaa@gmail.com", "Akash", "Laha", "123456");

interface firstLast {
  firstName: string;
  lastName: string;
}

async function updateUser(email: string, { firstName, lastName }: firstLast) {
  try {
    const update = await prisma.user.update({
      where: { email: email },
      data: { firstName, lastName },
      select: { firstName: true, lastName: true },
    });
    console.log("User updated successfully");
    console.log(update);
  } catch (error) {
    console.error("Error Updating user:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// updateUser("maaa@gmail.com", { firstName: "Ram", lastName: "Kaku" });

async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, firstName: true, lastName: true },
    });
    console.log("User found successfully");
    console.log(user);
  } catch (error) {
    console.log("Error getting user:", error);
  }
}

getUser("maaa@gmail.com");
