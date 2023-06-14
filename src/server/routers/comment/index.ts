import { comment as insertComment } from "@/server/routers/comment/comment";
import { createTRPCRouter } from "@/server/trpc";

export const comment = createTRPCRouter({
  insertComment,
});
