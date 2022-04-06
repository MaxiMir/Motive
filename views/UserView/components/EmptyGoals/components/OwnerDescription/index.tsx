import { Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { SEARCH } from 'route'
import { Locale } from 'hooks/useLocale'
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
      <Typography>
        {description[0]} <span className={classes.own}>{description[1]}</span>
      </Typography>
      <Typography>
        {description[2]}{' '}
        <AppLink href={SEARCH} className={classes.link}>
          {description[3]}
        </AppLink>
      </Typography>
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
