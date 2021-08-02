import { createStyles } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Goal } from 'dto'
import AppBox from 'components/UI/AppBox'
import AppHeader from 'components/UI/AppHeader'
import GoalCardMenu from './GoalCardMenu'

export default function GoalCardCurrent({ name }: Goal): JSX.Element {
  const classes = useStyles()

  return (
    <div className={classes.goalWrap}>
      <AppBox flexDirection="column" spacing={4} className={classes.content}>
        <AppBox justifyContent="space-between">
          <AppHeader name="goal" variant="h6" component="h3">
            {name}
          </AppHeader>
          <GoalCardMenu />
        </AppBox>
      </AppBox>
    </div>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    goalWrap: {
      maxWidth: 350,
      padding: 2,
      background: `linear-gradient(to top left, ${theme.palette.warning.main}, ${theme.palette.success.dark}, ${theme.palette.info.dark})`,
      borderRadius: 15,
    },
    content: {
      padding: 16,
      height: 500, // TODO REMOVE!
      background: theme.palette.background.paper,
      borderRadius: 13,
    },
  }),
)
