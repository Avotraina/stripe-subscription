import prisma from "@/app/lib/db";
import { findUserFromCustomerId } from "@/app/services/users";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const POST = async (req: NextRequest) => {
    const body = (await req.json()) as Stripe.Event;

    switch (body.type) {
        case "checkout.session.completed":
            const checkoutSession = body.data.object as Stripe.Checkout.Session;
            // Handle successful payment
            const stripeCustomerId = checkoutSession.customer;
            const user = await prisma.user.update({
                where: {
                    email: checkoutSession?.customer_email as string
                },
                data: {
                    stripeCustomerId: stripeCustomerId as string,
                    stripeSubscriptionId: checkoutSession?.subscription as string,
                    // stripeInvoiceId: checkoutSession?.invoice as string
                }
            })
            break;

        case "payment_intent.succeeded":
            const paymentIntent = body.data.object as Stripe.PaymentIntent;
            // Handle successful payment intent
            break;

        case "payment_intent.payment_failed":
            const failedPaymentIntent = body.data.object as Stripe.PaymentIntent;
            // Handle failed payment
            break;

        case "customer.subscription.created":
            const subscriptionCreated = body.data.object as Stripe.Subscription;
            // Handle new subscription
            break;

        case "customer.subscription.updated":
            const subscriptionUpdated = body.data.object as Stripe.Subscription;
            // Handle subscription update
            console.log("SUBSCRIPTION UPDATE")

            break;

        case "customer.subscription.deleted":
            const subscriptionDeleted = body.data.object as Stripe.Subscription;
            // Handle subscription cancellation
            const userForSubDeletion = await findUserFromCustomerId(subscriptionDeleted.customer);
            await prisma.user.update({
                where: {
                    email: userForSubDeletion?.email as string
                },
                data: {
                    stripeCustomerId: null,
                    stripeSubscriptionId: null,
                }
            })
            break;

        case "invoice.paid":
            const paidInvoice = body.data.object as Stripe.Invoice;
            // Handle paid invoice
            console.log("INVOICE PAID")

            break;

        case "invoice.payment_succeeded":
            const paymentSucceed = body.data.object as Stripe.Invoice;
            // Handle paid invoice
            console.log("INVOICE PAID")

            break;

        case "invoice.payment_failed":
            const failedInvoice = body.data.object as Stripe.Invoice;
            // Handle failed invoice payment
            break;

        default:
            console.log(`Unhandled event type: ${body.type}`);
            break;
    }
    return NextResponse.json({})

}
