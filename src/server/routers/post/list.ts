import { publicProcedure } from "@/server/trpc";
import { PostParamsSchema } from "@/types";

export const postList = publicProcedure
  .input(PostParamsSchema)
  .query(async ({ ctx, input }) => {
    const listPost = await ctx.prisma.post.findMany();
    return listPost;
  });
