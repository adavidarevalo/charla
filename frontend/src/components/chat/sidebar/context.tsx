import * as React from 'react'
import { useState } from 'react';
import UserServices from "./../../../service/user"

const initialState = {
  handleSearch: async() => {}
}

interface IContext {
    handleSearch: (searchQuery: string) => Promise<void>
}

const SidebarChatContext = React.createContext<IContext>(initialState)

const SidebarChatProvider = ({ children }: { children: React.ReactNode }) => {

      const handleSearch = async(searchQuery: string) => {
        if (searchQuery === "") return;
        const data = await UserServices.searchUser(searchQuery)
        console.log("🚀 ~ handleSearch ~ data:", data)
      }

  return (
    <SidebarChatContext.Provider
      value={{

        handleSearch
      }}
    >
      {children}
    </SidebarChatContext.Provider>
  )
}

export const useSidebarChat = () => React.useContext(SidebarChatContext)

export default SidebarChatProvider
