import { Box, Button } from '@mui/material'
import { useIntl } from 'react-intl'
import { useGoalContext } from 'entities/goal'
import { useFormatNumber } from 'shared/lib/hooks'
import Icon from 'shared/ui/Icon'
import TooltipArrow from 'shared/ui/TooltipArrow'

export function Views() {
  const { day } = useGoalContext()
  const { formatMessage } = useIntl()
  const formatNumber = useFormatNumber()
  const title = formatMessage({ id: 'page.user.views.title' })
  const formattedViews = formatNumber(day.views)

  return (
    <Box display="flex" justifyContent="flex-end">
      <TooltipArrow title={title}>
        <Button size="small" startIcon={<Icon name="visibility" />} sx={{ color: 'zen.silent' }}>
          {formattedViews}
        </Button>
      </TooltipArrow>
    </Box>
  )
}
