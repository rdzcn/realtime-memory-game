import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/api/query-client";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
