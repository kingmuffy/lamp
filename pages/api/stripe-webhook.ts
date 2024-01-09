import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import prisma from "@/libs/prismadb"; // Adjust this import to match your project structure

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2022-11-15",
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];

  if (!sig) {
    return res.status(400).send("Missing the Stripe signature");
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed: ");
    return res.status(400).send("Webhook Error");
  }

  try {
    switch (event.type) {
      case "charge.succeeded":
        const charge = event.data.object as Stripe.Charge;

        if (typeof charge.payment_intent === "string") {
          // Update the order status in your database
          await prisma.order.update({
            where: { paymentIntentId: charge.payment_intent },
            data: {
              status: "complete",
              // Other fields you might want to update
            },
          });
        }
        break;
      // Handle other event types as needed
      default:
        console.log("Unhandled event type: ", event.type);
    }

    // Return a response to acknowledge receipt of the event
    res.json({ received: true });
  } catch (dbError) {
    console.error(`Error processing event ${event.type}: `, dbError);
    res.status(500).send(`Error processing Stripe event`);
  }
}
