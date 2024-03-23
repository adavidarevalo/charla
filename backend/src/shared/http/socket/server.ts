import { type Server, type Socket } from 'socket.io'
import { type DefaultEventsMap } from 'socket.io/dist/typed-events'

let onlineUsers: Array<{
  userId: string
  socketId: string
}> = []

interface IAnswerCall {
  to: string
  signal: string
}

export default (
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
): void => {
  socket.on('join', async (userId: string) => {
    await socket.join(userId)
    if (!onlineUsers.some((user) => user.userId === userId)) {
      onlineUsers.push({
        userId,
        socketId: socket.id
      })
    }
    io.emit('get online users', onlineUsers)
    io.emit('setup socket', socket.id)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(({ socketId }) => socketId !== socket.id)
    io.emit('get online users', onlineUsers)
  })

  socket.on('join conversation', async (conversationId: string) => {
    await socket.join(conversationId)
  })

  socket.on('send message', (message) => {
    const conversation = message.conversation
    if (!conversation.users) return

    conversation.users.forEach((user: { _id: string }) => {
      if (user._id === message.sender._id) return
      socket.in(user._id).emit('receive message', message)
    })
  })

  socket.on('typing', (conversationId: string) => {
    socket.in(conversationId).emit('typing', conversationId)
  })

  socket.on('stop typing', (conversationId: string) => {
    socket.in(conversationId).emit('stop typing', conversationId)
  })

  socket.on('call user', (callData) => {
    const userId = callData.userToCall
    const userSocketId = onlineUsers.find((user) => user.userId === userId)
    console.log('🚀 ~ socket.on ~ userSocketId:', userSocketId)

    if (userSocketId) {
      io.to(userSocketId.socketId).emit('call user', {
        signal: callData.signal,
        from: callData.from,
        name: callData.name,
        picture: callData.picture
      })
    }
  })

  socket.on('answer call', (data: IAnswerCall) => {
    io.to(data.to).emit('call accepted', data.signal)
  })

  socket.on('end call', (socketId: string) => {
    io.to(socketId).emit('end call')
  })
}
