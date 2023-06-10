import { register } from "@/server/routers/authentication/register";
import { createTRPCRouter } from "@/server/trpc";

export const authentication = createTRPCRouter({
  register,
});
