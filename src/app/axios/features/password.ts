import axios from "axios";
import axiosInstance from "../axiosInstance";

export const resetPassword = async (data: {
  token: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(`/auth/reset-password`, data);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }
};

export const forgotPassword = async (data: { email: string }) => {
  try {
    const response = await axiosInstance.post(`/auth/forgot-password`, data);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }
};

export const updatePassword = async (data: {
  lastPassword: string;
  password: string;
}) => {
  try {
    const response = await axiosInstance.post(`/auth/update-password`, data);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return error.response?.data;
    }
    throw error;
  }
};
