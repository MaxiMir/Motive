import { Button } from '@mui/material'
import { useIntl } from 'react-intl'
import { useFormatNumber } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

interface ViewsProps {
  views: number
}

export function Views({ views }: ViewsProps) {
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const title = formatMessage({ id: 'page.user.views.title' })
  const formattedViews = formatNumber(views)

  return (
    <TooltipArrow title={title}>
      <Button size="small" startIcon={<Icon name="visibility" />} sx={{ color: 'zen.silent' }}>
        {formattedViews}
      </Button>
    </TooltipArrow>
  )
}
