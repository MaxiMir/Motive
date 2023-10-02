import { Tabs } from '@mui/material'
import { ConfirmationDto } from 'shared/api'
import Story from './story'

interface ConfirmationsProps {
  confirmations: ConfirmationDto[]
}

function Confirmations({ confirmations }: ConfirmationsProps) {
  return (
    <Tabs
      value={0}
      variant="scrollable"
      scrollButtons="auto"
      TabIndicatorProps={{
        style: {
          display: 'none',
        },
      }}
    >
      {confirmations.map((confirmation) => (
        <Story confirmation={confirmation} key={confirmation.id} />
      ))}
    </Tabs>
  )
}

export default Confirmations
