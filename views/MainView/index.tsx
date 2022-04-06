import { Locale } from 'hooks/useLocale'
import AppBox from 'components/UI/AppBox'
import Slogan from './components/Slogan'
import Advantage from './components/Advantage'
import ADVANTAGES from './helper'

interface MainViewProps {
  locale: Locale
}

export default function MainView({ locale }: MainViewProps): JSX.Element {
  return (
    <>
      <Slogan locale={locale} />
      <AppBox flexDirection="column">
        {ADVANTAGES.map((advantage) => (
          <Advantage {...advantage} locale={locale} key={advantage.id} />
        ))}
      </AppBox>
    </>
  )
}
