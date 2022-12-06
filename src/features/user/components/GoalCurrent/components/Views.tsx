import { Box, Typography, Tooltip } from '@mui/material'
import useFormatNumber from '@hooks/useFormatNumber'
import AppEmoji from '@ui/AppEmoji'

interface GoalViewsProps {
  views: number
}

function Views({ views }: GoalViewsProps) {
  const formatNumber = useFormatNumber()
  const formattedViews = formatNumber(views)

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
