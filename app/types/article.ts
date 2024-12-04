import { NextRequest } from "next/server";
import { Website as PrismaWebsite } from '@prisma/client'

export type T_CreateArticleRequest = NextRequest & {
    body: {
        name: string;
        status: string;
        websiteId: string;
    }
}

export type T_UpdateArticleRequest = NextRequest & {
    body: {
        name?: string;
        status?: string;
        websiteId?: PrismaWebsite["id"];
    }
}

export type T_GetArticleRequest = NextRequest & {
    body: {
        websiteId: string
    }
}

export type T_Article = {
    id: string;
    name: string;
    status: string;
    websiteId: string;
    createdAt: Date | null;
    updatedAt: Date | null;
}





// import {TaskStatus as PrismaTaskStatus, User as PrismaUser} from "@prisma/client";
// import {NextRequest} from "next/server";
// import {User} from "next-auth";

// export type TaskStatus = {
// 	id: number;
// 	name: string;
// }

// export type Task = {
// 	id: number;
// 	title: string;
// 	user: User;
// 	status: TaskStatus;
// };

// export type CreateTaskRequest = NextRequest & {
// 	body: {
// 		task_name: string;
// 		author: PrismaUser["id"];
// 		status: PrismaTaskStatus["id"];
// 	};
// };

// export type CreateTaskStatusRequest = NextRequest & {
// 	body: {
// 		name: string;
// 	};
// };