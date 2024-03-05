export interface GenerateTokenProps {
  userId: string
  expiresIn: string
  secret: string
}

export interface IJWTProvider {
  generateToken: ({ userId, expiresIn, secret }: GenerateTokenProps) => string
  verifyToken: (
    token: string,
    secret: string
  ) => {
    id: string
  }
}
