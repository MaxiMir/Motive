import { Box, Typography, Tooltip } from '@mui/material'
import { useGoalContext } from '@features/user/components/GoalCurrent/hooks'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'

function Views() {
  const { day } = useGoalContext()
  const formatNumber = useFormatNumber()
  const formattedViews = formatNumber(day.views)

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip arrow title="Day Views">
          <span>
            <AppEmoji name="views" variant="h5" sx={{ opacity: 0.5 }} />
          </span>
        </Tooltip>
        <Typography variant="subtitle1" component="p" sx={{ color: '#545d62' }}>
          {formattedViews}
        </Typography>
      </Box>
    </Box>
  )
}

export default Views
