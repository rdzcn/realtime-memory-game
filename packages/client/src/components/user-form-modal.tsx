// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
	Input,
	Button,
	Dialog,
	DialogContent,
	DialogTrigger,
} from "@/components/ui";
import { Txt } from "@/contexts/text.context";

// Define the validation schema using Zod
const userFormSchema = z.object({
	email: z.string().email("Invalid email format"),
	username: z.string().min(3, "Username must be at least 3 characters long"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
});

type UserFormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
	handleClose: () => void;
	open: boolean;
	onOpenChange: (value: boolean) => void;
}

const UserForm = ({ handleClose, open, onOpenChange }: UserFormProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<UserFormData>({
		resolver: zodResolver(userFormSchema),
	});

	const onSubmit = async (data: UserFormData) => {
		try {
			// Send form data to the backend
			const response = await fetch("http://localhost:5173/users/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			const result = await response.json();

			const { token } = result;
			localStorage.setItem("token", token);
			handleClose();

			if (!response.ok) {
				alert(result.message || "Something went wrong!");
			}
		} catch (error) {
			console.error("Error submitting form:", error);
			alert("An error occurred while submitting the form.");
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogTrigger asChild>
				<Button variant="outline">
					<Txt txtKey="user.createUser" />
				</Button>
			</DialogTrigger>
			<DialogContent className="w-80">
				<div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
					<h2 className="text-2xl font-semibold mb-4 text-center">
						Create an Account
					</h2>

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
						<div>
							<label htmlFor="email" className="block text-sm font-medium">
								<Txt txtKey="shared.email" />
							</label>
							<Input
								type="email"
								id="email"
								placeholder="Enter your email"
								{...register("email")}
								className="mt-2 p-2 border border-gray-300 rounded w-full"
							/>
							{errors.email && (
								<p className="text-red-500 text-sm">{errors.email.message}</p>
							)}
						</div>

						<div>
							<label htmlFor="username" className="block text-sm font-medium">
								<Txt txtKey="shared.username" />
							</label>
							<Input
								type="text"
								id="username"
								placeholder="Enter your username"
								{...register("username")}
								className="mt-2 p-2 border border-gray-300 rounded w-full"
							/>
							{errors.username && (
								<p className="text-red-500 text-sm">
									{errors.username.message}
								</p>
							)}
						</div>

						<div>
							<label htmlFor="password" className="block text-sm font-medium">
								<Txt txtKey="shared.password" />
							</label>
							<Input
								type="password"
								id="password"
								placeholder="Enter your password"
								{...register("password")}
								className="mt-2 p-2 border border-gray-300 rounded w-full"
							/>
							{errors.password && (
								<p className="text-red-500 text-sm">
									{errors.password.message}
								</p>
							)}
						</div>

						<Button
							type="submit"
							className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
						>
							Register
						</Button>
					</form>
				</div>
			</DialogContent>
		</Dialog>
	);
};

export default UserForm;
