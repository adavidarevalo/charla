import 'reflect-metadata'

import FakeConversationRepository from '../domain/repositories/fakes/fake_conversation_repository'
import DoesConversationExistService from './does_conversation_exist.service'
import { type ICreateConversationData } from '../domain/model/ICreateConversationRequest'
import CreateConversationService from './create_conversation.service'
import AppError from '@shared/errors/app_error'

let doesConversationExistService: DoesConversationExistService
let createConversationService: CreateConversationService

describe('DoesConversationExistService check', () => {
  beforeAll(() => {
    const fakeConversationRepository = new FakeConversationRepository()
    createConversationService = new CreateConversationService(
      fakeConversationRepository
    )
    doesConversationExistService = new DoesConversationExistService(
      fakeConversationRepository
    )
  })

  it('Should return the conversation group', async () => {
    const newConversation: ICreateConversationData = {
      _id: '234',
      name: 'test',
      picture: 'test',
      isGroup: false,
      users: ['123', '456']
    }

    await createConversationService.execute(newConversation)

    const conversation = await doesConversationExistService.execute(
      '123',
      '456',
      '234'
    )

    expect(conversation).toBeTruthy()
    expect(conversation).toHaveProperty('_id')
    expect(conversation).toHaveProperty('name')
    expect(conversation).toHaveProperty('isGroup')
    expect(conversation).toHaveProperty('users')
  })

  it('Should return null if the conversation not exists', async () => {
    const conversation = await doesConversationExistService.execute(
      's123',
      '45s6',
      ''
    )
    expect(conversation).toBeNull()
  })

  it('Should return AppError if the conversation Group not exists', async () => {
    const conversation = doesConversationExistService.execute(
      's123',
      '45s6',
      'asdasd'
    )

    void expect(conversation).rejects.toBeInstanceOf(AppError)
  })
})
