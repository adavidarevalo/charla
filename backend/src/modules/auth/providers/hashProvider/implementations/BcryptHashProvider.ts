import { type IHashProvider } from '../model/IHashProvider'
import bcrypt from 'bcryptjs'

export class BCryptHashProvider implements IHashProvider {
  async generateHash(password: string): Promise<string> {
    return await bcrypt.hash(password, 8)
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
