import { z } from "zod";

export const CommentSchema = z.object({
  postId: z.string(),
  body: z.string(),
  // AutorId: z.string(),
});

export type Comment = z.infer<typeof CommentSchema>;
// export type CommentInput = z.input<typeof CommentSchema>;
