import { useTheme } from '@mui/material'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'
import AppTooltip from 'components/UI/AppTooltip'

interface SupportSignProps {
  name: string
}

export default function SupportSign({ name }: SupportSignProps): JSX.Element {
  const theme = useTheme()
  const title = `Support ${name}`

  return (
    <AppTooltip title={title} aria-label={title}>
      <AppBox
        justifyContent="center"
        alignItems="center"
        sx={{
          width: 21,
          height: 21,
          background: theme.characteristic.support.main,
          borderRadius: '50%',
        }}
      >
        <AppEmoji name="support" onlyEmoji />
      </AppBox>
    </AppTooltip>
  )
}
