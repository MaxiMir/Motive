import { Box, GlobalStyles } from '@mui/material'
import { UserBaseDto } from 'dto'
import Slide, { Story } from './components/Slide'

interface StoryProps {
  user: UserBaseDto
  stories: Story[]
  onClose: () => void
}

export default function Stories({ user, stories, onClose }: StoryProps) {
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100%',
        background: 'black',
        zIndex: 999999,
        userSelect: 'none',
        overflow: 'hidden',
        animation: 'zoom-in 0.25s ease-out',
        transformOrigin: 'center',
        '@keyframes zoom-in': {
          '0%': {
            transform: 'scale(0.01)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
      }}
      onClick={onClose}
    >
      <Box
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
        <Slide user={user} story={stories[0]} />
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
