import { Stack } from '@mui/material'
import dynamic from 'next/dynamic'
import { useDetectSafari } from 'entities/device'
import { FeedbackDto } from 'shared/api'

const Markdown = dynamic(() => import('shared/ui/markdown'))
const Gallery = dynamic(() => import('shared/ui/gallery'))
const Player = dynamic(() => import('shared/ui/Player'))

interface ContProps {
  feedback: FeedbackDto
}

function Cont({ feedback }: ContProps) {
  const { text, photos, video } = feedback
  const safari = useDetectSafari()

  return (
    <Stack gap={2} flex={1}>
      {photos?.length && <Gallery photos={photos} />}
      {text && <Markdown text={text} truncate={!safari} />}
      {video && <Player url={video} width="100%" height="auto" />}
    </Stack>
  )
}

export default Cont
