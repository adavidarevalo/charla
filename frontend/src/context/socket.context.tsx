import { ReactNode } from 'react';
import {apiEndpoint} from "./../utils/variables"


import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

interface SocketContextType {
  socket: Socket | null
}

const SocketContext = createContext<SocketContextType>({ socket: null })


export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  
  useEffect(() => {
    const newSocket = io(`${apiEndpoint?.replace('/api/v1', '')}`) // Ajusta la URL del servidor de Socket.io según sea necesario
    setSocket(newSocket)
    
    return () => {
      newSocket.disconnect()
    }
  }, [])
  
  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  )
}
export const useSocket = () => useContext(SocketContext)

