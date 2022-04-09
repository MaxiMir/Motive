import { Box, Typography } from '@mui/material'
import { numberToShort } from 'helpers/prepare'
import AppTooltip from 'components/UI/AppTooltip'
import AppEmoji from 'components/UI/AppEmoji'

interface GoalViewsProps {
  views: number
}

export default function Views({ views }: GoalViewsProps): JSX.Element {
  const shortViews = numberToShort(views)

  return (
    <Box display="flex" justifyContent="flex-end">
      <Box display="flex" alignItems="center" gap={1}>
        <AppTooltip title="Day Views">
          <AppEmoji name="views" variant="h5" />
        </AppTooltip>
        <Typography variant="subtitle1" component="p" sx={{ color: '#5a5959' }}>
          {shortViews}
        </Typography>
      </Box>
    </Box>
  )
}
