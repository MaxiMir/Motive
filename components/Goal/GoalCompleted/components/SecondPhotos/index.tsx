import { Box } from '@mui/material'
import { PhotoDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppAccordion from 'components/UI/AppAccordion'
import GallerySimple from 'components/Gallery/GallerySimple'
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
        <Box flex={1}>
          <GallerySimple photos={photos} animation />
        </Box>
      }
    />
  )
}
