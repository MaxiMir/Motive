import { Box, IconButton } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppIcon from 'components/ui/AppIcon'
import AppPlayer from 'components/ui/AppPlayer'
import i18n from './i18n'

export interface VideoPreviewProps {
  video: Blob | MediaSource
  disabled: boolean
  onRemove: () => void
}

export default function VideoPreview({ video, disabled, onRemove }: VideoPreviewProps) {
  const { locale } = useLocale()
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