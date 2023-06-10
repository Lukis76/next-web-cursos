import { encrypt } from "@/lib/crypto";
import { publicProcedure } from "@/server/trpc";
import { RegisterSchema } from "@/types";

// export const authentication = createTRPCRouter({
export const register = publicProcedure
  .input(RegisterSchema)
  .mutation(async ({ ctx, input }) => {
    /**
     * hash del password antes de guardarlo en la base de datos
     */
    const hashedPassword = encrypt(input.password);
    if (!hashedPassword) {
      throw new Error("Error hashing password");
    }

    /**
     * creamos el usuario en la base de datos
     */
    const newUser = await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: hashedPassword,
      },
    });

    /**
     * tipos de respuestas
     * Failed or success
     */
    const failed = {
      status: "Failed",
      error: true,
      msg: "Error creating user",
    };
    const success = {
      status: "success",
      error: false,
      msg: "User created",
    };

    /**
     * respuesta
     */
    return !!newUser ? success : failed;
  });
// });
