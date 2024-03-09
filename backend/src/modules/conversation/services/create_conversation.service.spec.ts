import 'reflect-metadata'
import FakeConversationRepository from '../domain/repositories/fakes/fake_conversation_repository'
import { type ICreateConversationData } from '../domain/model/ICreateConversationRequest'
import CreateConversationService from './create_conversation.service'

let createConversationService: CreateConversationService

describe('CreateConversion check', () => {
  beforeEach(() => {
    const fakeConversationRepository = new FakeConversationRepository()
    createConversationService = new CreateConversationService(
      fakeConversationRepository
    )
  })

  it('Validate to create a new conversation', async () => {
    const newConversation: ICreateConversationData = {
      _id: '234',
      name: 'test',
      picture: 'test',
      isGroup: false,
      users: ['123', '456']
    }
    const conversation =
      await createConversationService.execute(newConversation)

    expect(conversation).toHaveProperty('_id')
    expect(conversation).toHaveProperty('name')
    expect(conversation).toHaveProperty('isGroup')
    expect(conversation).toHaveProperty('users')
  })
})
