import { hashSync } from "bcrypt-ts";

export const encrypt = (textPlane: string): string => {
  return hashSync(textPlane, 10);
};
