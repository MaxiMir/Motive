import dynamic from 'next/dynamic'
import { FeedbackDto } from 'dto'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

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
      {text && (
        <AppTypography>
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: text.replace(/\\n/g, '<br />') }} />
        </AppTypography>
      )}
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
