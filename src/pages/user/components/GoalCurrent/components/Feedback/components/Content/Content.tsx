import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { FeedbackDto } from '@shared/api/feedback'

const Markdown = dynamic(() => import('@features/markdown'))
const Gallery = dynamic(() => import('@shared/ui/gallery'))
const Player = dynamic(() => import('@shared/ui/Player'))

interface ContentProps {
  feedback: FeedbackDto
}

function Content({ feedback }: ContentProps) {
  const { text, photos, video } = feedback

  return (
    <Stack spacing={2} flex={1}>
      {text && <Markdown text={text} />}
      {photos?.length && <Gallery photos={photos} />}
      {video && <Player url={video} width="100%" height="auto" />}
    </Stack>
  )
}

export default Content