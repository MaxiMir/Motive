import { Box, Typography } from '@mui/material'
import { Locale } from 'hooks/useLocale'
import AppFadeIcon from 'components/ui/AppFadeIcon'
import OwnerDescription from './components/OwnerDescription'
import i18n from './i18n'

interface AddGoalProps {
  clientPage: boolean
  locale: Locale
}

export default function EmptyGoals({ clientPage, locale }: AddGoalProps) {
  const { guest, owner } = i18n[locale]

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      className="hide"
      gap={1}
      flex={1}
    >
      <Typography variant="h6" component="p" color="primary">
        {clientPage ? owner : guest}
      </Typography>
      <AppFadeIcon name="goal" />
      {clientPage && <OwnerDescription locale={locale} />}
    </Box>
  )
}
