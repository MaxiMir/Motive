import { createStyles, makeStyles } from '@material-ui/core'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

interface NoResultProps {
  phrase: string
}

export default function NoResult({ phrase }: NoResultProps): JSX.Element {
  const classes = useStyles()

  return (
    <AppBox flexDirection="column" spacing={1}>
      <AppTypography variant="h5" component="p">
        No results found for &#171;<span className={classes.search}>{phrase}</span>&#187;.
      </AppTypography>
      <AppTypography className={classes.description}>Try changing the search phrase</AppTypography>
    </AppBox>
  )
}

const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      color: theme.text.sand,
    },
    description: {
      color: theme.text.silent,
    },
  }),
)
