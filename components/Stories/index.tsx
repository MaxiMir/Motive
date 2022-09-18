import { MutableRefObject } from 'react'
import { Box, GlobalStyles } from '@mui/material'
import { styled } from '@mui/system'
import { UserBaseDto } from 'dto'
import { useSlowClose } from './hook'
import StoryViewer from './components/StoryViewer'
import { Story } from './components/StoryViewer/components/Slide'

interface StoryProps {
  stories: Story[]
  user: UserBaseDto
  title: string
  date: string
  fullscreenEnabled: boolean
  fullscreenRef: MutableRefObject<HTMLDivElement | null>
  onClose: () => void
}

export default function Stories({ stories, title, date, user, fullscreenEnabled, fullscreenRef, onClose }: StoryProps) {
  const [closing, closeSlow] = useSlowClose(onClose)

  return (
    <Box
      id="zuck-modal"
      ref={fullscreenRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        background: 'black',
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
          <StoryViewer stories={stories} user={user} title={title} date={date} onClose={closeSlow} />
        </Container>
        <GlobalStyles
          styles={{
            '#__next': {
              overflow: 'hidden',
            },
            // for safari:
            '.apple-hide': {
              visibility: 'hidden',
            },
          }}
        />
      </Container>
    </Box>
  )
}

const Container = styled(Box)({
  position: 'absolute',
  top: 0,
  bottom: 0,
  height: '100%',
})
