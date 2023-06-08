'use client'

import { SessionProvider } from 'next-auth/react'
import { FC } from 'react'
interface INextAuthProviderProps {
  children: React.ReactNode
}

export const NextAuthProvider: FC<INextAuthProviderProps> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>
}
