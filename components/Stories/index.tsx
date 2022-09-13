import { Box, GlobalStyles } from '@mui/material'
import { UserBaseDto } from 'dto'
import { useSlowClose } from './hook'
import StoryViewer from './components/StoryViewer'
import { Story } from './components/StoryViewer/components/Slide'

interface StoryProps {
  stories: Story[]
  user: UserBaseDto
  onClose: () => void
}

export default function Stories({ stories, user, onClose }: StoryProps) {
  const [closing, setSlowClosing] = useSlowClose(onClose)

  return (
    <Box
      id="zuck-modal"
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
        animation: 'open 0.25s ease-out',
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
      <Box
        id="zuck-modal-content"
        sx={{
          width: '100vw',
          height: '100%',
          top: 0,
          bottom: 0,
          position: 'absolute',
          perspective: '1000vw',
          transform: 'scale(0.95)',
          perspectiveOrigin: '50% 50%',
          transition: '0.3s',
        }}
      >
        <Box
          id="zuck-modal-slider-stories"
          sx={{
            transitionDuration: '300ms',
            transform: 'rotateY(0deg)',
            transformStyle: 'preserve-3d',
          }}
        >
          <StoryViewer stories={stories} user={user} count={stories.length} onClose={setSlowClosing} />
        </Box>
        <GlobalStyles
          styles={{
            '#__next': {
              overflow: 'hidden',
            },
          }}
        />
      </Box>
    </Box>
  )
}
