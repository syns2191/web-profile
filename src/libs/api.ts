import { config } from "@/config/app.config";
import { IProfileSkills, IProjectResponse, TProfileResponse } from "./type-api-reponse";
import { TPropsSkills } from "./type";
export const fetchPosts = async () => {
  const API_URL = config.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return [];
  }

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getProfile = async (): Promise<Partial<TProfileResponse>> => {
  const API_URL = config.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return {};
  }

  try {
    const pathUrl = '/api/users/profile';
    const apiUrl = `${API_URL}${pathUrl}`;
    console.log(apiUrl)
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {};
  }
};

export const getProjects = async (userId: string): Promise<IProjectResponse[]> => {
  const API_URL = config.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return [];
  }

  try {
    const pathUrl = `/api/projects/by-user?user=${userId}`;
    const apiUrl = `${API_URL}${pathUrl}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};


export const getSkill = async (userId: string): Promise<IProfileSkills | Partial<IProfileSkills>> => {
  const API_URL = config.NEXT_PUBLIC_API_URL;

  if (!API_URL) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return {};
  }

  try {
    const pathUrl = `/api/users/skills/${userId}`;
    const apiUrl = `${API_URL}${pathUrl}`;
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {};
  }
};
