import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { getName } from './helper'

interface DateNameProps {
  daysGone: number
}

function DateName({ daysGone }: DateNameProps) {
  const { formatMessage } = useIntl()
  const name = getName(daysGone)
  const shownName = name && formatMessage({ id: `common.${name}` })

  return (
    <Typography variant="h6" component="p">
      <b>{shownName}</b>
    </Typography>
  )
}

export default DateName
