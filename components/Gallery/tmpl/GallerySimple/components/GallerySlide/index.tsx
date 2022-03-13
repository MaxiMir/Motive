import dynamic from 'next/dynamic'
import { RenderImageProps } from 'react-photo-gallery'
import { makeStyles } from '@material-ui/core/styles'
import GalleryImage from './components/GalleryImage'

const AppImageZoom = dynamic(() => import('components/UI/AppImageZoom'))

interface GalleryPhotoProps extends RenderImageProps {
  animation?: boolean
}

export default function GallerySlide({ animation, ...props }: GalleryPhotoProps): JSX.Element {
  const classes = useStyles(props)

  return (
    <div aria-label="open gallery" className={classes.container}>
      {!animation ? (
        <GalleryImage {...props} />
      ) : (
        <AppImageZoom>
          <GalleryImage {...props} />
        </AppImageZoom>
      )}
    </div>
  )
}

const useStyles = makeStyles({
  container: {
    display: 'block',
    width: (props: RenderImageProps) => props.photo.width,
    height: (props: RenderImageProps) => props.photo.height,
    borderRadius: 8,
    overflow: 'hidden',
    cursor: (props: RenderImageProps) => (!props.onClick ? undefined : 'pointer'),
    margin: (props: RenderImageProps) => props.margin,
    position: (props: RenderImageProps) => (props.direction === 'column' ? 'absolute' : undefined),
    top: (props: RenderImageProps) => (props.direction === 'column' ? props.top : undefined),
    left: (props: RenderImageProps) => (props.direction === 'column' ? props.left : undefined),
    border: '1px solid #262623',
  },
})
