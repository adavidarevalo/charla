import 'reflect-metadata'
import CreateUserService from './create_user.service'
import FakeAuthRepository from '../domain/repositories/fakes/fake_auth_repository'
import { FakeHashProvider } from '../providers/hashProvider/fakes/FakeHashProvider'

let createUser: CreateUserService

describe('CreateUser', () => {
  beforeEach(() => {
    const fakeAuthRepository = new FakeAuthRepository()
    const fakeHashProvider = new FakeHashProvider()
    createUser = new CreateUserService(fakeAuthRepository, fakeHashProvider)
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

  //   it('should not be able to create two users with the same email', async () => {
  //     await createUser.execute({
  //       name: 'Jorge Aluizio',
  //       email: 'teste@teste.com',
  //       password: '123456',
  //       status: 'active',
  //       picture: 'teste.png'
  //     })

  //     expect(
  //       createUser.execute({
  //         name: 'Jorge Aluizio',
  //         email: 'teste@teste.com',
  //         password: '123456',
  //         status: 'active',
  //         picture: 'teste.png'
  //       })
  //     ).toThrow(new Error('This email already exists'))
  //   })
})
