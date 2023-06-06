"use client";

import { Input, LinkForgotPassword } from "@/components";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "@/lib/validations/login";
import { SpinerLoading, SvgLoading } from "@/assets/loading";

type Inputs = {
  email: string;
  password: string;
};

const defaultValues = {
  email: "",
  password: "",
};

export const Formulario = () => {
  const { register, handleSubmit, watch, formState } = useForm<Inputs>({
    defaultValues,
    resolver: zodResolver(loginUserSchema),
  });

  const { errors, isSubmitting } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    console.log("soy la data ==>> ", data);

  console.log("React-hook-form state => ", JSON.stringify(watch(), null, 2));
  console.log("Error => ", formState);

  return (
    <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-4 flex-col">
        <Input
          isLabel={true}
          LabelContent="Email Address"
          name="email"
          placeholder="Enter Email Address"
          autoFocus={true}
          required={true}
          hookForm={true}
          register={register("email")}
          error={errors}
          disabled={isSubmitting}
        />

        <Input
          isLabel={true}
          LabelContent="Password"
          name="password"
          placeholder="Enter Password"
          autoFocus={true}
          required={true}
          hookForm={true}
          register={register("password")}
          error={errors}
          disabled={isSubmitting}
        />
      </div>
      <LinkForgotPassword />

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full flex gap-2 justify-center items-center transition-all duration-100 bg-indigo-500 hover:bg-indigo-400 focus:bg-indigo-400 disabled:opacity-30 disabled:bg-zinc-500 text-white font-semibold rounded-lg
              px-4 py-3 mt-6"
      >
        {/* {true && <SpinerLoading />} */}
        <div className="relative bg-gradient-to-tr from-teal-600 to-transparent h-[100px] w-[100px] rounded-full animate-spin before:absolute before:rounded-full after:absolute after:rounded-full before:w-[80px] before:h-[80px] before:top-[10px] before:left-[10px] before:bg-transparent after:h-[10px] after:w-[10px] after:bg-[#009688] after:top-0 after:left-[45px]  "></div>
        Log In
        {true && "..."}
      </button>
    </form>
  );
};
