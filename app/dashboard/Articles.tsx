"use client"

import React, { useEffect, useState, useTransition } from "react";
import { BlogCard } from "../components/website/Card";
import { Button } from "@/src/components/ui/button";
import { PlusCircle } from "lucide-react";
import { CreateArticle } from "../components/article/CreateArticle";
import { T_Article } from "../types/article";
import { patch } from "../lib/server";
import { showToast } from "../lib/toast";

type ArticleProps = {
    articles: T_Article[],
    websiteId: string,
    articlesProp?: unknown[],
}

export const Articles: React.FC<ArticleProps> = ({ articles, websiteId }) => {

    // const websiteSlug = useParams().websiteSlug;
    const [opened, setOpened] = useState<boolean>(false);

    const [items, setItems] = useState<T_Article[]>(articles)
    const [isPending, startTransition] = useTransition();
    const [idToPend, setIdToPend] = useState<string | null>(null);


    useEffect(() => {
        
    }, []);

    const updateArticleStatus = async (id: string, newStatus: "active" | "disabled") => {
        setIdToPend(id);
        
        startTransition(async () => {
            try {

                const response = await patch(`/api/article?id=${id}`, {
                    status: newStatus
                }).then((res) => {
                    setIdToPend(null);
                })

                const updatedArticles = items.map((article) =>
                    article.id === id ? { ...article, status: newStatus } : article
                );

                setItems(updatedArticles);
                showToast({
                    title: "Article updated successfully!",
                    variant: "destructive"
                });
                

            } catch (error) {
                setIdToPend(null);

                console.log({'error': error});
            }
        })

    }


    return (
        <div className="p-4 space-y-6 m-4">
            <div className="justify-end flex items-center gap-2">
                <Button onClick={() => setOpened(true)} type="submit">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                        New blog
                    </span>
                </Button>
                <CreateArticle opened={opened} close={async () => setOpened(false)} websiteId={websiteId} />
            </div>
            <div className="flex flex-col w-full h-full gap-4">
                {items.map((article, index) => (
                    <BlogCard key={index} article={article} shouldPend={article.id == idToPend ? true: false} changeStatus={updateArticleStatus} customClass="w-full" isPending={isPending}></BlogCard>
                ))}
            </div>
        </div>
    );
};