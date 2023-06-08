import { compareSync } from "bcrypt-ts";

export const compare = (textPlane: string, hash: string): boolean => {
  return compareSync(textPlane, hash);
};
