import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function insertUser(
  username: string,
  password: string,
  firstName: string,
  lastName: string
) {
  await prisma.user.create({
    data: {
      username,
      password,
      firstName,
      lastName,
    },
  });
}

// insertUser("albal02004", "password", "Alba", "Lopez");

async function inserTodo(title: string, description: string, userId: number) {
  await prisma.todo.create({
    data: {
      title,
      description,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

// inserTodo("Learn Prisma23", "Learn how to use Prisma222", 2);

async function getTodosAndUser() {
  const todos = await prisma.todo.findMany({
    include: {
      user: true,
    },
  });
  console.log(todos);
}

getTodosAndUser();
