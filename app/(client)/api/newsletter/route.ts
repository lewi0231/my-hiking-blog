import { NextResponse } from "next/server";

import {
  newsletterSchema,
  validateFormData,
} from "@/app/utils/validation-helper";
import mailchimp from "@mailchimp/mailchimp_marketing";
import md5 from "md5";

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: process.env.MAILCHIMP_SERVER_PREFIX,
});

export async function POST(request: Request) {
  const data = await request.json();

  const errors = await validateFormData(data, newsletterSchema);
  if (errors) {
    return NextResponse.json({ ...errors });
  }

  const { email, name } = data;
  const emailHash = md5(email);

  const response = await mailchimp.lists.setListMember(
    "9083190169",
    emailHash,
    {
      email_address: email,
      status_if_new: "subscribed",
      merge_fields: {
        FNAME: name,
      },
    }
  );

  return NextResponse.json({
    ...data,
  });
}
