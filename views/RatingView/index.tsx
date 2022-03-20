import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'
import { MainCharacteristicName, UserDto } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import AppTabName from 'components/UI/AppTabName'
import TabContent from './components/TabContent'

const TABS: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

type RatingViewProps = {
  [k in MainCharacteristicName]: UserDto[]
}

export default function RatingView(props: RatingViewProps): JSX.Element {
  const { query } = useRouter()

  return (
    <>
      <Container fixed>
        <AppTitle name="completed">Rating</AppTitle>
      </Container>
      <AppBox flexDirection="column" spacing={2} mt={4}>
        <AppTabs
          initial={!query.tab ? undefined : +query.tab}
          ariaLabel="rating by characteristics"
          tabs={TABS.map((name) => (
            <AppTabName name={name} emoji={name} key={name} />
          ))}
          content={TABS.map((name) => (
            <TabContent name={name} users={props[name]} key={name} />
          ))}
        />
      </AppBox>
    </>
  )
}
