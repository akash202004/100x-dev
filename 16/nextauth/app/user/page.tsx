import { Appbar } from "@/components/Appbar";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/next";

export default async function () {
  const session = await getServerSession(authOptions);

  return (
    <div>
        <Appbar/>
      User component
      {JSON.stringify(session)}
    </div>
  );
}
