import {  Grid, GridItem } from '@chakra-ui/react'
import SearchInput from './search_input'
import ChatPreviewResultContent from './preview_result_content'
import SidebarChatProvider from './context'
import { useSelector } from 'react-redux'
import { AppState } from '../../../redux/store';
import NewGroup from './new_group'

export default function ChatSidebar() {
  const { isNewGroup } = useSelector((state: AppState) => state.chat)
  return (
    <SidebarChatProvider>
      <Grid
        h="100vh"
        w={'full'}
        templateRows="repeat(10, 1fr)"
        borderRight={'1px solid #eaeff6'}
      >
        <GridItem rowSpan={0} colSpan={1}>
          <SearchInput />
        </GridItem>
        <GridItem rowSpan={9} colSpan={1} p={'20px'}>
          {isNewGroup ? <NewGroup/> : <ChatPreviewResultContent />}
        </GridItem>
      </Grid>
    </SidebarChatProvider>
  )
}
