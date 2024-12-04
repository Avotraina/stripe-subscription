import prisma from "@/app/lib/db";
import { T_CreateWebsiteRequest, T_UpdateWebsiteRequest } from "@/app/types/website";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(req: T_CreateWebsiteRequest) {
    const data = await req.json();

    try {
        const result = await prisma.website.create({
            data: data
        });
        return NextResponse.json({ response: result });
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.code }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error occurred' }, { status: 500 });
    }
}

export async function GET() {

    const websites = await prisma.website.findMany()
    return NextResponse.json({ response: websites });
}

export async function PATCH(req: T_UpdateWebsiteRequest) {
    const websiteId = req.nextUrl?.searchParams.get("id");
    if (!websiteId) {
        return NextResponse.json({error: "wesite id required"});
    }

    const data = await req.json();
    await prisma.website.update({
        where: {
            id: websiteId,
        },
        data: {
            ... data
        }
    });

	return NextResponse.json({response: "Website updated successfully"});

}


// export const POST = async (req: T_CreateWebsiteRequest) => {
//     const { name, shopId, apiKey, userId, keyCloakUserId } = await req.json();
//     const website = await prisma.website.create({
//         data: {
//             name,
//             shopId,
//             apiKey,
//             userId,
//             keyCloakUserId
//         },
//     });

//     return NextResponse.json({website})
// }