import { T_Article } from "@/app/types/article";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Loader2 } from "lucide-react";
import React from "react";
import DOMPurify from "dompurify"
import htmlContent from "@/public/html.json"
import { ScrollArea } from "@/src/components/ui/scroll-area";

type BlogCardProps = {
    article: T_Article;
    changeStatus: (id: string, newStatus: "active" | "disabled") => {},
    shouldPend: boolean,
    isPending: boolean,
    id?: string;
    customClass?: string
}

export const BlogCard: React.FC<BlogCardProps> = ({ article, changeStatus, isPending, shouldPend, customClass }) => {

    const rawHTML = htmlContent.content;
    
    const updateArticleStatus = (id: string, newStatus: "active" | "disabled") => {
        changeStatus(id, newStatus);
    }

    return (
        <Card className={`${customClass} h-full`}>
            <CardHeader>
                <CardTitle>{article.name}</CardTitle>
                <CardDescription>status: {article.status}</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
                <ScrollArea className="h-full w-full rounded-md border p-4">
                    <div className="h-5" dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(rawHTML)}}>

                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter>
                {/* <Button type="button" onClick={() => updateArticleStatus(article.id, 'active')}>Deactivates</Button> */}
                {/* <Button disabled variant="destructive">
                    <Loader2 className="animate-spin" />
                    Please wait
                </Button> */}
                <Button id={article.id} disabled={isPending && shouldPend} variant={article.status === 'active' ? 'destructive' : 'default'} onClick={() => updateArticleStatus(article.id, article.status === 'disabled' ? 'active' : 'disabled')}>
                    {isPending && shouldPend ? (
                        <Loader2 className="animate-spin" />
                    ) : (<></>)}

                    {article.status === 'disabled' ? 'Activate' : 'Deactivate'}
                </Button>

            </CardFooter>
        </Card>
    );
}