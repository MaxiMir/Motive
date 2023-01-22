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
        width={21}
        height={21}
        fontSize={10}
        borderRadius="50%"
        sx={{ backgroundColor: 'support.main' }}
      >
        <AppEmoji name="support" onlyEmoji />
      </Box>
    </TooltipArrow>
  )
}

export default SupportSign
