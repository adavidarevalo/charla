import 'reflect-metadata'
import FakeMessageRepository from '../domain/repositories/fake/fake_message_repository'
import CreateMessageService from './create_message.service'
import PopulatedMessageService from './populated_message.service'

let createMessageService: CreateMessageService
let populatedMessageService: PopulatedMessageService

describe('PopulatedMessageService Check', () => {
  beforeEach(() => {
    const fakeMessageRepository = new FakeMessageRepository()
    createMessageService = new CreateMessageService(fakeMessageRepository)
    populatedMessageService = new PopulatedMessageService(fakeMessageRepository)
  })

  it('Should be able to get messages', async () => {
    const newMessage = {
      _id: 'test_id',
      sender: 'test_sender',
      message: 'test_message',
      conversation: 'test_conversation',
      files: []
    }
    await createMessageService.execute(newMessage)

    const messageResult = await populatedMessageService.execute('test_id')

    expect(messageResult).toEqual(newMessage)
  })
})
