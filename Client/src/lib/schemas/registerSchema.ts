import { z } from 'zod';
import { requiredString } from "../util/util";

export const registerSchema = z.object({
    email: z.email(),
    displayName: requiredString('Display Name'), // Display Name must be a non-empty string
    password: requiredString('Password'), // Password must be at least 6 characters long
});

export type RegisterSchema = z.infer<typeof registerSchema>;