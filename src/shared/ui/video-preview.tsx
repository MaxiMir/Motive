import { Box, IconButton } from '@mui/material'
import { styled } from '@mui/system'
import { useIntl } from 'react-intl'
import Icon from 'shared/ui/icon'
import Player from 'shared/ui/player'
import TooltipArrow from 'shared/ui/tooltip-arrow'

interface VideoPreviewProps {
  video: Blob | MediaSource
  disabled: boolean
  onRemove: () => void
}

function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps) {
  const { formatMessage } = useIntl()
  const removeText = formatMessage({ id: 'component.video-preview.label' })
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
      <TooltipArrow title={removeText}>
        <StyledIconButton disabled={disabled} onClick={onRemove}>
          <Icon name="cancel" />
        </StyledIconButton>
      </TooltipArrow>
    </Box>
  )
}

const StyledIconButton = styled(IconButton)({
  position: 'absolute',
  top: -8,
  right: -8,
})

export default VideoPreview
