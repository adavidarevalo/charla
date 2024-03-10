import 'reflect-metadata'
import FakeMessageRepository from '../domain/repositories/fake/fake_message_repository'
import CreateMessageService from './create_message.service'
import GetMessageService from './get_messages.service'

let createMessageService: CreateMessageService
let getMessageService: GetMessageService

describe('GetMessageService Check', () => {
  beforeEach(() => {
    const fakeMessageRepository = new FakeMessageRepository()
    createMessageService = new CreateMessageService(fakeMessageRepository)
    getMessageService = new GetMessageService(fakeMessageRepository)
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

    const messageResult = await getMessageService.execute('test_conversation')

    expect(messageResult).toHaveLength(1)
    expect(messageResult![0]).toEqual(newMessage)
  })
})
