import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { FeedbackDto } from 'shared/api'

const Markdown = dynamic(() => import('shared/ui/markdown'))
const Gallery = dynamic(() => import('shared/ui/gallery'))
const Player = dynamic(() => import('shared/ui/Player'))

interface ContentProps {
  feedback: FeedbackDto
}

function Content({ feedback }: ContentProps) {
  const { text, photos, video } = feedback

  return (
    <Stack spacing={2} flex={1}>
      {photos?.length && <Gallery photos={photos} />}
      {text && <Markdown text={text} />}
      {video && <Player url={video} width="100%" height="auto" />}
    </Stack>
  )
}

export default Content
