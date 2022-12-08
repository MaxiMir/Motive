import { useIntl } from 'react-intl'
import { Box, Tooltip } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'

interface SupportSignProps {
  name: string
}

function SupportSign({ name }: SupportSignProps) {
  const { formatMessage } = useIntl()
  const support = formatMessage({ id: 'common.support' })
  const title = `${support} ${name}`

  return (
    <Tooltip arrow title={title} aria-label={title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 21,
          height: 21,
          backgroundColor: 'support.main',
          borderRadius: '50%',
          fontSize: '0.625rem',
        }}
      >
        <AppEmoji name="support" onlyEmoji />
      </Box>
    </Tooltip>
  )
}

export default SupportSign
