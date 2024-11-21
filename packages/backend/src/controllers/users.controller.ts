import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import prisma from "../prisma";

// Secret key for signing JWTs (store in env file in production)
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// Zod Schema for user creation
const userCreateSchema = z.object({
	email: z.string().email("Invalid email format"),
	password: z.string().min(6, "Password must be at least 6 characters long"),
	username: z.string().min(3, "Username must be at least 3 characters long"),
});

// POST /users/create
const createUser = async (req: Request, res: Response) => {
	try {
		// Validate incoming data using Zod
		const parsedData = userCreateSchema.safeParse(req.body);

		if (!parsedData.success) {
			return res.status(400).json({ errors: parsedData.error.errors });
		}

		const { email, password, username } = parsedData.data;

		// Check if the user already exists
		const existingUser = await prisma.user.findUnique({ where: { email } });
		if (existingUser) {
			return res.status(400).json({ message: "Email is already registered" });
		}

		// Check if the username is already taken
		const existingUsername = await prisma.user.findUnique({
			where: { username },
		});
		if (existingUsername) {
			return res.status(400).json({ message: "Username is already taken" });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the user in the database
		const newUser = await prisma.user.create({
			data: { email, password: hashedPassword, username },
		});

		// Generate a JWT token
		const token = jwt.sign(
			{ id: newUser.id, email: newUser.email, username: newUser.username },
			JWT_SECRET,
			{
				expiresIn: "7d",
			},
		);

		res.status(201).json({ token });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

// GET /users/current-user
const getCurrentUser = async (req: Request, res: Response) => {
	try {
		const userId = req.body.userData.id;
		const user = await prisma.user.findUnique({
			where: { id: Number(userId) },
			select: { id: true, email: true, username: true },
		});

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export const UsersController = {
	// getUsers,
	// getCurrentUser,
	createUser,
	getCurrentUser,
};
