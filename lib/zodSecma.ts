import { z } from "zod";

// Zod Schema for Login
export const loginSchema = z.object({
  username: z
    .string()
    .email({ message: "Username must be a valid email" })
    .min(5, { message: "Username must be at least 5 characters" }),
  
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .max(30, { message: "Password cannot exceed 30 characters" }),
    

  rememberMe: z.boolean().optional(),
});

// TypeScript type
export type LoginFormType = z.infer<typeof loginSchema>;
