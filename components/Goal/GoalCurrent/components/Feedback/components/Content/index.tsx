import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { FeedbackDto } from 'dto'

const Gallery = dynamic(() => import('./components/Gallery'))
const AppPlayer = dynamic(() => import('components/ui/AppPlayer'))
const AppMarkdown = dynamic(() => import('components/ui/AppMarkdown'))

interface ContentProps {
  feedback: FeedbackDto
}

export default function Content({ feedback }: ContentProps) {
  const { text, photos, video } = feedback

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {text && <AppMarkdown text={text} />}
      {photos?.length && <Gallery photos={photos} />}
      {video && <AppPlayer url={video} width="100%" height="auto" />}
    </Box>
  )
}
