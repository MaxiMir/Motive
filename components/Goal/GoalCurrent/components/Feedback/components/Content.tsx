import dynamic from 'next/dynamic'
import { Box } from '@mui/material'
import { FeedbackDto } from 'dto'

const GalleryViewer = dynamic(() => import('components/Gallery/GalleryViewer'))
const AppVideo = dynamic(() => import('components/UI/AppVideo'))
const AppMarkdown = dynamic(() => import('components/UI/AppMarkdown'))

interface ContentProps {
  feedback: FeedbackDto
}

export default function Content({ feedback }: ContentProps) {
  const { text, photos, video } = feedback

  return (
    <Box display="flex" flexDirection="column" gap={2} flex={1}>
      {text && <AppMarkdown text={text} />}
      {photos?.length && <GalleryViewer photos={photos} />}
      {video && <AppVideo video={video} />}
    </Box>
  )
}
