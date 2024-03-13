import { type IUser } from '../models/IUser'

export interface IUserRepository {
  searchUser: (keyword: string, userId: string) => Promise<IUser[] | null>
}
