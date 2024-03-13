import { type IAuthUser } from '../models/IAuthUser'

export interface IAuthRepository {
  findAll: () => Promise<IAuthUser[]>
  findById: (id: string) => Promise<IAuthUser | null>
  findByEmail: (email: string) => Promise<IAuthUser | null>
  create: (user: IAuthUser) => Promise<IAuthUser>
  delete: (id: string) => Promise<void>
}
