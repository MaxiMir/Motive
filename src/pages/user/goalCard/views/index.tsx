import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFormatNumber } from 'shared/lib/hooks'

interface ViewsProps {
  views: number
}

export function Views({ views }: ViewsProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const value = formatNumber(views)
  const viewsText = formatMessage({ id: 'common.views', defaultMessage: '' }, { value })

  return (
    <Typography fontSize={13} color="zen.silent">
      {viewsText}
    </Typography>
  )
}
