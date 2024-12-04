"use client"

import { useSession } from "next-auth/react";
import React from "react";
import { useEffect } from "react";

type T_StripePricingTableProps = {
    email?: string,
}

export const StripePricingTable: React.FC<T_StripePricingTableProps> = ({email}) => {

    const { data } = useSession();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.stripe.com/v3/pricing-table.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);


    return React.createElement("stripe-pricing-table", {
        "client-reference-id": data?.user.email,
        "customer-email": data?.user.email,
        "pricing-table-id": "prctbl_1QQV47Ju4zIq0I6FAJBwwcZB",
        "publishable-key": "pk_test_51QNZWkJu4zIq0I6FWqG4NpRVZx1F7wZ0EU9sD0xNBUMYkP38mBenXWd9Sa7UoT2v4dwzDAqjMmvrAL2DJV11zRCZ00F2sxUXxA",
    });
}