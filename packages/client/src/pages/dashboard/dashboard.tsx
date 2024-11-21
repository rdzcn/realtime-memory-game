import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UserForm from "@/components/user-form-modal";
import { fetchCurrentUser } from "@/api/request";
import { Txt } from "@/contexts/text.context";

export default function Dashboard() {
	const [isUserFormOpen, setIsUserFormOpen] = useState(false);
	const { data, error, refetch } = useQuery({
		queryKey: ["/users/current-user"],
		queryFn: fetchCurrentUser,
	});

	const handleUserFormClose = () => {
		refetch();
		setIsUserFormOpen(false);
	};

	return (
		<div className="flex flex-col items-center justify-center h-full w-full relative">
			<h1 className="text-4xl font-bold">Dashboard</h1>
			<p className="mt-4">Welcome to the dashboard</p>
			<div className="absolute top-6 right-6">
				<UserForm
					handleClose={handleUserFormClose}
					open={isUserFormOpen}
					onOpenChange={setIsUserFormOpen}
				/>
			</div>
			{data ? (
				<Txt txtKey="user.loggedInAs" options={{ email: data.email }} />
			) : error ? (
				<div>{error.message}</div>
			) : null}
		</div>
	);
}
