import { ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import Draggable from 'react-draggable'
import { Resizable } from 're-resizable'
import Call from './call'
import RingRing from './ring_ring'
import { useVideoChat } from '../../../context/video_chat.context'

interface VideoCallDragProps {
  children: ReactNode
}

export default function VideoCallLayoutDrag({ children }: VideoCallDragProps) {
  const { show, call, callAccepted } = useVideoChat()
  return (
    <Box position={'absolute'} top={0} left={0} w={'100vw'} h={'100vh'}>
      {children}

      <Draggable handle="section" bounds="parent">
        {call?.receivingCall && callAccepted === false ? (
          <Box
            as={'section'}
            w={'370px'}
            cursor={'pointer'}
            position={'absolute'}
            top={0}
            left={'50%'}
          >
            <RingRing />
          </Box>
        ) : (
          <Resizable
            style={{
              position: 'absolute',
              top: '50px',
              left: '50%',
              background: '#e1e8fe',
              padding: '5px',
              borderRadius: '20px',
              visibility:
                (show || call?.signal) && !call?.callEnded
                  ? 'initial'
                  : 'hidden'
            }}
            defaultSize={{
              width: 400,
              height: 600
            }}
            minWidth={300}
            minHeight={400}
            maxWidth={'100vw'}
            maxHeight={'100vh'}
          >
            <section style={{ width: '100%', height: '100%' }}>
              <Call />
            </section>
          </Resizable>
        )}
      </Draggable>
    </Box>
  )
}
