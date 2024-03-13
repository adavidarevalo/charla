import { type IAuthRepository } from '../IAuthRepository'
import { type IAuthUser } from '../../models/IAuthUser'

class FakeAuthRepository implements IAuthRepository {
  private readonly users: IAuthUser[] = []

  public async findAll(): Promise<IAuthUser[]> {
    return this.users
  }

  public async findById(id: string): Promise<IAuthUser | null> {
    const user = this.users.find((user) => user._id === id) ?? null

    return user
  }

  public async findByEmail(email: string): Promise<IAuthUser | null> {
    const user = this.users.find((user) => user.email === email) ?? null

    return user
  }

  public async create(user: IAuthUser): Promise<IAuthUser> {
    this.users.push(user)

    return user
  }

  public async delete(id: string): Promise<void> {
    this.users.filter((user) => user._id !== id)
  }
}

export default FakeAuthRepository
