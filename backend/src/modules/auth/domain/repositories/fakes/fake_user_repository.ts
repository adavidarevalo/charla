import { type IUserRepository } from '../IUserRepository'
import { type IUser } from '../../models/IUser'

class FakeUserRepository implements IUserRepository {
  private readonly users: IUser[] = []

  public async findAll(): Promise<IUser[]> {
    return this.users
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = this.users.find((user) => user._id === id) ?? null

    return user
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = this.users.find((user) => user.email === email) ?? null

    return user
  }

  public async create(user: IUser): Promise<IUser> {
    this.users.push(user)

    return user
  }

  public async delete(id: string): Promise<void> {
    this.users.filter((user) => user._id !== id)
  }
}

export default FakeUserRepository
