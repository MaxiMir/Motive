import { Box, Tooltip } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

interface SupportSignProps {
  name: string
}

function SupportSign({ name }: SupportSignProps) {
  const messages = useMessages(name)

  return (
    <Tooltip arrow title={messages.title} aria-label={messages.title}>
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
