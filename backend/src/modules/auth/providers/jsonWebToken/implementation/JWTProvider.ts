import { sign, verify } from 'jsonwebtoken'
import {
  type GenerateTokenProps,
  type IJWTProvider
} from '../model/IJWTProvider'

export class JsonWebTokenProvider implements IJWTProvider {
  public generateToken({
    userId,
    expiresIn,
    secret
  }: GenerateTokenProps): string {
    const token = sign({ userId }, secret, {
      expiresIn
    })

    return token
  }

  public verifyToken(token: string, secret: string): { id: string } {
    const check = verify(token, secret)
    return check as { id: string }
  }
}
