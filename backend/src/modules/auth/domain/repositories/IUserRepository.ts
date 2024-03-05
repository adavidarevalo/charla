import { type IUser } from '../models/IUser'

export interface IUserRepository {
  findAll: () => Promise<IUser[]>
  findById: (id: string) => Promise<IUser | null>
  findByEmail: (email: string) => Promise<IUser | null>
  create: (user: IUser) => Promise<IUser>
  delete: (id: string) => Promise<void>
}
