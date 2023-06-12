import { InputForm } from "@/components/auth/inputForm";
// import { TLoginFormData, loginUserForm } from '@/lib/validations/login'
import { LoginSchema, type TLogin } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
// import { useMutation } from '@tanstack/react-query'
import { useForm, type SubmitHandler } from "react-hook-form";

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TLogin>({
    mode: "onBlur",
    reValidateMode: "onChange",

    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<TLogin> = async (data): Promise<void> => {
    console.log(
      "🚀 ~ file: login.tsx:22 ~ constonSubmit:SubmitHandler<TLogin>= ~ data:",
      data
    );
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
    });
    console.log(
      "🚀 ~ file: login.tsx:31 ~ constonSubmit:SubmitHandler<TLogin>= ~ result:",
      result
    );

    // router.push('/home')
  };

  return (
    <form className="mt-6 w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-6">
        <InputForm
          type="email"
          label="Email Address"
          placeholder="Enter Email Address"
          autofocus={true}
          register={register("email", {
            disabled: isSubmitting,
          })}
          errors={errors.email}
        />

        <InputForm
          type="password"
          label="Password"
          placeholder="Enter Password"
          autofocus={true}
          register={register("password", {
            disabled: isSubmitting,
          })}
          errors={errors.password}
        />
      </div>
      <button
        disabled={isSubmitting}
        type="submit"
        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-500 px-4 py-3 font-semibold text-white transition-all duration-100 hover:bg-indigo-400
              focus:bg-indigo-400 disabled:bg-zinc-500 disabled:opacity-30"
      >
        Log In
      </button>
    </form>
  );
};

//
