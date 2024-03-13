import { type IUserRepository } from '../IUserRepository'
import { type IUser } from '../../models/IUser'

class FakeUserRepository implements IUserRepository {
  private readonly users: IUser[] = []

  public async searchUser(): Promise<IUser[]> {
    return this.users
  }
}

export default FakeUserRepository
