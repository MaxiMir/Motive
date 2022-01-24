import { useRouter } from 'next/router'
import { Container } from '@material-ui/core'
import { MainCharacteristicName, UserDto } from 'dto'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import TabContent from './components/TabContent'
import TabName from './components/TabName'

const TAB_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

type RatingViewProps = {
  [k in MainCharacteristicName]: UserDto[]
}

export default function RatingView(props: RatingViewProps): JSX.Element {
  const { query } = useRouter()

  return (
    <>
      <Container fixed>
        <AppHeader name="completed">Rating</AppHeader>
      </Container>
      <AppBox flexDirection="column" spacing={2} mt={4}>
        <AppTabs
          tabs={TAB_NAMES.map((name) => (
            <TabName name={name} key={name} />
          ))}
          content={TAB_NAMES.map((name) => (
            <TabContent name={name} users={props[name]} key={name} />
          ))}
          initial={!query.tab ? undefined : +query.tab}
          ariaLabel="rating by characteristics"
        />
      </AppBox>
    </>
  )
}
