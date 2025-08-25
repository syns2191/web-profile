import apiClient from "./api-client";
import { IProfileSkills, IProjectResponse, TProfileResponse } from "./type-api-reponse";
export const fetchPosts = async () => {
  try {
    const response = await apiClient.get('/posts'); // Assuming /posts is the endpoint
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
};

export const getProfile = async (): Promise<Partial<TProfileResponse>> => {
  try {
    const response = await apiClient.get('/api/users/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return {};
  }
};

export const getProjects = async (userId: string): Promise<IProjectResponse[]> => {
  try {
    const response = await apiClient.get(`/api/projects/by-user`, { params: { user: userId } });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};


export const getSkill = async (userId: string): Promise<IProfileSkills | Partial<IProfileSkills>> => {
  try {
    const response = await apiClient.get(`/api/users/skills/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching skills:", error);
    return {};
  }
};
