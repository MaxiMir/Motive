import dynamic from 'next/dynamic'
import { RenderImageProps } from 'react-photo-gallery'
import useLocale from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import GalleryImage from './components/GalleryImage'
import i18n from './i18n'

const AppImageZoom = dynamic(() => import('components/UI/AppImageZoom'))

interface GalleryPhotoProps extends RenderImageProps {
  animation?: boolean
}

export default function GallerySlide({ animation, ...props }: GalleryPhotoProps): JSX.Element {
  const { locale } = useLocale()
  const { ariaLabel } = i18n[locale]

  return (
    <AppBox
      display={undefined}
      aria-label={ariaLabel}
      sx={{
        width: props.photo.width,
        height: props.photo.height,
        margin: !props.margin ? undefined : `${props.margin}px`,
        overflow: 'hidden',
        borderRadius: 1,
        cursor: !props.onClick ? undefined : 'pointer',
        border: '1px solid #262623',
        position: props.direction === 'column' ? 'absolute' : undefined,
        top: props.direction === 'column' ? props.top : undefined,
        left: props.direction === 'column' ? props.left : undefined,
      }}
    >
      {!animation ? (
        <GalleryImage {...props} />
      ) : (
        <AppImageZoom>
          <GalleryImage {...props} />
        </AppImageZoom>
      )}
    </AppBox>
  )
}
