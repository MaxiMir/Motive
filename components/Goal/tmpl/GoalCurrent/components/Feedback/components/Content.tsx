import dynamic from 'next/dynamic'
import { FeedbackDto } from 'dto'
import AppTypography from 'components/UI/AppTypography'

const AppHeader = dynamic(() => import('components/UI/AppHeader'))
const AppGallery = dynamic(() => import('components/UI/AppGallery'))
const AppVideo = dynamic(() => import('components/UI/AppVideo'))

export default function Content({ text, photos, video }: FeedbackDto): JSX.Element {
  return (
    <>
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
    </>
  )
}
