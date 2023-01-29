import { Stack, Typography } from '@mui/material'
import { useIntl } from 'react-intl'

export function Slogan() {
  const { formatMessage } = useIntl()
  const subheader = formatMessage({ id: 'page.home.subheader' })

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      flex={1}
      sx={{ backgroundColor: 'common.white' }}
    >
      <Stack alignItems="center">
        <Typography
          variant="h4"
          align="center"
          component="h1"
          sx={({ palette }) => ({
            background: `linear-gradient(90deg, ${palette.motivation.main}, ${palette.creativity.dark}, ${palette.support.dark})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            color: palette.support.dark,
            fontWeight: 500,
          })}
        >
          {process.env.NEXT_PUBLIC_APP_NAME}
        </Typography>
        <Typography variant="caption" align="center" sx={{ color: '#A1A1A6' }}>
          {subheader}
        </Typography>
      </Stack>
    </Stack>
  )
}
