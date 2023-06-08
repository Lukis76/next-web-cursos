import { FC } from "react";
import { FieldError } from "react-hook-form";

type TypeInput = "text" | "email" | "password";
interface InputformProps {
  type: TypeInput;
  name: string;
  label: string;
  placeholder: string;
  autofocus?: boolean;
  register: any;
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
    <div>
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

      {errors && <span>{errors.message}</span>}
    </div>
  );
};
