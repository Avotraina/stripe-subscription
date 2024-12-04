import { ColumnDef } from "@tanstack/react-table";
import { NextRequest } from "next/server";


export type T_CreateWebsiteRequest = NextRequest & {
    body: {
        name: string;
        slug: string;
        shopId: string;
        apiKey: string;
        userId: string;
        keyCloakUserId: string;
    }
}


export type T_UpdateWebsiteRequest = NextRequest & {
    body: {
        name?: string;
        slug?: string;
        shopId?: string;
        apiKey?: string;
        userId?: string;
        keyCloakUserId?: string;
    }
}

export type T_GetWebsiteRequest = NextRequest & {
    body: {
        slug: string 
    }
}

export type T_Website = {
    id: string;
    name: string;
    slug: string;
    shopId: string;
    apiKey: string;
    userId: string;
    keyCloakUserId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}

export const columns: ColumnDef<T_Website>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "shopId",
        header: "shop id",
    },
    {
        accessorKey: "apiKey",
        header: "api key",
    },
]