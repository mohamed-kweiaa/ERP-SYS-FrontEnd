import axios from "axios";
import { getSession } from "next-auth/react";
import { toast } from "sonner";
import { handleApiError } from "./handleApiError";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_STRAPI_API_URL,
});

// Request interceptor to add the JWT token to headers
axiosInstance.interceptors.request.use(async (config) => {
    const session = await getSession();
    if (session?.jwt) {
        config.headers.Authorization = `Bearer ${session.jwt}`;
    }
    return config;
});

// Response interceptor to handle errors globally by Koya ^_^
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const errorMessage = handleApiError(error);
        toast.error(errorMessage); // Show error toast automatically
        return Promise.reject(error); // still reject so you can handle it locally if needed
    }
);

export default axiosInstance;