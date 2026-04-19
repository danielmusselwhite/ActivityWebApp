import { format, formatDistanceToNow, type DateArg } from "date-fns";
import { date, z } from "zod";

export function formatDate(date: DateArg<Date>){
    return format(date, "dd MMM yyyy hh:mm: a");
}

export function timeAgo(date: DateArg<Date>) {
    return formatDistanceToNow(date) + " ago";
}

export const requiredString = (fieldName: string) => z
    .string({error:`${fieldName} is required`})
    .min(1, { message: `${fieldName} is required` });
