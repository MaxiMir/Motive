import { MutableRefObject } from 'react'
import { Box, Portal } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from '@features/user'
import { Story } from '@features/stories/components/Stories/types'
import { useSlowClose } from './hooks/useSlowClose'
import StoryViewer from './components/StoryViewer'

interface StoryProps {
  stories: Story[]
  user: UserBaseDto
  title: string
  date: string
  fullscreen: {
    ref: MutableRefObject<HTMLDivElement | null>
    supported: boolean
  }
  onClose: () => void
}

function Stories({ stories, title, date, user, fullscreen, onClose }: StoryProps) {
  const [closing, closeSlow] = useSlowClose(onClose)

  return (
    <Portal>
      <Box
        id="zuck-modal"
        ref={fullscreen.ref}
        role="dialog"
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100dvw',
          height: '100dvh',
          backgroundColor: 'underlay',
          zIndex: 9999,
          userSelect: 'none',
          overflow: 'hidden',
          transformOrigin: 'center',
          transition: '0.25s',
          transform: closing ? 'translateY(100%)' : undefined,
          animation: fullscreen.supported ? undefined : 'open 0.25s ease-out',
          '@keyframes open': {
            from: {
              transform: 'scale(0.01)',
            },
            to: {
              transform: 'scale(1)',
            },
          },
        }}
      >
        <Container
          id="zuck-modal-content"
          sx={{
            width: '100dvw',
            perspective: '1000dvw',
            transform: 'scale(0.95)',
            perspectiveOrigin: '50% 50%',
            transition: '0.3s',
          }}
        >
          <Container
            id="zuck-modal-slider-stories"
            sx={{
              width: '300dvw',
              transform: 'rotateY(0deg)',
              transformStyle: 'preserve-3d',
              transitionDuration: '300ms',
            }}
          >
            <StoryViewer
              stories={stories}
              user={user}
              title={title}
              date={date}
              onClose={closeSlow}
            />
          </Container>
        </Container>
      </Box>
    </Portal>
  )
}

const Container = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  height: '100%',
})

export default Stories
