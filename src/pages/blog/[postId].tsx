import { SectionComment } from "@/components";
import { type InferGetServerSidePropsType } from "next";
// import { trpc } from '../../utils/trpc';

const BlogPage = ({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start ">
      {/* <Post/> */}
      <SectionComment blogId={page} />
    </div>
  );
};

function getServerSideProps(ctx: { query: { postId: string } }) {

  // trpc.


  return {
    props: {
      page: ctx.query.postId,
    },
  };
}

export default BlogPage;
