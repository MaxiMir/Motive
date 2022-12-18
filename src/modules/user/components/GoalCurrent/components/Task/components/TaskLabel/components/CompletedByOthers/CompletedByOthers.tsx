import { Tooltip } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'
import { useMessages } from './hooks/useMessages'

function CompletedByOthers() {
  const messages = useMessages()

  return (
    <Tooltip arrow title={messages.title}>
      <span>
        <AppEmoji name="fire" onlyEmoji />
      </span>
    </Tooltip>
  )
}

export default CompletedByOthers
