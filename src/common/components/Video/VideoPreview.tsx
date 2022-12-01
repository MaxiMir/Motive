import { useIntl } from 'react-intl'
import { Box, IconButton } from '@mui/material'
import AppIcon from '@ui/AppIcon'
import AppPlayer from '@ui/AppPlayer'

interface VideoPreviewProps {
  video: Blob | MediaSource
  disabled: boolean
  onRemove: () => void
}

function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps) {
  const { formatMessage } = useIntl()
  const label = formatMessage({ id: 'component.video-preview.label' })
  const url = URL.createObjectURL(video)

  return (
    <Box sx={{ position: 'relative', background: '#000000' }}>
      <AppPlayer
        url={url}
        width="100%"
        height="auto"
        style={{
          border: '1px solid rgba(255, 224, 178, 0.5)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      />
      <IconButton
        aria-label={label}
        disabled={disabled}
        sx={{
          position: 'absolute',
          top: -8,
          right: -8,
        }}
        onClick={onRemove}
      >
        <AppIcon name="cancel" />
      </IconButton>
    </Box>
  )
}

export default VideoPreview
