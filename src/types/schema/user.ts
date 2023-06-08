import { z } from "zod";
const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(4).max(40),
  password: z.string().nonempty().min(6).max(255),
  email: z.string().nonempty().email(),
  emailVerified: z.string().optional(),
  Image: z.string().optional(),
  role: z.enum(["ADMIN", "USER"]),
});

// type Userdb = z.infer<typeof UserSchema>;

export const LoginSchema = UserSchema.pick({
  email: true,
  password: true,
});

export const RegisterSchema = UserSchema.pick({
  email: true,
  password: true,
  name: true,
});

export type TRegister = z.infer<typeof RegisterSchema>;
export type TLogin = z.infer<typeof LoginSchema>;
