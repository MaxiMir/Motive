import { Grid } from '@material-ui/core'
import { GoalDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppBox from 'components/UI/AppBox'
import Goal from 'components/Goal'

interface GoalsListProps {
  goals: GoalDto[]
}

export default function GoalsList({ goals }: GoalsListProps): JSX.Element {
  return (
    <AppBox flexDirection="column" spacing={2}>
      <AppTitle variant="h4" component="h2" name="goal">
        Goals
      </AppTitle>
      <Grid container spacing={2}>
        {goals.map((goal) => (
          <Grid item xs={12} sm={6} md={3} lg={2} key={goal.id}>
            <Goal tmpl="search" goal={goal} />
          </Grid>
        ))}
      </Grid>
    </AppBox>
  )
}
