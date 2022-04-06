import dynamic from 'next/dynamic'
import { Button, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'

const AppImage = dynamic(() => import('components/UI/AppImage'))
const LocalImage = dynamic(() => import('./components/LocalImage'))

export interface PhotoButtonProps {
  tmpl: 'button'
  image: File | string
  disabled: boolean
  onClick: () => void
}

export default function PhotoButton({ image, disabled, onClick }: PhotoButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button color="secondary" variant="outlined" className={classes.button} component="div">
      <AppBox justifyContent="center" alignItems="center" className={classes.content} position="relative">
        {image instanceof File ? (
          <LocalImage file={image} />
        ) : (
          <AppImage src={image} layout="fill" objectFit="contain" />
        )}
        <IconButton className={classes.remove} aria-label="Remove photo" disabled={disabled} onClick={onClick}>
          <AppIcon name="cancel" color="secondary" />
        </IconButton>
      </AppBox>
    </Button>
  )
}

const useStyles = makeStyles({
  button: {
    position: 'relative',
    width: '100%',
    aspectRatio: '3/4',
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  remove: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
})
