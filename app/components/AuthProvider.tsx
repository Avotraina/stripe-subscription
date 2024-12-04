"use client";

import { User } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

export const UserContext = React.createContext<User | null>(null);

export const AuthProvider = ({children}: {children: React.ReactNode}) => {
    const {data: session, status} = useSession()
    const router = useRouter()

    useEffect(() => {
        if (status !== "loading" && !session?.user) {
          router.push("/login");
        }
      }, [session, status, router]);

    if (status === "loading") {
        return <div className="my-3">Loading ...</div>;
    }

    if (session?.user) {
        return (
            <UserContext.Provider  value={session.user as User}>
                {children}
            </UserContext.Provider>
        );
    }

}