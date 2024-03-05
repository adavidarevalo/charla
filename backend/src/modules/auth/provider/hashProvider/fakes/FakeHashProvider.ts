import { type IHashProvider } from '../model/IHashProvider'

export class FakeHashProvider implements IHashProvider {
  async generateHash(password: string): Promise<string> {
    return password
  }

  async compareHash(password: string, hash: string): Promise<boolean> {
    return password === hash
  }
}
