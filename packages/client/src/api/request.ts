import axios from "axios";
import type { AxiosRequestConfig } from "axios";
import type { UserData } from "@@types/index";

// Create an Axios instance
export const axiosInstance = axios.create({
	baseURL: "http://localhost:5173",
	timeout: 60000,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
		"Content-Type": "application/json",
	},
});

// Request interceptor to add Bearer token
axiosInstance.interceptors.request.use(
	(config) => {
		if (config.url && !config.url.includes("users/create")) {
			const token = localStorage.getItem("token");
			if (token) {
				config.headers.Authorization = `Bearer ${token}`;
			}
		}
		return config;
	},
	(error): Promise<unknown> => {
		return Promise.reject(error);
	},
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
	async (response) => {
		const responseData = response.data;
		const requestUrl = response.config.url;

		if (requestUrl?.includes("/users/create")) {
			localStorage.setItem("token", responseData.token);
		}
		return responseData;
	},

	async (error): Promise<unknown> => {
		if (!error?.response) {
			throw error;
		}
		if (
			error.response.status === 401 &&
			!error.config.url.includes("/users/create")
		) {
			localStorage.removeItem("token");
			window.location.href = "/login";
			return;
		}
		return Promise.reject({
			data: error.response.data,
			status: error.response.status,
			statusText: error.response.statusText,
		});
	},
);

//REQUESTS
export const sendRequest = <T, R>(config: AxiosRequestConfig) => {
	return axiosInstance.request<T, R>(config);
};

export function sendGetJson<T, R>(path: string) {
	return sendRequest<T, R>({
		url: path,
		method: "get",
	});
}

export function sendPostJson<T, R>(path: string, data?: unknown) {
	return sendRequest<T, R>({
		url: path,
		method: "post",
		data: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json",
		},
	});
}

//API CALLS
export function fetchCurrentUser() {
	return sendGetJson<unknown, UserData>("/users/current-user");
}
