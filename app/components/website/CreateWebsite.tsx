import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "next-auth/react";
import { SubmitButton } from "../SubmitButton";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/app/lib/toast";
import { useHasActiveSubscription } from "@/app/services/stripe";

const formSchema = z.object({
    name: z.string().min(5, {
        message: "Name must be at least 5 characters"
    }).max(50, {
        message: "Name must be less than 50 characters"
    }),
    apiKey: z.string().min(5, {
        message: "Api key must be at least 5 characters"
    }).max(200, {
        message: "Api key must be less than 200 characters"
    }),
})

export const CreateWebsite = () => {

    const { data: session, status } = useSession();
    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            apiKey: ""
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const hasSubscription = await useHasActiveSubscription(session?.user.keyCloakUserId);

        if (!hasSubscription) {
            router.push("/pricing-table")
            showToast({
                title: "You need to subscribe to create article!",
            });
            return;
        }

        const timestamp = Date.now().toString();

        startTransition(async () => {
            try {
                const response = await fetch("/api/website", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: values.name,
                        slug: generateSlug(values.name),
                        shopId: `${generateSlug(values.name)}-${timestamp}`,
                        apiKey: values.apiKey,
                        userId: "dsfaf",
                        keyCloakUserId: (session as any).token.sub || (session as any)?.token?.providerAccountId,

                    }),
                });

                const website = await response.json();

                if (!response.ok) {
                    if (website?.error === 'P2002') {
                        setServerError('Name already taken')
                    }
                    throw new Error(`Failed to create website: ${response.statusText}`);
                }
                showToast({
                    title: "Website created successfully!",
                  });
                router.push('/dashboard');
                router.refresh();
            } catch (error) {
                if (error === 'P2002') {
                    setServerError('Name already taken')
                }
                console.error("Error during submission:", error);
            }
        });


    }

    function generateSlug(url: string) {

        try {
            const parsedUrl = new URL(url);
            const hostname = parsedUrl.hostname;

            const parts = hostname.split('.');

            if (parts.length > 2) {

                return `${parts[parts.length - 2]}`;

            } else if (parts.length === 2) {

                return `${parts[0]}`;

            } else {

                return '';

            }

        } catch (error) {
            console.error("Invalid URL:", error instanceof Error ? error.message : error);
            return '';
        }
    }

    return (
        <Card className="m-auto w-2/4">
            <CardHeader>
                <CardTitle>Create website</CardTitle>
            </CardHeader>

            <CardContent>
                <div className="my-4 text-red-800">
                    <span className="">{serverError}</span>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="apiKey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API Key</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcm" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <SubmitButton isPending={isPending} />
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}