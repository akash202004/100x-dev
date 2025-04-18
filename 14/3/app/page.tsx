// import { PrismaClient } from "@prisma/client";
import client from "../db"


async function getData() {
  try {
    const user1 = await client.user.findFirst({});
    return {
      name: user1?.name,
      email: user1?.email
    };
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const userData = await getData();

  return (
    <div className="flex flex-col justify-center h-screen">
    <div className="flex justify-center">
        <div className="border p-8 rounded">
            <div>
                Name: {userData?.name}
            </div>
            {userData?.email}
        </div>
    </div>
</div>
  );
}
