import { InputForm } from "@/components";
import { RegisterSchema, type TRegister } from "@/types";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export const Register = () => {
  const { mutate } = trpc.authentication.register.useMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegister>({
    mode: "onBlur",
    reValidateMode: "onChange",

    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: TRegister): void => {
    mutate(data);
  };

  return (
    <form className="mt-6 w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-5">
        <InputForm
          type="text"
          label="Nick Name"
          placeholder="Enter Nick Name"
          autofocus={true}
          register={register("name", {
            disabled: isSubmitting,
          })}
          errors={errors.name}
        />

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
        Register
      </button>
    </form>
  );
};
