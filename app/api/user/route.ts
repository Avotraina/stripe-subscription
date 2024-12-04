import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/db";


export async function GET(req: NextRequest) {

    const userId = req.nextUrl?.searchParams.get("id") ?? undefined;

	const user = await prisma.user.findUnique({
        where: {
            keycloakUserId: userId,
        },
    })
	return NextResponse.json({response: user});
}


export async function PATCH(req: any) {
    const userId = req.nextUrl?.searchParams.get("id");
    if (!userId) {
        return NextResponse.json({error: "wesite id required"});
    }

    const data = await req.json();
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            ... data
        }
    });

	return NextResponse.json({response: "Website updated successfully"});

}