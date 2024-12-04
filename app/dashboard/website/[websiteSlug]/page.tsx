import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs";
import { CalendarCheck, Rss, Settings } from "lucide-react";
import { Articles } from "../../Articles";
import { Planifications } from "../../Planifications";
import React, { Suspense } from "react";
import { T_Website } from "@/app/types/website";
import prisma from "@/app/lib/db";
import { WebsiteSettings } from "../../WebsiteSettings";


export default async function DashboardPage(
    // props?: {
    //     searchParams: Promise<{ q: string; offset: string }>
    // }
    props: {
        params: Promise<{
            websiteSlug: string;
        }>
    }
) {

    const param = await props.params;

    let website = await prisma.website.findUnique({
        where: {
            slug: param.websiteSlug,
        }
    });

    const articles = await prisma.article.findMany({
        where: {
            OR: [
                {
                    websiteId: website?.id,
                    status: 'active'
                },
                {
                    websiteId: website?.id,
                    status: 'disabled'
                },
            ]
        }
    });

    const scheduled = await prisma.article.findMany({
        where: {
            websiteId: website?.id,
            status: 'scheduled',
        },
    });

    return (
        <Suspense fallback={<p>Loading ...</p>}>
            <Tabs defaultValue="all" >
                <div className="flex items-center">
                    <TabsList className="w-full flex flex-row gap-4 h-12">
                        <TabsTrigger value="articles" className="flex flex-row gap-2"><Rss />Articles</TabsTrigger>
                        <TabsTrigger value="planifications" className="flex flex-row gap-2"> <CalendarCheck /> Planifications</TabsTrigger>
                        <TabsTrigger value="settings" className="flex flex-row gap-2"><Settings />Settings</TabsTrigger>

                    </TabsList>

                </div>
                <TabsContent value="articles">
                    <Articles websiteId={website?.id as string} articles={articles}></Articles>
                </TabsContent>
                <TabsContent value="planifications">
                    <Planifications articles={scheduled} />
                </TabsContent>
                <TabsContent value="settings">
                    <WebsiteSettings website={website as T_Website}/>
                </TabsContent>
                <TabsContent value="all">
                    {/* <ProductsTable
            products={products}
            offset={newOffset ?? 0}
            totalProducts={totalProducts}
            /> */}
                </TabsContent>
            </Tabs>
        </Suspense>
    );
}