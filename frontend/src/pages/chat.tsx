import ChatContent from './../components/chat/content'
import ChatSidebar from './../components/chat/sidebar'
import { Grid, GridItem } from '@chakra-ui/react'
import MenuLayout from '../components/layout/menu_layout';
import VideoCallDrag from '../components/chat/video_call/layout_drag';
import { ChatHoc } from '../hocs/chat';
import { VideoChatProvider } from '../context/video_chat.context';

export default function ChatPage() {
  return (
    <ChatHoc>
      <VideoChatProvider>
        <VideoCallDrag>
          <MenuLayout>
            <Grid
              w={'full'}
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              bg={'#F9FAFC'}
              rounded={'20px'}
            >
              <GridItem colSpan={1}>
                <ChatSidebar />
              </GridItem>
              <GridItem colSpan={3}>
                <ChatContent />
              </GridItem>
            </Grid>
          </MenuLayout>
        </VideoCallDrag>
      </VideoChatProvider>
    </ChatHoc>
  )
}