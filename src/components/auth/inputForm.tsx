import { type FC } from "react";
import { type FieldError, type UseFormRegisterReturn } from "react-hook-form";

type TypeInput = "text" | "email" | "password";
interface InputformProps {
  type: TypeInput;
  name: string;
  label: string;
  placeholder: string;
  autofocus?: boolean;
  register: UseFormRegisterReturn<"email" | "password" | "name">;
  errors?: FieldError;
}

export const InputForm: FC<InputformProps> = ({
  register,
  errors,
  autofocus,
  type,
  placeholder,
  label,
  name,
}) => {
  return (
    <div className='flex flex-col justify-center items-start space-y-0 relative'>
      <label htmlFor={name}>{label}</label>
      <input
        className={`mt-2 w-full rounded-lg bg-gray-200 px-4 py-3 text-gray-700 -outline-offset-[2px] focus:border-blue-500 focus:bg-white focus:outline-none focus:-outline-offset-[2px] ${
          !!errors
            ? " border-none outline-none outline-red-500 focus:border-none focus:outline-none focus:outline-red-500 active:border-none active:outline-none"
            : ""
        }`}
        type={type}
        placeholder={placeholder}
        autoFocus={autofocus}
        {...register}
      />

      {errors && <span className='text-red-500 bg-[#cc30303d] py-0 px-1 rounded-[0.23rem] absolute -bottom-6 left-0 text-sm -translate-x-0'>{errors.message}</span>}
    </div>
  );
};
