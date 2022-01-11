import dynamic from 'next/dynamic'
import { FeedbackDto } from 'dto'
import AppBox from 'components/UI/AppBox'

const Text = dynamic(() => import('./components/Text'))
const AppHeader = dynamic(() => import('components/UI/AppHeader'))
const AppGallery = dynamic(() => import('components/UI/AppGallery'))
const AppVideo = dynamic(() => import('components/UI/AppVideo'))

interface FeedbackProps {
  feedback: FeedbackDto
}

export default function Feedback({ feedback }: FeedbackProps): JSX.Element {
  const { text, photos, video } = feedback

  return (
    <AppBox flexDirection="column" spacing={2} flex={1}>
      {text && <Text text={text} />}
      {photos?.length && (
        <>
          <AppHeader name="photo" variant="h6" component="h3" color="primary">
            Photo
          </AppHeader>
          <AppGallery items={photos} />
        </>
      )}
      {video && (
        <>
          <AppHeader name="video" variant="h6" component="h3" color="primary">
            Video
          </AppHeader>
          <AppVideo video={video} key={video} />
        </>
      )}
    </AppBox>
  )
}
