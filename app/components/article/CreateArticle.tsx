import { showToast } from "@/app/lib/toast";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SubmitButton } from "../SubmitButton";
import refetchForServer from "@/app/services/refetchServer";
import { useHasActiveSubscription } from "@/app/services/stripe";

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Name must be at least 2 characters"
    }).max(50, {
        message: "Name must be less than 50 characters"
    }),
})

type createArticleProps = {
    websiteId: string,
    opened: boolean,
    close: () => {}
}

export const CreateArticle: React.FC<createArticleProps> = ({ websiteId, opened, close }: createArticleProps) => {

    const [isPending, startTransition] = useTransition();
    const [serverError, setServerError] = useState<string | null>(null);
    const {data: session } = useSession();
    const router = useRouter()



    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
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

        startTransition(async () => {
            try {
                const response = await fetch("/api/article", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: values.name,
                        status: 'scheduled',
                        websiteId: websiteId,

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
                    title: "Article created successfully!",
                });
                form.reset();
                setServerError(null);
                if (website) {
                    close();
                    refetchForServer('/dashboard/website/[websiteId]');
                }
            } catch (error) {
                if (error == 'P2002') {
                    setServerError('Name already taken')
                }

                console.log("Error during submission:", error);
            }
        });

    }

    return (
        <Dialog open={opened} onOpenChange={close}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create new blog</DialogTitle>
                </DialogHeader>
                {serverError ? (
                    <div className="my-4 text-red-800">
                        <span className="">{serverError}</span>
                    </div>
                ) : <></>}

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

                        <DialogFooter>
                            <SubmitButton isPending={isPending} />
                        </DialogFooter>

                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    );
}
