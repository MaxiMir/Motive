import dynamic from 'next/dynamic'
import { Stack } from '@mui/material'
import { FeedbackDto } from '@modules/feedback'

const Markdown = dynamic(() => import('@components/Markdown'))
const Player = dynamic(() => import('@ui/Player'))
const Gallery = dynamic(() => import('@components/Gallery'))

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
