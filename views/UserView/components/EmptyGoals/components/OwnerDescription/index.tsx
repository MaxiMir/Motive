import { makeStyles } from '@material-ui/core'
import { SEARCH } from 'route'
import { Locale } from 'hooks/useLocale'
import AppTypography from 'components/UI/AppTypography'
import AppLink from 'components/UI/AppLink'
import i18n from './i18n'

interface OwnerDescriptionProps {
  locale: Locale
}

export default function OwnerDescription({ locale }: OwnerDescriptionProps): JSX.Element {
  const classes = useStyles()
  const { description } = i18n[locale]

  return (
    <>
      <AppTypography>
        {description[0]} <span className={classes.own}>{description[1]}</span>
      </AppTypography>
      <AppTypography>
        {description[2]}{' '}
        <AppLink href={SEARCH} className={classes.link}>
          {description[3]}
        </AppLink>
      </AppTypography>
    </>
  )
}

const useStyles = makeStyles({
  own: {
    textTransform: 'none',
    color: '#4DA0EC',
  },
  link: {
    textTransform: 'none',
    color: '#F9E5A1',
  },
})
