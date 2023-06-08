import { compareSync, hashSync } from 'bcrypt-ts'

export const encrypt = (textPlane: string) => {
  return hashSync(textPlane, 10)
}

export const compare = (textPlane: string, hash: string) => {
  return compareSync(textPlane, hash)
}
