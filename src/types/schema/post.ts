import { z } from "zod";

const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  body: z.string(),
  autorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Post = z.infer<typeof PostSchema>;

const PostListSchema = z.array(PostSchema);

export const PostParamsSchema = z.object({
  limit: z.number().optional(),
  sort: z.string().optional(),
  offSet: z.number().optional(),
})

export type PostParams = z.infer<typeof PostParamsSchema>;

