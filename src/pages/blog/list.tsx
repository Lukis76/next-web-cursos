import { SectionComment } from "@/components";
import { type Post } from "../../types";

import { type FC } from "react";
import { trpc } from "../../utils/trpc";

const BlogPage = () => {
  const postQuery = trpc.post.postList.useQuery({});
  // console.log("🚀 ~ file: list.tsx:7 ~ BlogPage ~ data:", data);

  // if (postQuery.error) {
  //   return (
  //     <NextError
  //       title={"hola soy lucas"}
  //       statusCode={postQuery.error.data?.httpStatus ?? 500}
  //     />
  //   );
  // }

  if (postQuery.status !== "success") {
    return (
      <div className="flex h-full flex-col justify-center px-8 ">
        <div className="mb-2 h-10 w-full animate-pulse rounded-md bg-zinc-900/70"></div>
        <div className="mb-8 h-5 w-2/6 animate-pulse rounded-md bg-zinc-900/70"></div>

        <div className="h-40 w-full animate-pulse rounded-md bg-zinc-900/70"></div>
      </div>
    );
  }
  if (postQuery.isSuccess) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-start ">
        {postQuery.data?.map((post) => {
          return <Post key={post.id} {...post} />;
        })}
      </div>
    );
  }

  return null;
};

export default BlogPage;

interface PostProps {
  title: string;
  body: string;
  id: string;
}
const Post: FC<PostProps> = ({ title, body, id }) => {
  return (
    <div>
      <p>{title}</p>
      <p>{body}</p>
      <SectionComment postId={id} />
    </div>
  );
};
