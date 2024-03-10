import 'reflect-metadata'
import CreateMessageService from './create_message.service'
import FakeMessageRepository from '../domain/repositories/fake/fake_message_repository'

let createMessageService: CreateMessageService

describe('CreateMessageService check', () => {
  beforeEach(() => {
    const fakeMessageRepository = new FakeMessageRepository()
    createMessageService = new CreateMessageService(fakeMessageRepository)
  })

  it('Should be able to create a new message', async () => {
    const newMessage = {
      _id: 'test_id',
      sender: 'test_sender',
      message: 'test_message',
      conversation: 'test_conversation',
      files: []
    }
    const message = await createMessageService.execute(newMessage)

    expect(message).toEqual(newMessage)
  })
})
