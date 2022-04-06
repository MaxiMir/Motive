import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { numberToShort } from 'helpers/prepare'
import AppTooltip from 'components/UI/AppTooltip'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'

interface GoalViewsProps {
  views: number
}

export default function Views({ views }: GoalViewsProps): JSX.Element {
  const classes = useStyles()
  const shortViews = numberToShort(views)

  return (
    <AppBox justifyContent="flex-end">
      <AppBox alignItems="center" gap={1}>
        <AppTooltip title="Day Views">
          <AppEmoji name="views" variant="h5" />
        </AppTooltip>
        <Typography variant="subtitle1" component="p" className={classes.views}>
          {shortViews}
        </Typography>
      </AppBox>
    </AppBox>
  )
}

const useStyles = makeStyles({
  views: {
    color: '#5a5959',
  },
})
