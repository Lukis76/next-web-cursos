import { z } from "zod";

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z.string().min(8).max(64),
});

export type Inputs = z.infer<typeof loginUserSchema>