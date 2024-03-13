import {  Grid, GridItem } from '@chakra-ui/react'
import FindChatInput from './find_chat_input'
import ChatConversations from './conversations'
import SidebarChatProvider from './context'

export default function ChatSidebar() {
  return (
    <SidebarChatProvider>
      <Grid
        h="100vh"
        w={'full'}
        templateRows="repeat(10, 1fr)"
        borderRight={'1px solid #eaeff6'}
      >
        <GridItem rowSpan={0} colSpan={1}>
          <FindChatInput />
        </GridItem>
        <GridItem rowSpan={9} colSpan={1} p={'20px'}>
          <ChatConversations />
        </GridItem>
      </Grid>
    </SidebarChatProvider>
  )
}
