import { Box } from '@mui/material'
import { UserBaseDto } from 'dto'
import Header from './components/Header'
import Pointers from './components/Pointers'
import Slide, { Story } from './components/Slide'

interface StoryViewerProps {
  stories: Story[]
  user: UserBaseDto
  count: number
  onClose: () => void
}

export default function StoryViewer({ stories, user, count, onClose }: StoryViewerProps) {
  const [{ title, end }] = stories

  return (
    <Box
      className="story-viewer viewing"
      sx={{
        backfaceVisibility: 'hidden',
        left: '100vw',
        transform: 'translateZ(50vw)',
      }}
    >
      <Header user={user} title={title} end={end} onClose={onClose} />
      <Pointers count={count} />
      <Box
        className="slides"
        sx={{
          top: 0,
          bottom: 0,
          position: 'absolute',
          overflow: 'hidden',
        }}
      >
        {stories.map((story) => (
          <Slide story={story} key={story.id} />
        ))}
      </Box>
    </Box>
  )
}
