import axiosInstance from "@/app/axios/axiosInstance";
import { createErrorLog } from "@/data/errorLog";

export async function POST(req: Request) {
  try {
    const { from, phoneNumber, email, message } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_MY_CONTACT_ID;
    axiosInstance.post(`https://api.telegram.org/bot${token}/sendMessage`, {
      chat_id: chatId,
      text: `From: ${from}\nPhone Number: ${phoneNumber}\nEmail: ${email}\n\nMessage: ${message}`,
    });
    return Response.json(
      { data: "Successfully sending message" },
      { status: 200 }
    );
  } catch (error) {
    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { message: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}
