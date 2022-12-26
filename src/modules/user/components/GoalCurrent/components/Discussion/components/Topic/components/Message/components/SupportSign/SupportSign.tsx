import { Box } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

interface SupportSignProps {
  name: string
}

function SupportSign({ name }: SupportSignProps) {
  const messages = useMessages(name)

  return (
    <TooltipArrow title={messages.title}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        aria-label={messages.title}
        sx={{
          width: 21,
          height: 21,
          backgroundColor: 'support.main',
          borderRadius: '50%',
          fontSize: 10,
        }}
      >
        <AppEmoji name="support" onlyEmoji />
      </Box>
    </TooltipArrow>
  )
}

export default SupportSign
