import { Button, IconButton, makeStyles } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppIcon from 'components/UI/AppIcon'
import Image from './components/Image'

export interface PhotoButtonProps {
  tmpl: 'button'
  file: File
  disabled: boolean
  onClick: () => void
}

export default function PhotoButton({ file, disabled, onClick }: PhotoButtonProps): JSX.Element {
  const classes = useStyles()

  return (
    <Button color="secondary" variant="outlined" className={classes.photo} component="div">
      <AppBox justifyContent="center" alignItems="center" className={classes.photoContent}>
        <Image file={file} />
        <IconButton className={classes.remove} aria-label="remove photo" disabled={disabled} onClick={onClick}>
          <AppIcon name="cancel" color="secondary" />
        </IconButton>
      </AppBox>
    </Button>
  )
}

const useStyles = makeStyles({
  photo: {
    position: 'relative',
    width: 'calc(25% - 12px)',
    height: 120,
  },
  photoContent: {
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
