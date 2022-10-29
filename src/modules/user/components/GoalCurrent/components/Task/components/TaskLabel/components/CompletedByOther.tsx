import { useIntl } from 'react-intl'
import { Tooltip } from '@mui/material'
import AppEmoji from '@ui/AppEmoji'

export default function CompletedByOther() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.user.competed-by-other.title' })

  return (
    <Tooltip arrow title={title}>
      <span>
        <AppEmoji name="fire" onlyEmoji />
      </span>
    </Tooltip>
  )
}
