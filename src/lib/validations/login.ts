import { z } from 'zod'

export const loginUserForm = z.object({
  username: z.string().nonempty('Field username is obligatory'),
  email: z.string().nonempty('Field email is obligatory').email(),
  password: z
    .string()
    .nonempty('Field pasword is obligatory')
    .min(6, 'Min password of 6 characters')
    .max(40, 'Max password of 40 characters'),
})

export type TLoginFormData = z.infer<typeof loginUserForm>
