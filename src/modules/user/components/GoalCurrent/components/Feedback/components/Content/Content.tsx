import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { FeedbackDto } from '@dto'

const AppPlayer = dynamic(() => import('@ui/AppPlayer'))
const AppMarkdown = dynamic(() => import('@ui/AppMarkdown'))
const Gallery = dynamic(() => import('./components/Gallery'))

interface ContentProps {
  feedback: FeedbackDto
}

function Content({ feedback }: ContentProps) {
  const { text, photos, video } = feedback

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {text && <AppMarkdown text={text} />}
      {photos?.length && <Gallery photos={photos} />}
      {video && <AppPlayer url={video} width="100%" height="auto" />}
    </Box>
  )
}

export default Content