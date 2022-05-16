import Image from 'next/image'
import { RenderImageProps } from 'react-photo-gallery'
import { Box } from '@mui/material'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

export default function GallerySlide({ index, photo, margin, top, left, direction, onClick }: RenderImageProps) {
  const { locale } = useLocale()
  const { ariaLabel } = i18n[locale]

  return (
    <Box
      aria-label={ariaLabel}
      sx={{
        width: photo.width,
        height: photo.height,
        margin: margin && `${margin}px`,
        overflow: 'hidden',
        cursor: onClick && 'pointer',
        position: direction === 'column' ? 'absolute' : undefined,
        top: direction === 'column' ? top : undefined,
        left: direction === 'column' ? left : undefined,
        borderRadius: 1,
      }}
    >
      <Image
        src={photo.src}
        alt=""
        width={photo.width}
        height={photo.height}
        onClick={(event) => onClick?.(event, { index })}
      />
    </Box>
  )
}
