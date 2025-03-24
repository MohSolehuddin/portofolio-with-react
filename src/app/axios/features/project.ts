import PagingInterface from "@/lib/interfaces/PagingInterfaces";
import { PortfolioInputSchema } from "@/lib/schema/portfolioSchema";
import axios from "axios";
import { z } from "zod";
import axiosInstance from "../axiosInstance";

export const getProjects = async ({ page, limit }: PagingInterface) => {
  try {
    const response = await axiosInstance.get(
      `/projects?page=${page}&limit=${limit}`
    );
    return response.data;
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

export const createProject = async (
  data: z.infer<typeof PortfolioInputSchema>
) => {
  try {
    const response = await axiosInstance.post(`/projects`, data);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const deleteProjectById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/projects/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const getCountOngoingProject = async () => {
  try {
    const response = await axiosInstance.get(`/projects/ongoing`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const getCountCompletedProject = async () => {
  try {
    const response = await axiosInstance.get(`/projects/completed`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const makeProjectOngoing = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/projects/ongoing/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const makeProjectCompleted = async (id: string) => {
  try {
    const response = await axiosInstance.post(`/projects/completed/${id}`);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};
