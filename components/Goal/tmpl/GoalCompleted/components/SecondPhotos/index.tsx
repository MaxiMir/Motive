import { PhotoDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppAccordion from 'components/UI/AppAccordion'
import AppBox from 'components/UI/AppBox'
import Gallery from 'components/Gallery'
import i18n from './i18n'

interface SecondPhotosProps {
  id: number
  photos: PhotoDto[]
  locale: Locale
}

export default function SecondPhotos({ id, photos, locale }: SecondPhotosProps): JSX.Element {
  const { header, ariaControls } = i18n[locale]

  return (
    <AppAccordion
      name="photo"
      header={header}
      id={`completed-goal-photos-${id}`}
      ariaControls={ariaControls}
      details={
        <AppBox display="block" flex={1}>
          <Gallery tmpl="simple" photos={photos} animation />
        </AppBox>
      }
    />
  )
}