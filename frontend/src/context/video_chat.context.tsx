import { ReactNode, useRef } from 'react'

import React, { createContext, useContext, useEffect, useState } from 'react'
import Peer, { Instance } from 'simple-peer'
import {
  getConversationId,
  getConversationName
  // getConversationId
} from '../components/chat/sidebar/preview_result_content/utils'
import { getConversationPicture } from '../components/chat/utils'
import { useSocket } from './socket.context'
import { useSelector } from 'react-redux'
import { AppState } from '../redux/store'
import { User } from '../types/user.type'
import set from 'lodash.set'

interface VideoContextType {
  callUser: () => void
  answerCall: () => void
  endCall: () => void
  show: boolean
  call: ICall | null
  callAccepted: boolean
  stream: MediaStream | null
  myVideo: React.RefObject<HTMLVideoElement>
  userVideo: React.RefObject<HTMLVideoElement>
}

const VideoChatContext = createContext<VideoContextType>({
  callUser: () => {},
  answerCall: () => {},
  endCall: () => {},
  show: false,
  call: null,
  callAccepted: false,
  stream: null,
  myVideo: { current: null },
  userVideo: { current: null }
})

const callData = {
  socketId: '',
  receivingCall: false,
  callEnded: false,
  name: '',
  picture: '',
  signal: '',
  isCallAccepted: false
}

export interface ICall {
  socketId: string
  receivingCall: boolean
  callEnded: boolean
  name: string
  picture: string
  signal: string
  isCallAccepted: boolean
  socketIdFrom?: string
}

export const VideoChatProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const { socket } = useSocket()
  const { activeConversation, user } = useSelector((state: AppState) => ({
    ...state.chat,
    ...state.user
  }))

  const [call, setCall] = useState<ICall>(callData)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [callAccepted, setCallAccepted] = useState(false)
  const myVideo = useRef<HTMLVideoElement>(null)
  const userVideo = useRef<HTMLVideoElement>(null)
  const connectionRef = useRef<Instance | null>(null)
  const [show, setShow] = useState(false)

  useEffect(() => {
    socket?.on('setup socket', (socketId: string) => {
      setCall((prev) => ({
        ...prev,
        socketId
      }))
    })
    socket?.on('call user', (data) => {
      setCall((prev) => ({
        ...prev,
        // socketId: data.from,
        name: data.name,
        picture: data.picture,
        signal: data.signal,
        receivingCall: true
      }))
    })
    socket?.on('end call', () => {
       if (stream) {
         stream.getTracks().forEach((track) => {
           track.stop()
         })
       }

       (myVideo.current!.srcObject as MediaStream)
         .getTracks()
         .forEach((track) => {
           track.stop()
         })
  
       setStream(null)

       setShow(false)
       setCall((prev) => ({ ...callData, socketId: prev.socketId }))
       set(userVideo, 'current', null)
       set(myVideo, 'current', null)
       setCallAccepted(false)
    })
  }, [socket])

  const callUser = () => {
    setShow(true)
    navigator?.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream)
        myVideo.current!.srcObject = stream
        setCall((prev) => ({
          ...prev,
          name: getConversationName(
            user as User,
            activeConversation?.users as User[]
          ),
          picture: getConversationPicture(
            user as User,
            activeConversation?.users as User[]
          )
        }))
        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream as MediaStream
        })

        peer.on('signal', (data) => {
          socket?.emit('call user', {
            userToCall: getConversationId(
              user as User,
              activeConversation?.users as User[]
            ),
            signal: data,
            from: call.socketId,
            name: user?.name,
            picture: user?.picture
          })
        })
        peer.on('stream', (stream) => {
          set(userVideo, 'current.srcObject', stream)
        })
        socket?.on('call accepted', (signal) => {
          setCallAccepted(true)
          peer.signal(signal)
        })
        connectionRef.current = peer
      })
  }

  const answerCall = () => {
    setShow(true)
    setCallAccepted(true)

    navigator?.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setStream(stream)
        myVideo.current!.srcObject = stream
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream as MediaStream
        })
        peer.on('signal', (data) => {
          socket?.emit('answer call', {
            signal: data,
            to: call.socketId
          })
        })
        peer.on('stream', (stream) => {
          set(userVideo, 'current.srcObject', stream)
        })

        peer.signal(call.signal)

        connectionRef.current = peer
      })
  }

  const endCall = () => {
    socket?.emit('end call', call.socketId)
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop()
      })
    }
    setStream(null)

    setShow(false)
    setCall((prev) => ({ ...callData, socketId: prev.socketId }))
    set(userVideo, 'current', null)
    setCallAccepted(false)
  }

  return (
    <VideoChatContext.Provider
      value={{
        callUser,
        answerCall,
        endCall,
        show,
        call,
        callAccepted,
        stream,
        myVideo,
        userVideo
      }}
    >
      {children}
    </VideoChatContext.Provider>
  )
}
export const useVideoChat = () => useContext(VideoChatContext)
function get(current: HTMLVideoElement | null, arg1: string) {
  throw new Error('Function not implemented.')
}

