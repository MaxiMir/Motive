import { Alert } from '@mui/material'
import Icon from 'shared/ui/Icon'
import { useAlertSetup } from './lib'

interface HintProps {
  value: number
}

function Hint({ value }: HintProps) {
  const { color, icon, text } = useAlertSetup(value)

  return (
    <Alert icon={<Icon name={icon} />} color={color}>
      {text}
    </Alert>
  )
}

export default Hint
