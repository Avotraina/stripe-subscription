import { stripe } from "../lib/stripe";
import prisma from "../lib/db";
import { redirect } from "next/navigation";
import { get } from "../lib/server";

export async function generateCustomerPortalLink(customerId: string) {
    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`
        });

        return portalSession.url;

    } catch (error) {
        console.log({error: "Portal link generator error"});
        return undefined;
    }
}


export async function consultSubscription() {
}


export async function consultBillingPortal(customerId: string) {
    console.log("RETURN URL", process.env.NEXT_PUBLIC_NEXTAUTH_URL)

    const stripeSession = await stripe.billingPortal.sessions.create({
        customer: customerId as string,
        return_url: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/dashboard`,
        
    })


    redirect(stripeSession.url as string)
}


export async function handleSubscriptionDeletion(customerId: string) {
    const user = await prisma.user.findFirst({
        where: {
            stripeCustomerId: customerId
        }
    })

    await prisma.user.update({
        where: {
            id: user?.id as string
        },
        data: {
            stripeCustomerId: null
        }
    })
}


export async function useHasActiveSubscription(keycloakUserId: unknown) {

    const user = await get(`/api/user?id=${keycloakUserId}`)

    if (typeof keycloakUserId !== "string") {
        return false;
    }

    const subscription = await stripe.subscriptions.retrieve(user?.stripeSubscriptionId as string);

    if (subscription.status === "active") {
        return true;
    }
    return false;
}