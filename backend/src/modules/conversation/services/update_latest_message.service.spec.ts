import 'reflect-metadata'
import CreateConversationService from './create_conversation.service'
import FakeConversationRepository from '../domain/repositories/fakes/fake_conversation_repository'
import UpdateLatestMessageService from './update_latest_message.service'
import { type ICreateConversationData } from '../domain/model/ICreateConversationRequest'

let createConversationService: CreateConversationService
let updateLatestMessageService: UpdateLatestMessageService

describe('UpdateLatestMessageService check', () => {
  beforeEach(() => {
    const fakeConversationRepository = new FakeConversationRepository()
    createConversationService = new CreateConversationService(
      fakeConversationRepository
    )
    updateLatestMessageService = new UpdateLatestMessageService(
      fakeConversationRepository
    )
  })

  it('Validate to update the latest message', async () => {
    const newConversation: ICreateConversationData = {
      _id: '234',
      name: 'test',
      picture: 'test',
      isGroup: false,
      users: ['123', '456']
    }

    const newConversationResult =
      await createConversationService.execute(newConversation)

    expect(newConversationResult).toHaveProperty('latestMessage')
    expect(newConversationResult!.latestMessage).toEqual('')

    const updateConversation = await updateLatestMessageService.execute(
      '234',
      'test'
    )

    expect(updateConversation).toHaveProperty('latestMessage')
    expect(updateConversation!.latestMessage).toEqual('test')
  })
  it("Shouldn't update the latest message if the conversation doesn't exist", async () => {
    const updateConversation = await updateLatestMessageService.execute(
      '234',
      'test'
    )

    expect(updateConversation).toBeNull()
  })
})
