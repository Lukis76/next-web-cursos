import "@/styles/globals.css";
import { trpc } from "@/utils/trpc";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  console.log("🚀 ~ file: _app.tsx:11 ~ pageProps:", pageProps)
  console.log("🚀 ~ file: _app.tsx:11 ~ session:", session)
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};
// export default MyApp
export default trpc.withTRPC(MyApp);
