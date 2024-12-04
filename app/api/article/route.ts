import prisma from "@/app/lib/db";
import { T_CreateArticleRequest, T_UpdateArticleRequest } from "@/app/types/article";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function POST(req: T_CreateArticleRequest) {
    const data = await req.json();

    try {
        const result = await prisma.article.create({
            data: data
        });
        return NextResponse.json({ response: result });
    } catch (error: unknown) {
        if (error instanceof PrismaClientKnownRequestError) {
            return NextResponse.json({ error: error.code }, { status: 500 });
        }
        return NextResponse.json({ error: 'Unknown error occurred:' + error }, { status: 500 });
    }
}

export async function GET() {

	const articles = await prisma.article.findMany({
        select: {
            id: true
        }
    })
	return NextResponse.json({response: articles});
}

export async function PATCH(req: T_UpdateArticleRequest) {
    const articleId = req.nextUrl?.searchParams.get("id");
    if (!articleId) {
        return NextResponse.json({error: "article id required"});
    }

    const data = await req.json();
    await prisma.article.update({
        where: {
            id: articleId,
        },
        data: {
            ... data
        }
    });

	return NextResponse.json({response: "Article updated successfully"});

}