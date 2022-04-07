import { Typography } from '@mui/material'
import { SEARCH } from 'route'
import { Locale } from 'hooks/useLocale'
import AppLink from 'components/UI/AppLink'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface OwnerDescriptionProps {
  locale: Locale
}

export default function OwnerDescription({ locale }: OwnerDescriptionProps): JSX.Element {
  const { description } = i18n[locale]

  return (
    <>
      <Typography>
        {description[0]}{' '}
        <AppBox display={undefined} component="span" sx={{ color: 'primary' }}>
          {description[1]}
        </AppBox>
      </Typography>
      <Typography>
        {description[2]}{' '}
        <AppLink href={SEARCH} sx={{ color: 'warning.light' }}>
          {description[3]}
        </AppLink>
      </Typography>
    </>
  )
}
