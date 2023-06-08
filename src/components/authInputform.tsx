import { FC } from 'react'

type TypeInput = 'text' | 'email' | 'password'
interface InputformProps {
  type: TypeInput
  name: string
  label: string
  placeholder: string
  autofocus?: boolean
  register: any
  errors: any
}

export const Inputform: FC<InputformProps> = ({
  register,
  errors,
  autofocus,
  type,
  placeholder,
  label,
  name,
}) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input
        className={`w-full px-4 py-3 rounded-lg text-gray-700 bg-gray-200 mt-2 focus:border-blue-500 focus:bg-white focus:outline-none focus:-outline-offset-[2px] -outline-offset-[2px] ${
          errors &&
          ' border-none outline-none focus:border-none focus:outline-none active:border-none active:outline-none outline-red-500 focus:outline-red-500'
        }`}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        {...register}
      />

      {errors && <span>{errors.message}</span>}
    </div>
  )
}
