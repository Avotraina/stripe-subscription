"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { SubmitButton } from "../components/SubmitButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { T_Website } from "../types/website";
import { useState, useTransition } from "react";
import { patch } from "../lib/server";
import { showToast } from "../lib/toast";
import { useRouter } from "next/navigation";

type SettingProps = {
    website: T_Website,
}

const formSchema = z.object({
    apiKey: z.string().min(5, {
        message: "API Key must be at least 5 characters"
    }).max(50, {
        message: "API Key must be less than 50 characters"
    }),
    shopId: z.string().optional(),
})

export const WebsiteSettings: React.FC<SettingProps> = ({ website }) => {

    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter()


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            apiKey: website.apiKey,
            shopId: website.shopId
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        startTransition(async () => {
            try {

                const response = await patch(`/api/website?id=${website.id}`, {
                    apiKey: values.apiKey
                }).then((res) => {

                })
                
                showToast({
                    title: "Website updated successfully!",
                });

                router.refresh()
            } catch (error) {
                console.log({'error': error});
            }
        })
    }


    return (
        <Card className="m-auto w-2/4">
            <CardHeader>
                <CardTitle>Settings</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="my-4 text-red-800">
                    <span className="">{serverError}</span>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="shopId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Shop ID</FormLabel>
                                    <FormControl>
                                        <Input id="apiKey" placeholder="shadcm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                            disabled
                        />

                        <FormField
                            control={form.control}
                            name="apiKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API Key</FormLabel>
                                    <FormControl>
                                        <Input onClick={() => {
                                            const input = document.getElementById("apiKey") as HTMLInputElement;
                                            if (input) {
                                                navigator.clipboard.writeText(input.value);
                                            }
                                        }} id="apiKey" placeholder="shadcm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>

                            )}
                        />

                        <SubmitButton label={"Edit"} isPending={isPending} />

                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
