import { RenderImageProps } from 'react-photo-gallery'
import { Box } from '@mui/material'
import useLocale from 'hooks/useLocale'
import GalleryImage from './components/GalleryImage'
import i18n from './i18n'

interface GalleryPhotoProps extends RenderImageProps {
  animation?: boolean
}

export default function GallerySlide({ animation, ...props }: GalleryPhotoProps) {
  const { locale } = useLocale()
  const { ariaLabel } = i18n[locale]

  return (
    <Box
      aria-label={ariaLabel}
      sx={{
        width: props.photo.width,
        height: props.photo.height,
        margin: props.margin && `${props.margin}px`,
        overflow: 'hidden',
        cursor: props.onClick && 'pointer',
        position: props.direction === 'column' ? 'absolute' : undefined,
        top: props.direction === 'column' ? props.top : undefined,
        left: props.direction === 'column' ? props.left : undefined,
        borderRadius: 1,
      }}
    >
      <GalleryImage {...props} />
    </Box>
  )
}
