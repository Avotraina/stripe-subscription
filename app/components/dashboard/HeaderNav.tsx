"use client";

import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar";
import { generateInitials } from "@/app/services/users";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { User as PrismaUser } from '@prisma/client'
import { useEffect, useState } from "react";
import { get } from "@/app/lib/server";
import { consultBillingPortal } from "@/app/services/stripe";
import React from "react";
import { useRouter } from "next/navigation";


export const HeaderNav = () => {

    const { data, status } = useSession();
    const [user, setUser] = useState<PrismaUser>();
    const router = useRouter();

    useEffect(() => {

        get<PrismaUser>(`/api/user?id=${data?.user.id}`).then((res) => {
            setUser(res);
        });


    }, []);

    const consultSubscription = async () => {
        if (user?.stripeCustomerId) {
            const billingPortal = await consultBillingPortal(user.stripeCustomerId)
        } else {
            router.push('/pricing-table');
        }
    }



    return (
        <div>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
                        <AvatarFallback>{generateInitials(data?.user?.name ?? "")}</AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-2">
                    <DropdownMenuLabel>{data?.user?.name ?? ""}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => consultSubscription()}>My subscriptions</DropdownMenuItem>
                    <DropdownMenuItem className="flex text-red-700" onClick={() => signOut()}>
                        <LogOut />
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}