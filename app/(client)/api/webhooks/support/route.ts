import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "stream/consumers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-04-10",
});

const endpointSecret = process.env.WEBHOOK_SECRET_KEY as string;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("req.headers", req.headers);
  if (req.method !== "POST") {
    return res.status(405).send("Only POST requests allowed");
  }

  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"]!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
  } catch (error) {
    console.error("API Payment Error: " + error);
    return res.status(400).send(`Webhook Error: ${error}`);
  }

  if (event.type === "checkout.session.completed") {
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      (event.data.object as any).id,
      { expand: ["line-items"] }
    );
    const lineItems = sessionWithLineItems.line_items;

    if (!lineItems) return res.status(500).send("Internal Server Error");

    try {
      // Buesiness logic here - need to implement the saving of contact information and send email - MailChimp
    } catch (error) {}
  }

  console.log("Success:" + event.id);
  res.status(200).end();
}
