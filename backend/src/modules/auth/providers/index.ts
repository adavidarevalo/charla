import { container } from 'tsyringe'
import { BCryptHashProvider } from './hashProvider/implementations/BcryptHashProvider'
import { type IHashProvider } from './hashProvider/model/IHashProvider'
import { type IJWTProvider } from './jsonWebToken/model/IJWTProvider'
import { JsonWebTokenProvider } from './jsonWebToken/implementation/JWTProvider'

container.registerSingleton<IJWTProvider>('JWTProvider', JsonWebTokenProvider)
container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider)
