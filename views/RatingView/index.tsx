import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'
import { MainCharacteristicName, UserDto } from 'dto'
import { Locale } from 'hooks/useLocale'
import AppTitle from 'components/UI/AppTitle'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import AppTabName from 'components/UI/AppTabName'
import TabContent from './components/TabContent'
import i18n from './i18n'

const TABS: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

interface RatingViewProps extends Record<MainCharacteristicName, UserDto[]> {
  locale: Locale
}

export default function RatingView({ locale, ...props }: RatingViewProps): JSX.Element {
  const { query } = useRouter()
  const { header, ariaLabel } = i18n[locale]

  return (
    <>
      <Container fixed>
        <AppTitle name="completed">{header}</AppTitle>
      </Container>
      <AppBox flexDirection="column" spacing={2} mt={4}>
        <AppTabs
          initial={!query.tab ? undefined : +query.tab}
          ariaLabel={ariaLabel}
          tabs={TABS.map((name) => (
            <AppTabName name={name} emoji={name} key={name} locale={locale} />
          ))}
          content={TABS.map((name) => (
            <TabContent name={name} users={props[name]} locale={locale} key={name} />
          ))}
        />
      </AppBox>
    </>
  )
}
