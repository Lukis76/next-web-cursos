import { Avatar } from "@mui/material";
import { useSession } from "next-auth/react";
import { type FormEvent } from "react";
import { trpc } from "../../utils/trpc";

export const InsertComment = () => {
  const { data } = useSession();
  const { mutate } = trpc.comment.insertComment.useMutation();

  const handlerSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const comment = new FormData(e.currentTarget)?.get("comment");
    if (comment) {
      mutate({
        body: comment.toString(),
        postId: "cliuryhn800009fzzb3wke1m4",
      });
    }
  };

  return (
    <div>
      <div className="flex flex-row items-start justify-start gap-2">
        <div className="flex-grow-1 flex h-full flex-col items-center justify-start ">
          {!!data?.user?.image && !!data?.user?.name ? (
            <Avatar src={data.user.image} alt={`User ${data.user.name}`} />
          ) : (
            <Avatar>{data?.user?.name?.charAt(0)}</Avatar>
          )}
        </div>
        <form className="w-full" onSubmit={handlerSubmit}>
          <textarea
            name="comment"
            className="h-24 w-full resize-none rounded-md border-2 border-gray-300 p-2 text-slate-800"
            rows={10}
            cols={30}
          />
          <div className="flex w-full justify-end">
            <button className="rounded-md bg-blue-500 px-2 py-1 text-white">
              publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
