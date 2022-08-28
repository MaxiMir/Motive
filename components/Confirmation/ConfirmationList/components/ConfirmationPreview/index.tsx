import { Box, Button, Typography, useTheme } from '@mui/material'
import { ConfirmationDto } from 'dto'
import AppAvatar from 'components/ui/AppAvatar'

interface ConfirmationPreviewProps {
  confirmation: ConfirmationDto
}

export default function ConfirmationPreview({ confirmation }: ConfirmationPreviewProps) {
  const theme = useTheme()
  const [mainPhoto] = confirmation.photos

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
      <Box
        sx={{
          padding: '2px',
          background: `linear-gradient(to top left, ${theme.palette.support.dark}, ${theme.palette.creativity.dark})`,
          borderRadius: '50%',
        }}
      >
        <Button
          variant="text"
          color="primary"
          size="small"
          sx={{
            borderRadius: '50%',
            background: theme.palette.background.default,
          }}
        >
          <AppAvatar src={mainPhoto.src} size={65} />
        </Button>
      </Box>
      <Button sx={{ padding: '4px', textTransform: 'none' }}>
        <Typography variant="caption" sx={{ color: 'creativity.light' }}>
          {confirmation.goal.name}
        </Typography>
      </Button>
    </Box>
  )
}
