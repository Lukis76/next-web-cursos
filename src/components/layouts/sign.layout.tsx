import React, { FC } from "react";

interface LayoutSignProps {
  children: React.ReactNode;
}

export const LayoutSign: FC<LayoutSignProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center">
      {children}
    </main>
  );
};
