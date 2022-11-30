import { Box } from '@mui/material'
import { UserBaseDto } from '@dto'
import { Story } from '@components/Stories/types'
import Header from './components/Header'
import Pointers from './components/Pointers'
import Slide from './components/Slide'
import Details from './components/Details'

interface StoryViewerProps {
  stories: Story[]
  user: UserBaseDto
  title: string
  date: string
  onClose: () => void
}

function StoryViewer({ stories, user, title, date, onClose }: StoryViewerProps) {
  const count = stories.length

  return (
    <Box
      className="story-viewer viewing"
      sx={{
        width: '100vw',
        height: '100%',
        backfaceVisibility: 'hidden',
        left: '100vw',
        transform: 'translateZ(50vw)',
      }}
    >
      <Header user={user} title={title} date={date} onClose={onClose} />
      <Pointers count={count} onClose={onClose} />
      <Box
        className="slides"
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          width: '100vw',
          height: '100%',
          overflow: 'hidden',
        }}
      >
        {stories.map((story) => (
          <Slide story={story} key={story.src} />
        ))}
      </Box>
      <Details user={user} />
    </Box>
  )
}

export default StoryViewer
