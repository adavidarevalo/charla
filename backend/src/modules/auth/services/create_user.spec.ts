import 'reflect-metadata'
import CreateUserService from './create_user'
import FakeUserRepository from '../domain/repositories/fakes/fake_user_repository'
import { FakeHashProvider } from '../provider/hashProvider/fakes/FakeHashProvider'
import AppError from '@shared/errors/app_error'

let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider)
  })

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
      status: 'active',
      picture: 'teste.png'
    })

    expect(user).toHaveProperty('_id')
  })

  it('should not be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
      status: 'active',
      picture: 'teste.png'
    })

    void expect(
      createUser.execute({
        name: 'Jorge Aluizio',
        email: 'teste@teste.com',
        password: '123456',
        status: 'active',
        picture: 'teste.png'
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
