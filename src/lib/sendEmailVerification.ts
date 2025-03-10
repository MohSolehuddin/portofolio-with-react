"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function senEmailVerification(
  email: string,
  link: string,
  name: string
) {
  const { data, error } = await resend.emails.send({
    from: "Msytc <onboarding@resend.dev>",
    to: email,
    subject: "Confirm your email",
    html: `
            <div>
              <h1>Hallo, ${name}, Please click link here for verify your email</h1>
              <a href=${link}>Click here to verify</a>
              <br/>
              <br/>
              <br/>
            </div>`,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
