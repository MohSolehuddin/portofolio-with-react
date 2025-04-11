import axiosInstance from "@/app/axios/axiosInstance";
import { createErrorLog } from "@/data/errorLog";
import { MAX_SEND_MESSAGE_PER_30_SECONDS } from "@/lib/constants";
import { isLimit } from "@/lib/utils/rateLimiter";
import axios from "axios";

export async function POST(req: Request) {
  try {
    const isSendingMessageLimit = await isLimit(
      MAX_SEND_MESSAGE_PER_30_SECONDS
    );
    if (isSendingMessageLimit)
      return Response.json(
        {
          error: "Sending message limit exceeded, please try 30 seconds later",
        },
        { status: 400 }
      );

    const { from, phoneNumber, email, message } = await req.json();

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_MY_CONTACT_ID;

    await axiosInstance.post(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        chat_id: chatId,
        text: `From: ${from}\nPhone Number: ${phoneNumber}\nEmail: ${email}\n\nMessage: ${message}`,
      }
    );

    return Response.json(
      { message: "Successfully sending message" },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.code === "ETIMEDOUT") {
      const createdError = await createErrorLog("Timeout: " + error.message);

      return Response.json(
        {
          error: "Request to Telegram timed out. Please try again later.",
          requestId: createdError?.id,
        },
        { status: 504 }
      );
    }

    const createdError = await createErrorLog(JSON.stringify(error));
    return Response.json(
      { error: "Something went wrong", requestId: createdError?.id },
      { status: 500 }
    );
  }
}
