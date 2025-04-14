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
    const formData = new FormData();
    formData.append("id", data.id || "");
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("isPrivate", data.isPrivate ? "true" : "false");
    formData.append("isShow", data.isShow ? "true" : "false");
    formData.append("linkRepo", data.linkRepo ?? "");
    formData.append("image", data.image ?? "");
    formData.append("started", data.started?.toDateString() ?? "");
    formData.append("ended", data.ended?.toDateString() ?? "");
    const response = await axiosInstance.post(`/projects`, formData);
    return response.data.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
    throw error;
  }
};

export const updateProject = async (
  id: string,
  data: z.infer<typeof PortfolioInputSchema>
) => {
  try {
    const response = await axiosInstance.put(`/projects/${id}`, data);
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
