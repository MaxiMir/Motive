import { Box, Button } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import useFormatNumber from '@hooks/useFormatNumber'
import TooltipArrow from '@ui/styled/TooltipArrow'
import AppIcon from '@ui/AppIcon'
import { useMessages } from './hooks/useMessages'

function Views() {
  const { day } = useGoalContext()
  const messages = useMessages()
  const formatNumber = useFormatNumber()
  const formattedViews = formatNumber(day.views)

  return (
    <Box display="flex" justifyContent="flex-end">
      <TooltipArrow title={messages.title}>
        <Button
          size="small"
          aria-label={messages.title}
          startIcon={<AppIcon name="visibility" />}
          sx={{ color: 'zen.silent' }}
        >
          {formattedViews}
        </Button>
      </TooltipArrow>
    </Box>
  )
}

export default Views
