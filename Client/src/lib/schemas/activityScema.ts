import { z } from "zod";

const requiredString = (fieldName: string) => z.string({error:`${fieldName} is required`}).min(1, { message: `${fieldName} is required` });

export const activitySchema = z.object({
    title: requiredString('Title'), // Title must be a non-empty string
    description: requiredString('Description'), // Description must be a non-empty string
    category: requiredString('Category'), // Category must be a non-empty string
    date: z.coerce.date({message:'Date is required'}), // Date must be a valid date, and is required. We use z.coerce.date to convert the input to a Date object, and provide a custom error message if the conversion fails (eg if the input is empty or not a valid date).
    city: requiredString('City'), // City must be a non-empty string
    venue: requiredString('Venue') // Venue must be a non-empty string
});

export type ActivitySchema = z.input<typeof activitySchema>; // Zod creating correct types for the schema, which can be used in the form component to ensure type safety.