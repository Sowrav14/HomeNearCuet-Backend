import {z} from 'zod';

export const signupValidate = z.object({
    username : z.string().min(6, "Username must be at least 6 characters long"),
    email: z.string().email("Not a valid email"),
    password: z.string().min(8, "Password must be at least 6 characters long"),
    role: z.enum(["user", "owner"]),
});

export const loginValidate = z.object({
    username : z.string().min(6, "Username must be at least 6 characters long"),
    password: z.string().min(8, "Password must be at least 6 characters long"),
    role: z.enum(["user", "owner"]),
});