"use client"

import { CreateWebsite } from "@/app/components/website/CreateWebsite";



export default function NewWebsitePage(
    props?: {
        searchParams: Promise<{ q: string; offset: string }>
    }
) {

    return (
        <div className="m-auto w-full">
            <CreateWebsite />
        </div>
    );
}