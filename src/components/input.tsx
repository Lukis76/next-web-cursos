"use client";

import { SvgInfo } from "@/assets/info";
import { ChangeEventHandler, FC } from "react";

interface IInputProps {
  isLabel: boolean;
  LabelContent?: string;
  name: string;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  required?: boolean;
  value?: string | number | readonly string[];
  onChange?: ChangeEventHandler<HTMLInputElement>;
  register?: any;
  hookForm?: boolean;
  error?: any;
  disabled?: boolean;
}

export const Input: FC<IInputProps> = ({
  isLabel,
  name,
  placeholder,
  LabelContent,
  className,
  autoFocus,
  required,
  value,
  onChange,
  register,
  hookForm,
  error,
  disabled,
}) => {
  return (
    <div className={className || ""}>
      {isLabel && (
        <label htmlFor={name} className="block text-gray-700">
          {LabelContent}
        </label>
      )}
      <input
        type={name}
        name={name}
        id={name}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg text-gray-700 bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
        autoFocus={autoFocus}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        {...register}
      />
      {/* {hookForm && <div>{error && <p>{error[name]?.message}</p>}</div>} */}
      {hookForm && error[name]?.message && (
        <div
          className={`flex gap-2 flex-row justify-start items-center py-1 px-2 bg-[#ff000015] rounded-md w-full my-2 ${
            !error[name]?.message && "opacity-0"
          }`}
        >
          <SvgInfo size={1} />
          <p className="text-red-400 text-sm font-normal w-full truncate">
            {error[name]?.message}
          </p>
        </div>
      )}
    </div>
  );
};
