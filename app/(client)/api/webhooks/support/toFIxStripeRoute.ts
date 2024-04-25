// import { NextApiResponse } from "next";
// import { NextRequest } from "next/server";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-04-10",
// });

// const endpointSecret = process.env.WEBHOOK_SECRET_KEY as string;

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// export async function POST(req: NextRequest, res: NextApiResponse) {
//   console.log("req.headers", req.headers);

//   const buf = await buffer(await req.arrayBuffer);
//   const sig = req.headers["stripe-signature"]!;

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(buf.toString(), sig, endpointSecret);
//   } catch (error) {
//     console.error("API Payment Error: " + error);
//     return res.status(400).send(`Webhook Error: ${error}`);
//   }

//   if (event.type === "checkout.session.completed") {
//     const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
//       (event.data.object as any).id,
//       { expand: ["line-items"] }
//     );
//     const lineItems = sessionWithLineItems.line_items;

//     if (!lineItems) return res.status(500).send("Internal Server Error");

//     try {
//       // Buesiness logic here - need to implement the saving of contact information and send email - MailChimp
//     } catch (error) {}
//   }

//   console.log("Success:" + event.id);
//   res.status(200).end();
// }

// export async function GET(req: NextRequest, res: NextApiResponse) {
//   return res.status(405).send("Only POST requests allowed");
// }
