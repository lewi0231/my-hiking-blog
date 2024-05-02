import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// TODO - I probably won't need this for this use case.
export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verfication?token=${token}`;
};
