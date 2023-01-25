import { Box, IconButton } from '@mui/material'
import Icon from '@shared/ui/Icon'
import Player from '@shared/ui/Player'
import TooltipArrow from '@shared/ui/styled/TooltipArrow'
import { useMessages } from './lib/hooks/useMessages'

interface VideoPreviewProps {
  video: Blob | MediaSource
  disabled: boolean
  onRemove: () => void
}

function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps) {
  const messages = useMessages()
  const url = URL.createObjectURL(video)

  return (
    <Box position="relative" sx={{ background: '#000000' }}>
      <Player
        url={url}
        width="100%"
        height="auto"
        style={{
          border: '1px solid rgba(255, 224, 178, 0.5)',
          borderRadius: 4,
          overflow: 'hidden',
        }}
      />
      <TooltipArrow title={messages.removeText}>
        <IconButton
          disabled={disabled}
          sx={{
            position: 'absolute',
            top: -8,
            right: -8,
          }}
          onClick={onRemove}
        >
          <Icon name="cancel" />
        </IconButton>
      </TooltipArrow>
    </Box>
  )
}

export default VideoPreview
