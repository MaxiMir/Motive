import { MutableRefObject } from 'react'
import { Box, Portal } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from '@features/user'
import { Story } from '@components/Stories/types'
import { useSlowClose } from './hooks/useSlowClose'
import StoryViewer from './components/StoryViewer'

interface StoryProps {
  stories: Story[]
  user: UserBaseDto
  title: string
  date: string
  fullscreenEnabled: boolean
  fullscreenRef: MutableRefObject<HTMLDivElement | null>
  onClose: () => void
}

function Stories({
  stories,
  title,
  date,
  user,
  fullscreenEnabled,
  fullscreenRef,
  onClose,
}: StoryProps) {
  const [closing, closeSlow] = useSlowClose(onClose)

  return (
    <Portal>
      <Box
        id="zuck-modal"
        ref={fullscreenRef}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100%',
          background: 'underlay',
          zIndex: 9999,
          userSelect: 'none',
          overflow: 'hidden',
          transformOrigin: 'center',
          transition: '0.25s',
          transform: closing ? 'translateY(100%)' : undefined,
          animation: fullscreenEnabled ? undefined : 'open 0.25s ease-out',
          '@keyframes open': {
            from: {
              transform: 'scale(0.01)',
            },
            to: {
              transform: 'scale(1)',
            },
          },
        }}
        role="dialog"
      >
        <Container
          id="zuck-modal-content"
          sx={{
            width: '100vw',
            perspective: '1000vw',
            transform: 'scale(0.95)',
            perspectiveOrigin: '50% 50%',
            transition: '0.3s',
          }}
        >
          <Container
            id="zuck-modal-slider-stories"
            sx={{
              width: '300vw',
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
