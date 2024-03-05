import 'reflect-metadata'

import FakeUserRepository from '../domain/repositories/fakes/fake_user_repository'
import { FakeHashProvider } from '../providers/hashProvider/fakes/FakeHashProvider'
import CreateUserService from './create_user'
import FindByIdUserService from './find_user'

let findByIdUserService: FindByIdUserService

describe('FindByIdUserService', () => {
  beforeEach(async () => {
    const fakeUserRepository = new FakeUserRepository()
    const fakeHashProvider = new FakeHashProvider()
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider
    )
    findByIdUserService = new FindByIdUserService(fakeUserRepository)
    await createUser.execute({
      _id: '1',
      name: 'Jorge Aluizio',
      email: 'teste@teste.com',
      password: '123456',
      status: 'active',
      picture: 'teste.png'
    })
    await createUser.execute({
      _id: '2',
      name: 'PEPE Aluizio',
      email: 'testsae@teste.com',
      password: '123456',
      status: 'active',
      picture: 'teste.png'
    })
  })

  it('Should be able to find the user by id', async () => {
    const user = await findByIdUserService.execute('1')

    expect(user).toHaveProperty('_id')
    expect(user?.name).toEqual('Jorge Aluizio')
    expect(user?.email).toEqual('teste@teste.com')
    expect(user?.picture).toEqual('teste.png')
  })
  it('Should not be able to find the user by id', async () => {
    const user = await findByIdUserService.execute('3')

    expect(user).toBeNull()
  })
})
