import { Locale } from 'hooks/useSetLocale'
import { Alert, Box, Button } from '@mui/material'
import AppIcon from 'components/ui/AppIcon'
import i18n from './i18n'

interface HintProps {
  locale: Locale
  onClick: () => void
}

export default function Hint({ locale, onClick }: HintProps) {
  const { title, button } = i18n[locale]

  return (
    <Alert severity="warning" icon={<>{null}</>} sx={{ mb: 4 }}>
      <Box display="flex" flexDirection="column" gap={1} alignItems="flex-start">
        {title}
        <Button startIcon={<AppIcon name="notifications_active" />} aria-label={button} onClick={onClick}>
          {button}
        </Button>
      </Box>
    </Alert>
  )
}
