export interface ICredentials {
  username: string
  email: string
  password: string
}

export type TLogin = Omit<ICredentials, 'username'>
export type TRegister = ICredentials
