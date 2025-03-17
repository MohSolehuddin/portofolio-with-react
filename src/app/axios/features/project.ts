import PagingInterface from "@/lib/interfaces/PagingInterfaces";
import axios from "axios";
import axiosInstance from "../axiosInstance";

export const getProjects = async ({ page, limit }: PagingInterface) => {
  try {
    const response = await axiosInstance.get(
      `/projects?page=${page}&limit=${limit}`
    );
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const getProjectById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/projects/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};
