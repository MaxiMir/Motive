import { Box } from '@mui/material'
import { Story } from '@features/stories/types'
import { UserBaseDto } from '@shared/api/dto'
import Bottom from './ui/bottom/Bottom'
import Pointers from './ui/pointers/Pointers'
import Slide from './ui/Slide'
import Top from './ui/top/Top'

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
      width="100dvw"
      height="100%"
      left="100dvw"
      className="story-viewer viewing"
      sx={{
        backfaceVisibility: 'hidden',
        transform: 'translateZ(50dvw)',
      }}
    >
      <Top user={user} title={title} date={date} onClose={onClose} />
      <Pointers count={count} onClose={onClose} />
      <Box
        position="absolute"
        top={0}
        bottom={0}
        width="100dvw"
        height="100%"
        overflow="hidden"
        className="slides"
      >
        {stories.map((story) => (
          <Slide story={story} key={story.src} />
        ))}
      </Box>
      {false && <Bottom />}
    </Box>
  )
}

export default StoryViewer
