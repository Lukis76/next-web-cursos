import { NextAuthProvider } from '@/lib/auth'
import ReactQueryProvider from '@/react-query/reactQueryProvider'
import '@/styles/global-styles.css'
import { TLayoutProps } from '@/type/layout'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
})

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: TLayoutProps) {
  return (
    <html lang='en'>
      <body
        className={`${poppins.className} flex flex-col justify-start items-center px-4 w-full min-h-screen`}
        suppressHydrationWarning={true}
      >
        <NextAuthProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
