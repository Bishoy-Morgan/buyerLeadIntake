import { z } from "zod";

export const buyerSchema = z.object({
    fullName: z.string().min(2).max(80),
    email: z.string().email().optional(),
    phone: z.string().min(10).max(15),
    city: z.enum(["Chandigarh", "Mohali", "Zirakpur", "Panchkula", "Other"]),
    propertyType: z.enum(["Apartment", "Villa", "Plot", "Office", "Retail"]),
    bhk: z.enum(["1", "2", "3", "4", "Studio"]).optional(),
    purpose: z.enum(["Buy", "Rent"]),
    budgetMin: z.number().optional(),
    budgetMax: z.number().optional(),
    timeline: z.enum(["0-3m", "3-6m", ">6m", "Exploring"]),
    source: z.enum(["Website", "Referral", "Walk-in", "Call", "Other"]),
    status: z.enum([
        "New",
        "Qualified",
        "Contacted",
        "Visited",
        "Negotiation",
        "Converted",
        "Dropped",
    ]),
    notes: z.string().max(1000).optional(),
    tags: z.array(z.string()).optional(),
});
