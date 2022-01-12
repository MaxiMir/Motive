import Image from 'next/image'
import { RenderImageProps } from 'react-photo-gallery'
import { makeStyles } from '@material-ui/core/styles'

export default function AppGalleryPhoto(props: RenderImageProps): JSX.Element {
  const { index, photo, onClick } = props
  const classes = useStyles(props)

  return (
    <div aria-label="open gallery" className={classes.container}>
      <Image
        src={photo.src}
        width={photo.width}
        height={photo.height}
        alt=""
        onClick={(event) => onClick?.(event, { index })}
      />
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
  },
})
