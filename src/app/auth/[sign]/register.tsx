'use client'

import { Inputform } from '@/components/authInputform'
import { TLoginFormData, loginUserForm } from '@/lib/validations/login'
import { TRegister } from '@/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'

export const RegisterForm = () => {
  const registerUser = useMutation({
    mutationKey: ['register'],
    mutationFn: async (data: TRegister) => {
      fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }).then((res) => res.json())
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginFormData>({
    mode: 'onBlur',
    reValidateMode: 'onChange',

    resolver: zodResolver(loginUserForm),
  })

  const onSubmit = (data: any) => {
    registerUser.mutate(data)
  }

  return (
    <form className='mt-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='flex gap-4 flex-col'>
        <Inputform
          type='text'
          name='username'
          label='Nick Name'
          placeholder='Enter Nick Name'
          autofocus={true}
          register={register('username', {
            disabled: isSubmitting,
          })}
          errors={errors.username}
        />

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
