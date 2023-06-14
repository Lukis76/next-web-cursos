import { publicProcedure } from "@/server/trpc";
import { CommentSchema } from "@/types";

export const comment = publicProcedure
  .input(CommentSchema)
  .mutation(async ({ ctx, input }) => {
    if (!ctx?.session?.user) {
      return null;
    }

    const newComment = await ctx.prisma.comment.create({
      data: {
        name: ctx.session.user.name || "DefaultName",
        body: input.body,
        postId: input.postId,
        autorId: ctx.session.user.id,
      },
    });
    return newComment;
  });
