"use client"

import React from "react";
import { StripePricingTable } from "../components/subscription/StripePricingTable";


export default function PricingTable() {

  return (
      <div className="w-screen h-screen content-center m-auto p-8 space-y-6 rounded-lg shadow-md">
        <StripePricingTable />
      </div>
  )

};

// export 