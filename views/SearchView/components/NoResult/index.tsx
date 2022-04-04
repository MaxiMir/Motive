import { createStyles, makeStyles } from '@material-ui/core'
import useLocale from 'hooks/useLocale'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface NoResultProps {
  phrase: string
}

export default function NoResult({ phrase }: NoResultProps): JSX.Element {
  const classes = useStyles()
  const { locale } = useLocale()
  const { description, hint } = i18n[locale]

  return (
    <AppBox flexDirection="column" spacing={1}>
      <AppTypography variant="h5" component="p">
        {description} &#171;<span className={classes.search}>{phrase}</span>&#187;.
      </AppTypography>
      <AppTypography className={classes.description}>{hint}</AppTypography>
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
