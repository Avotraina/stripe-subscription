"use server"

import prisma from "../lib/db";

export const getArticlesByWebsite = async (websiteId: string) => {

	const response = await prisma.article.findMany({
		where: {
			websiteId: websiteId
		}
	})

	if (!response) {
		throw new Error("Failed to fetch website");
	}

	return response;
};