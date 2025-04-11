import { ContactSchema } from "@/lib/schema/contactSchema";
import axios from "axios";
import { z } from "zod";
import axiosInstance from "../axiosInstance";

export const sendMessage = async (data: z.infer<typeof ContactSchema>) => {
  try {
    const response = await axiosInstance.post(`/messages`, data);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }
};
