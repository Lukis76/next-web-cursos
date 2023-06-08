'use client'

import { Inputform } from '@/components'
import { TLogin } from '@/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const loginUserForm = z.object({
  email: z.string().nonempty('Field email is obligatory').email(),
  password: z
    .string()
    .nonempty('Field pasword is obligatory')
    .min(6, 'Min password of 6 characters')
    .max(40, 'Max password of 40 characters'),
})

type TLoginUserFormData = z.infer<typeof loginUserForm>

export const LoginForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUserFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',

    resolver: zodResolver(loginUserForm),
  })

  const onSubmit = async (data: TLogin) => {
    const res = await signIn('credentials', {
      ...data,
      redirect: false,
    })
    console.log("🚀 ~ file: login.tsx:41 ~ onSubmit ~ res:", res)

    // router.push('/home')
  }

  return (
    <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4 flex-col'>
        <Inputform
          type='email'
          name='email'
          label='Email Address'
          placeholder='Enter Email Address'
          autofocus={true}
          register={register('email', {
            disabled: isSubmitting,
          })}
          errors={errors.email}
        />

        <Inputform
          type='password'
          name='password'
          label='Password'
          placeholder='Enter Password'
          autofocus={true}
          register={register('password', {
            disabled: isSubmitting,
          })}
          errors={errors.password}
        />
      </div>
      <button
        disabled={isSubmitting}
        type='submit'
        className='w-full flex gap-2 justify-center items-center transition-all duration-100 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 disabled:opacity-30 disabled:bg-zinc-500 text-white font-semibold rounded-lg
              px-4 py-3 mt-6'
      >
        Log In
      </button>
    </form>
  )
}
