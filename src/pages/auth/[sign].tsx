import { LayoutSign, Login, Register } from "@/components";
import type { InferGetServerSidePropsType } from "next";

const AuthPage = ({
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

  /* Este bloque de código está comprobando si el valor del parámetro de consulta 'sign' en la URL no
 es igual a "login" y no es igual a "register". Si esta condición es verdadera,
 significa que la URL no coincide ni con la página de login ni con la de registrer, por lo
 que el usuario es redirigido a la página de login con un código de estado "302"
 (redireccionamiento temporal). La propiedad `permanente` se establece en `falso`, lo que indica que
 se trata de una redirección temporal. */
  if (ctx.query.sign !== "login" && ctx.query.sign !== "register") {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  /* Este bloque de código devuelve un objeto con una propiedad `props` que contiene una propiedad
 `page`. El valor de la propiedad `page` se establece en el valor del parámetro de consulta `sign`
 en la URL. Este objeto se usa para pasar datos al componente `AuthPage` como accesorios.
 Específicamente, la prop `página` se usa para determinar qué componente (`Login` o
 `Register`) se representará dentro del componente `LayoutSign`. */
  return {
    props: {
      page: ctx.query.sign,
    },
  };
};

export default AuthPage;
