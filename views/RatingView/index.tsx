import { Container, Box } from '@mui/material'
import { MAIN_CHARACTERISTICS, MainCharacteristic, UserDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/ui/AppTitle'
import AppTabs from 'components/ui/AppTabs'
import AppTabName from 'components/ui/AppTabName'
import TabContent from './components/TabContent'
import i18n from './i18n'

interface RatingViewProps extends Record<MainCharacteristic, UserDto[]> {
  locale: Locale
  tab: number
}

export default function RatingView({ locale, tab, ...props }: RatingViewProps) {
  const { header, ariaLabel } = i18n[locale]

  return (
    <>
      <Container fixed sx={{ mt: 3 }}>
        <AppTitle name="completed">{header}</AppTitle>
      </Container>
      <Box display="flex" flexDirection="column" gap={2} mt={4} mb={3}>
        <AppTabs
          initial={tab}
          ariaLabel={ariaLabel}
          tabs={MAIN_CHARACTERISTICS.map((name) => (
            <AppTabName name={name} emoji={name} key={name} locale={locale} />
          ))}
          content={MAIN_CHARACTERISTICS.map((name) => (
            <TabContent name={name} users={props[name]} locale={locale} key={name} />
          ))}
        />
      </Box>
    </>
  )
}
