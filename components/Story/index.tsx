import { Box, GlobalStyles } from '@mui/material'
import { UserBaseDto } from 'dto'
import { useCloseWithAnimation } from './hook'
import Header from './components/Header'
import Content from './components/Content'
import Details from './components/Details'
import Pointers from './components/Pointers'

export interface Moment {
  id: number
  url: string
  title: string
  started: string
  end: string
}

interface StoryProps {
  user: UserBaseDto
  moments: Moment[]
  onClose: () => void
}

export default function Story({ moments, user, onClose }: StoryProps) {
  const [closing, onCloseCombine] = useCloseWithAnimation(onClose)
  const moment = moments[0]

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
          <Box
            className="story-viewer viewing"
            sx={{
              backfaceVisibility: 'hidden',
              left: '100vw',
              transform: 'translateZ(50vw)',
            }}
          >
            <Header user={user} title={moment.title} end={moment.end} onClose={onCloseCombine} />
            <Pointers count={moments.length} />
            {/* <Content user={user} /> */}
            {/* <Details user={user} /> */}
          </Box>
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
