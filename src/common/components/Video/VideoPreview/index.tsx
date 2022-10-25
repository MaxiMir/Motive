import { useIntl } from 'react-intl'
import { Box, IconButton } from '@mui/material'
import AppIcon from 'src/common/ui/AppIcon'
import AppPlayer from 'src/common/ui/AppPlayer'
import i18n from './i18n'

export interface VideoPreviewProps {
  video: Blob | MediaSource
  disabled: boolean
  onRemove: () => void
}

export default function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps) {
  const { locale } = useIntl()
  const url = URL.createObjectURL(video)
  const { label } = i18n[locale]

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
