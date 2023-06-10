import { LayoutSign, Login, Register } from "@/components";
import type { InferGetServerSidePropsType } from "next";

const Sign = ({
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <LayoutSign>
      {page === "login" && <Login />}
      {page === "register" && <Register />}
    </LayoutSign>
  );
};

export const getServerSideProps = (ctx: { query: { sign: string } }) => {
  // si no coinside la ruta dinamica con login o register redireccionamos a login

  if (ctx.query.sign !== "login" && ctx.query.sign !== "register") {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }
  return {
    props: {
      page: ctx.query.sign,
    },
  };
};

export default Sign;
