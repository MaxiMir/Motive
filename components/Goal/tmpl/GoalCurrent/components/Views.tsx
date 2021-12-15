import { makeStyles } from '@material-ui/core'
import { numberToShort } from 'helpers/prepare'
import AppTooltip from 'components/UI/AppTooltip'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import AppEmoji from 'components/UI/AppEmoji'

interface GoalViewsProps {
  views: number
}

export default function Views({ views }: GoalViewsProps): JSX.Element {
  const classes = useStyles()
  const shortViews = numberToShort(views)

  return (
    <AppBox alignItems="center" alignSelf="end" spacing={1}>
      <AppTooltip title="Day Views">
        <AppEmoji name="views" variant="h5" />
      </AppTooltip>
      <AppTypography variant="subtitle1" component="p" className={classes.views}>
        {shortViews}
      </AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles({
  views: {
    color: '#5a5959',
  },
})
