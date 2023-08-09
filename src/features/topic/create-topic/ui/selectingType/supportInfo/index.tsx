import { Alert, Collapse } from '@mui/material'
import { SupportRules } from 'entities/discussion'

interface SupportInfoProps {
  open: boolean
  onClose: () => void
}

export function SupportInfo({ open, onClose }: SupportInfoProps) {
  return (
    <Collapse in={open}>
      <Alert severity="info" onClose={onClose}>
        <SupportRules />
      </Alert>
    </Collapse>
  )
}
