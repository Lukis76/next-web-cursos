"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const loginUserForm = z.object({
  email: z.string().nonempty("Field email is obligatory").email(),
  password: z
    .string()
    .nonempty("Field pasword is obligatory")
    .min(6, "Min password of 6 characters")
    .max(40, "Max password of 40 characters"),
});

type TLoginUserFormData = z.infer<typeof loginUserForm>;

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLoginUserFormData>({
    resolver: zodResolver(loginUserForm),
  });

  const onSubmit = (data: any) => console.log(data);

  console.log("error => ", errors);

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 flex-col">
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            className="w-full px-4 py-3 rounded-lg text-gray-700 bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            type="email"
            placeholder="Enter Email Address"
            autoFocus
            aria-invalid
            {...register("email", {
              disabled: isSubmitting,
            })}
          />
          {errors?.email && <span>{errors.email?.message}</span>}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            className="w-full px-4 py-3 rounded-lg text-gray-700 bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none"
            type="password"
            placeholder="Enter Password"
            {...register("password", {
              disabled: isSubmitting,
            })}
          />

          {errors?.password && <span>{errors.password?.message}</span>}
        </div>
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full flex gap-2 justify-center items-center transition-all duration-100 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 disabled:opacity-30 disabled:bg-zinc-500 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
      >
        Log In
      </button>
    </form>
  );
};

export default RegisterPage;
