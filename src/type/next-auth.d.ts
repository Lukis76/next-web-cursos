import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

type UserId = string;

enum RoleType {
  ADMIN,
  INVITADO,
}

declare module "next-auth" {
  interface Session {
    user: User & {
      id: UserId;
      // role: RoleType;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: UserId;
    // role: RoleType;
  }
}
