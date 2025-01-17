import { type Server, type Socket } from 'socket.io'
import { type DefaultEventsMap } from 'socket.io/dist/typed-events'

let onlineUsers: Array<{
  userId: string
  socketId: string
}> = []

let usersInCall: Array<{
  from: string
  to: string
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
    io.to(socket.id).emit('setup socket', socket.id)
  })

  socket.on('disconnect', () => {
    onlineUsers = onlineUsers.filter(({ socketId }) => socketId !== socket.id)
    io.emit('get online users', onlineUsers)

    const conversation = usersInCall.find(
      (call) => call.to === socket.id || call.from === socket.id
    )

    if (conversation) {
      const getSocketId =
        conversation?.from === socket.id ? conversation?.to : conversation?.from

      io.to(getSocketId ?? socket.id).emit('end call')

      usersInCall = usersInCall.filter(
        (call) => call.to !== socket.id && call.from !== socket.id
      )
    }
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

    if (userSocketId) {
      usersInCall.push({
        from: callData.from,
        to: userSocketId.socketId
      })
      io.to(userSocketId.socketId).emit('call user', {
        signal: callData.signal,
        from: callData.from,
        name: callData.name,
        picture: callData.picture
      })
    }
  })

  socket.on('answer call', (data: IAnswerCall) => {
    const conversation = usersInCall.find(
      (call) => call.to === data.to || call.from === data.to
    )

    const getSocketId =
      conversation?.from === data.to ? conversation?.to : conversation?.from

    io.to(getSocketId ?? data.to).emit('call accepted', data.signal)
  })

  socket.on('end call', (socketId: string) => {
    const conversation = usersInCall.find(
      (call) => call.to === socketId || call.from === socketId
    )

    const getSocketId =
      conversation?.from === socketId ? conversation?.to : conversation?.from

    io.to(getSocketId ?? socketId).emit('end call')

    usersInCall = usersInCall.filter(
      (call) => call.to !== socketId && call.from !== socketId
    )
  })
}
