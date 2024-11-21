import { QueryClient } from "@tanstack/react-query";
import { axiosInstance } from "./request";

const defaultQueryFn = async ({ queryKey }: any) => {
	const { data } = await axiosInstance.get(queryKey[0]);
	return data;
};

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn,
			staleTime: 1000 * 60 * 5,
			refetchOnWindowFocus: false,
		},
	},
});
