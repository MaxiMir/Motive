import { Variant } from '@material-ui/core/styles/createTypography'
import { Typography } from '@material-ui/core/'
import { Characteristic } from 'dto'

interface AppCharacteristicProps {
  name: Characteristic
  variant: Variant
}

const AppCharacteristic = ({ name, variant }: AppCharacteristicProps) => {
  const content = getContent()

  function getContent() {
    switch (name) {
      case 'motivation':
        return '💪'
      case 'creativity':
        return '🧠'
      case 'support':
        return '🙏'
      case 'completed':
        return '🏆'
      case 'abandoned':
        return '🕸'
      default:
        return ''
    }
  }

  return <Typography variant={variant}>{content}</Typography>
}

export default AppCharacteristic
