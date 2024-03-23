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
  const { show, call, stream, myVideo } = useVideoChat()
  return (
    <Box
      bg={'red'}
      position={'absolute'}
      top={0}
      left={0}
      w={'100vw'}
      h={'100vh'}
    >
      {children}

      <Draggable handle="section" bounds="parent">
        <Resizable
          style={{
            position: 'absolute',
            top: '50px',
            left: '50%',
            background: 'blue',
            padding: '5px',
            borderRadius: '20px',
            visibility: (show || call?.signal) && !call?.callEnded ? 'initial' : 'hidden'
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
        {/* <>
              <section
                style={{
                  position: 'absolute',
                  top: 0,
                  borderRadius: '20px'
                }}
              >
                <RingRing />
              </section>
    
            </> */}

        {/* <section
            style={{
              cursor: 'pointer',
              background: 'red',
              borderRadius: '20px'
            }}
          >
            <strong>I can only be moved within my offsetParent.</strong>
            <br />
            <br />
            <Box w={10} h={10} bg={'black'} className="cursor"></Box>
            Both parent padding and child margin work properly.
          </section> */}
        {/* </Resizable> */}
      </Draggable>
    </Box>
  )
}
