import { postList } from "@/server/routers/post/list";
import { createTRPCRouter } from "@/server/trpc";

export const post = createTRPCRouter({
  postList,
});
