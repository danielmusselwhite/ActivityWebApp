import { z } from "zod";

const requiredString = (fieldName: string) => z.string({error:`${fieldName} is required`}).min(1, { message: `${fieldName} is required` });

export const activitySchema = z.object({
    title: requiredString('Title'), // Title must be a non-empty string
    description: requiredString('Description'), // Description must be a non-empty string
    category: requiredString('Category'), // Category must be a non-empty string
    date: requiredString('Date'), // Date must be a non-empty string (could be further validated as a date format if needed)
    city: requiredString('City'), // City must be a non-empty string
    venue: requiredString('Venue') // Venue must be a non-empty string
});

export type ActivitySchema = z.infer<typeof activitySchema>; // Zod creating correct types for the schema, which can be used in the form component to ensure type safety.