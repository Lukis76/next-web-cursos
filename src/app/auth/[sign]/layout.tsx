import { TLayoutProps } from '@/type/layout'

export const metadata = {
  title: 'Authetication',
  description: 'section login / register',
}

export default function SignLayout({ children }: TLayoutProps) {
  return (
    <div className='flex justify-center items-center w-full h-full flex-grow max-w-md'>
      {children}
    </div>
  )
}
