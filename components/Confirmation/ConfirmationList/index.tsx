import { Box } from '@mui/material'
import { ConfirmationDto } from 'dto'
import ConfirmationPreview from './components/ConfirmationPreview'

interface ConfirmationListProps {
  confirmations: ConfirmationDto[]
}

export default function ConfirmationList({ confirmations }: ConfirmationListProps) {
  return (
    <Box display="flex" gap={1} overflow="scroll">
      {confirmations.map((confirmation) => (
        <ConfirmationPreview confirmation={confirmation} key={confirmation.id} />
      ))}
    </Box>
  )
}
