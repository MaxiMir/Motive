import { Box } from '@mui/material'
import { UserBaseDto } from 'dto'
import Info from './components/Info'
import Pointers from './components/Pointers'
import Slide, { Story } from './components/Slide'
import Details from './components/Details'

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
        width: '100vw',
        height: '100%',
        backfaceVisibility: 'hidden',
        left: '100vw',
        transform: 'translateZ(50vw)',
      }}
    >
      <Info user={user} title={title} end={end} onClose={onClose} />
      <Pointers count={count} onClose={onClose} />
      {/* TODO REMOVE slides */}
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
          <Slide story={story} key={story.id} />
        ))}
      </Box>
      <Details user={user} />
    </Box>
  )
}
