import { Box, Typography, Tooltip } from '@mui/material'
import { numberToShort } from 'src/common/helpers/prepare'
import AppEmoji from 'src/common/ui/AppEmoji'

interface GoalViewsProps {
  views: number
}

export default function Views({ views }: GoalViewsProps) {
  const shortViews = numberToShort(views)

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" alignItems="center" gap={1}>
        <Tooltip arrow title="Day Views">
          <span>
            <AppEmoji name="views" variant="h5" sx={{ opacity: 0.5 }} />
          </span>
        </Tooltip>
        <Typography variant="subtitle1" component="p" sx={{ color: '#545d62' }}>
          {shortViews}
        </Typography>
      </Box>
    </Box>
  )
}
