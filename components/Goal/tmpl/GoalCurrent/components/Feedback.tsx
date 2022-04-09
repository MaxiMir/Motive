import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { FeedbackDto } from 'dto'

const Gallery = dynamic(() => import('components/Gallery'))
const AppVideo = dynamic(() => import('components/UI/AppVideo'))
const AppMarkdown = dynamic(() => import('components/UI/AppMarkdown'))

interface FeedbackProps {
  feedback: FeedbackDto
}

export default function Feedback({ feedback }: FeedbackProps): JSX.Element {
  const { text, photos, video } = feedback

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {text && <AppMarkdown text={text} />}
      {photos?.length && <Gallery tmpl="viewer" photos={photos} />}
      {video && <AppVideo video={video} />}
    </Box>
  )
}
