import {
  type GenerateTokenProps,
  type IJWTProvider
} from '../model/IJWTProvider'

export class FakeJWTProvider implements IJWTProvider {
  public generateToken({
    userId,
    expiresIn,
    secret
  }: GenerateTokenProps): string {
    return 'token'
  }

  public verifyToken(token: string, secret: string): { id: string } {
    return { id: '1234' }
  }
}
