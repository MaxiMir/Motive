import AppHeader from 'components/UI/AppHeader'
import AppVideo from 'components/UI/AppVideo'

interface VideoProps {
  video: string
}

export default function Video({ video }: VideoProps): JSX.Element {
  return (
    <>
      <AppHeader name="video" variant="h6" component="h3" color="primary">
        Video
      </AppHeader>
      <AppVideo video={video} />
    </>
  )
}
