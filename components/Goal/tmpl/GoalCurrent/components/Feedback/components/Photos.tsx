import { PhotoDto } from 'dto'
import AppHeader from 'components/UI/AppHeader'
import AppGallery from 'components/UI/AppGallery'

interface PhotosProps {
  photos: PhotoDto[]
}

export default function Photos({ photos }: PhotosProps): JSX.Element {
  return (
    <>
      <AppHeader name="photo" variant="h6" component="h3" color="primary">
        Photo
      </AppHeader>
      <AppGallery items={photos} />
    </>
  )
}
