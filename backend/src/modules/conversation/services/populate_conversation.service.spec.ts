import 'reflect-metadata'
import FakeConversationRepository from '../domain/repositories/fakes/fake_conversation_repository'
import CreateConversationService from './create_conversation.service'
import { type ICreateConversationData } from '../domain/model/ICreateConversationRequest'
import AppError from '@shared/errors/app_error'
import PopulateConversationService from './populate_conversation.service'

let populateConversationService: PopulateConversationService
let createConversationService: CreateConversationService

describe('PopulateConversationService check', () => {
  beforeEach(() => {
    const fakeConversationRepository = new FakeConversationRepository()
    createConversationService = new CreateConversationService(
      fakeConversationRepository
    )
    populateConversationService = new PopulateConversationService(
      fakeConversationRepository
    )
  })

  it('Should return the  conversations', async () => {
    const newConversation: ICreateConversationData = {
      _id: '234',
      name: 'test',
      picture: 'test',
      isGroup: false,
      users: ['123', '456']
    }

    await createConversationService.execute(newConversation)

    const conversation = await populateConversationService.execute(
      '234',
      '',
      ''
    )

    expect(conversation).toHaveProperty('_id')
    expect(conversation).toHaveProperty('name')
    expect(conversation).toHaveProperty('isGroup')
    expect(conversation).toHaveProperty('users')
  })
  it("Should return null if the user doesn't have any conversations", async () => {
    const conversation = populateConversationService.execute('asd', '', '')

    void expect(conversation).rejects.toBeInstanceOf(AppError)
  })
})
