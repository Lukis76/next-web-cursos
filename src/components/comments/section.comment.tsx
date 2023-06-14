import { InsertComment } from "@/components";
import { Avatar } from "@mui/material";
import { useState, type FC } from "react";

interface SectionCommentsProps {
  postId: string;
}

export const SectionComment: FC<SectionCommentsProps> = ({ postId }) => {
  const comentarios = [
    {
      id: "1878",
      name: "Juan Perez",
      email: "juanperez@gmail.com",
      body: "Este es un ejemplo de comentario de Juan Perez",
      replica: [
        {
          id: "146",
          name: "Oscar Nuheces",
          email: "oscarnuheces@gmail.com",
          body: "Este es un ejemplo de comentario de Oscar Nuheces",
          replica: [
            {
              id: "1879",
              name: "Ramon De La Oztia",
              email: "ramondelaoztia@gmail.com",
              body: "Este es un ejemplo de comentario de Ramon De La Oztia",
              replica: [],
            },
          ],
        },
      ],
    },
    {
      id: "1879",
      name: "Ramon De La Oztia",
      email: "ramondelaoztia@gmail.com",
      body: "Este es un ejemplo de comentario de Ramon De La Oztia",
      replica: [],
    },
  ];
  return (
    <div className="flex w-full max-w-5xl flex-col items-center justify-start ">
      <h2>BlockComments</h2>
      {/* <p>blogId: {postId}</p> */}
      <InsertComment />

      <Comment comments={comentarios} />
    </div>
  );
};

interface CommnetProps {
  id: string;
  name: string;
  email: string;
  body: string;
  replica: false | CommnetProps[];
}

const Comment = ({
  comments,
  level = 1,
}: {
  comments: CommnetProps[];
  level?: number;
}) => {
  return (
    <ul className="items-flex-start flex w-full max-w-2xl flex-col justify-start">
      {comments.map((comment) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const [addReplica, setAddReplica] = useState(false);
        const activeReplica = level < 4;
        // const blockReplica = false;
        return (
          <li
            key={comment.id}
            className="relative flex w-full flex-row items-stretch justify-start pl-14"
          >
            <div className=" flex-grow-1 absolute left-0 top-0 flex h-full w-[50px] flex-col items-center justify-start  before:absolute before:top-0 before:h-full before:w-[1px] before:-translate-x-0 before:bg-slate-400 before:content-['']">
              <Avatar className="mt-1">{comment.name.charAt(0)}</Avatar>
              {/* <div className=" flex w-1 items-stretch bg-black">.</div> */}
            </div>
            <div className="flex w-full flex-col">
              <div className="flex w-full flex-row items-center justify-between">
                <h6>{comment.name}</h6>
                <span className='text-sm text-gray-400'>{comment.email}</span>
              </div>
              <p className='text-sm text-gray-400' >{comment.body}</p>
              {activeReplica && !addReplica && (
                <div className="flex w-full justify-end">
                  <button
                    onClick={() => setAddReplica((prev) => !prev)}
                    className="text-sm text-blue-200 hover:text-blue-500 duration-75"
                  >
                    relicar commentario
                  </button>
                </div>
              )}
              {activeReplica && addReplica && <InsertComment />}
              {comment.replica && level < 4 && (
                <ul>
                  <Comment comments={comment.replica} level={level + 1} />
                </ul>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};
