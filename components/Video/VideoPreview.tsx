import { Box, IconButton } from '@mui/material'
import AppIcon from 'components/UI/AppIcon'
import AppPlayer from 'components/UI/AppPlayer'

export interface VideoPreviewProps {
  video: Blob | MediaSource
  disabled: boolean
  onRemove: () => void
}

export default function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps) {
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
        aria-label="Remove video"
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
