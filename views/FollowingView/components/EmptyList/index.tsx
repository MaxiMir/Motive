import { Locale } from 'hooks/useLocale'
import { Typography } from '@mui/material'
import AppBox from 'components/UI/AppBox'
import i18n from './i18n'

interface EmptyListProps {
  locale: Locale
}

const EmptyList = ({ locale }: EmptyListProps): JSX.Element => {
  const { description, hint } = i18n[locale]

  return (
    <AppBox alignItems="center" justifyContent="center" flex={1}>
      <AppBox flexDirection="column" alignItems="center" width="100%">
        <Typography variant="h5" color="primary">
          {description}
        </Typography>
        <Typography>{hint}</Typography>
      </AppBox>
    </AppBox>
  )
}

export default EmptyList
