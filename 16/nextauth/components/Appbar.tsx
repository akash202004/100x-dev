"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export const Appbar = () => {
  const session = useSession();
  return (
    <div>
      <h1>Appbar</h1>
      <button onClick={() => signIn()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};
