import { Box, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AppVideo from 'components/UI/AppVideo'
import AppIcon from 'components/UI/AppIcon'

export interface VideoPreviewProps {
  tmpl: 'preview'
  video: string
  disabled: boolean
  onRemove: () => void
}

export default function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps): JSX.Element {
  const classes = useStyles()
  const url = URL.createObjectURL(video)

  return (
    <Box className={classes.video}>
      <AppVideo video={url} className={classes.videoPlayer} />
      <IconButton className={classes.remove} aria-label="Remove video" disabled={disabled} onClick={onRemove}>
        <AppIcon name="cancel" />
      </IconButton>
    </Box>
  )
}

const useStyles = makeStyles({
  video: {
    position: 'relative',
    background: '#000000',
  },
  videoPlayer: {
    border: '1px solid rgba(255, 224, 178, 0.5)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  remove: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
})
