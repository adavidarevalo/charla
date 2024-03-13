import ChatContent from './../components/chat/content'
import ChatSidebar from './../components/chat/sidebar'
import { Grid, GridItem } from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, AppState } from '../redux/store'
import { useEffect } from 'react'
import { getConversations } from '../redux/actions/chat.actions'
import MenuLayout from '../components/layout/menu_layout';

export default function ChatPage() {
  const dispatch = useDispatch<AppDispatch>()

  const { user } = useSelector((state: AppState) => state.user)

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversations(user?.token))
    }
  }, [user?.token, dispatch])

  return (
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
  )
}