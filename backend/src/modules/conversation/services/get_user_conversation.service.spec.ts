import 'reflect-metadata'
import GetUserConversationService from './get_user_conversation.service'
import FakeConversationRepository from '../domain/repositories/fakes/fake_conversation_repository'
import CreateConversationService from './create_conversation.service'
import { type ICreateConversationData } from '../domain/model/ICreateConversationRequest'
import AppError from '@shared/errors/app_error'

let getUserConversationService: GetUserConversationService
let createConversationService: CreateConversationService

describe('GetUserConversation check', () => {
  beforeEach(() => {
    const fakeConversationRepository = new FakeConversationRepository()
    createConversationService = new CreateConversationService(
      fakeConversationRepository
    )
    getUserConversationService = new GetUserConversationService(
      fakeConversationRepository
    )
  })

  it("Should return the user's conversations", async () => {
    const newConversation: ICreateConversationData = {
      _id: '234',
      name: 'test',
      picture: 'test',
      isGroup: false,
      users: ['123', '456']
    }

    await createConversationService.execute(newConversation)

    const conversation = await getUserConversationService.execute('123')

    expect(conversation).toHaveLength(1)
  })
  it("Should return null if the user doesn't have any conversations", async () => {
    const conversation = getUserConversationService.execute('asd')

    void expect(conversation).rejects.toBeInstanceOf(AppError)
  })
})
