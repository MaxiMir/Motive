import { Avatar } from '@mui/material'
import { useIntl } from 'react-intl'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface SupportSignProps {
  name: string
}

export function SupportSign({ name }: SupportSignProps) {
  const { formatMessage } = useIntl()
  const supportText = formatMessage({ id: 'common.support' })
  const title = [supportText, name].join(' ')

  return (
    <TooltipArrow title={title}>
      <Avatar sx={{ width: 21, height: 21, fontSize: 12, backgroundColor: 'support.main' }}>
        🙏
      </Avatar>
    </TooltipArrow>
  )
}
