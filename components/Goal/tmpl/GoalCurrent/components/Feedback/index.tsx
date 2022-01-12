import dynamic from 'next/dynamic'
import { FeedbackDto } from 'dto'
import AppBox from 'components/UI/AppBox'

const Text = dynamic(() => import('./components/Text'))
const Photos = dynamic(() => import('./components/Photos'))
const Video = dynamic(() => import('./components/Video'))

interface FeedbackProps {
  feedback: FeedbackDto
}

export default function Feedback({ feedback }: FeedbackProps): JSX.Element {
  const { text, photos, video } = feedback

  return (
    <AppBox flexDirection="column" spacing={2} flex={1}>
      {text && <Text text={text} />}
      {photos?.length && <Photos photos={photos} />}
      {video && <Video video={video} />}
    </AppBox>
  )
}
