import * as React from 'react'
import { useState } from 'react'
import UserServices from '../../../service/user'
import { AppState } from '../../../redux/store'
import { useSelector } from 'react-redux'

export interface ISearchedResult {
  _id: string
  name: string
  picture: string
  status: string
}

const initialState = {
  handleSearch: async () => {},
  searchedResult: [],
  isSearching: false
}

interface IContext {
  handleSearch: (searchQuery: string) => Promise<void>
  searchedResult: ISearchedResult[]
  isSearching: boolean
}

const SidebarChatContext = React.createContext<IContext>(initialState)

const SidebarChatProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useSelector((state: AppState) => state.user)
  const [searchedResult, setSearchedResult] = useState<ISearchedResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery === '') {
      setIsSearching(false)
      setSearchedResult([])
      return
    }
    const data = await UserServices.searchUser(searchQuery, user.token)
    setIsSearching(true)
    setSearchedResult(data)
  }

  return (
    <SidebarChatContext.Provider
      value={{
        handleSearch,
        searchedResult,
        isSearching
      }}
    >
      {children}
    </SidebarChatContext.Provider>
  )
}

export const useSidebarChat = () => React.useContext(SidebarChatContext)

export default SidebarChatProvider
