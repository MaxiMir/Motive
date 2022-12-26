import { Box, Typography } from '@mui/material'
import { useGoalContext } from '@modules/user/components/GoalCurrent/hooks/useGoalContext'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'
import TooltipArrow from '@ui/styled/TooltipArrow'
import { useMessages } from './hooks/useMessages'

function Views() {
  const { day } = useGoalContext()
  const messages = useMessages()
  const formatNumber = useFormatNumber()
  const formattedViews = formatNumber(day.views)

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" alignItems="center" gap={1}>
        <TooltipArrow title={messages.title}>
          <AppEmoji name="views" variant="h5" sx={{ opacity: 0.5 }} />
        </TooltipArrow>
        <Typography variant="subtitle1" component="p" sx={{ color: '#545d62' }}>
          {formattedViews}
        </Typography>
      </Box>
    </Box>
  )
}

export default Views
