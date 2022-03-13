import { PhotoDto } from 'dto'
import AppAccordion from 'components/UI/AppAccordion'
import AppBox from 'components/UI/AppBox'
import Gallery from 'components/Gallery'

interface SecondPhotosProps {
  id: number
  photos: PhotoDto[]
}

export default function SecondPhotos({ id, photos }: SecondPhotosProps): JSX.Element {
  return (
    <AppAccordion
      name="photo"
      header="Photos"
      id={`completed-goal-photos-${id}`}
      ariaControls="completed-goal-photos"
      details={
        <AppBox display="block" flex={1}>
          <Gallery tmpl="simple" photos={photos} animation />
        </AppBox>
      }
    />
  )
}
