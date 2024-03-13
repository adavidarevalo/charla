import 'reflect-metadata'
import FakeAuthRepository from '../domain/repositories/fakes/fake_auth_repository'
import { FakeHashProvider } from '../providers/hashProvider/fakes/FakeHashProvider'
import CreateUserService from './create_user.service'
import LoginUserService from './login_user.service'
import AppError from '@shared/errors/app_error'

let loginUser: LoginUserService

describe('LoginUserService', () => {
  beforeEach(async () => {
    const fakeAuthRepository = new FakeAuthRepository()
    const fakeHashProvider = new FakeHashProvider()
    loginUser = new LoginUserService(fakeAuthRepository, fakeHashProvider)
    const createUser = new CreateUserService(
      fakeAuthRepository,
      fakeHashProvider
    )
    await createUser.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
      status: 'active',
      picture: 'teste.png'
    })
  })

  it('should be able to login the user', async () => {
    const userLogged = await loginUser.execute({
      email: 'teste@teste.com',
      password: '123456'
    })
    expect(userLogged).toHaveProperty('_id')
    expect(userLogged?.name).toEqual('Jorge Aluizio')
    expect(userLogged?.email).toEqual('teste@teste.com')
    expect(userLogged?.status).toEqual('active')
    expect(userLogged?.picture).toEqual('teste.png')
  })

  it("Should return error, when the credentials don't match", async () => {
    const userLogged = loginUser.execute({
      email: 'testse@teste.com',
      password: '123456'
    })
    void expect(userLogged).rejects.toBeInstanceOf(AppError)
  })
})
