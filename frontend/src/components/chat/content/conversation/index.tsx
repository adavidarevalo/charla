import { GridItem } from "@chakra-ui/react";
import HeaderConversation from "./header";
import ChatContent from "./chat_content";
import ChatInput from "./send_message";
import { AppDispatch, AppState } from '../../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { getConversationMessages } from '../../../../redux/actions/chat.actions';


export default function Conversation() {
    const dispatch = useDispatch<AppDispatch>()

    const { activeConversation } = useSelector(
      (state: AppState) => state.chat
    )

    const { user } = useSelector((state: AppState) => state.user)

    useEffect(() => {
      if (activeConversation?._id) {
        const values = {
          token: user?.token,
          conversation_id: activeConversation?._id
        }

        dispatch(getConversationMessages(values))
      }
    }, [activeConversation])

  return (
    <>
      <GridItem rowSpan={0} colSpan={1}>
        <HeaderConversation/>
      </GridItem>
      <GridItem rowSpan={8} colSpan={1}>
        <ChatContent/>
      </GridItem>
      <GridItem rowSpan={1} colSpan={1}>
        <ChatInput/>
      </GridItem>
    </>
  )
}
