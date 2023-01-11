import { Container } from '@mui/material'
import { UserDto } from '@features/user'
import { MAIN_CHARACTERISTICS, MainCharacteristicName } from '@features/characteristic'
import AppHeader from '@ui/AppHeader'
import AppTabs from '@ui/AppTabs'
import { useMessages } from './hooks/useMessages'
import TabName from './components/TabName'
import TabContent from './components/TabContent'

interface RatingModuleProps extends Record<MainCharacteristicName, UserDto[]> {
  tab: number
}

function RatingModule({ tab, ...props }: RatingModuleProps) {
  const messages = useMessages()

  return (
    <Container fixed sx={{ my: 3 }}>
      <AppHeader name="completed" mb={3}>
        {messages.header}
      </AppHeader>
      <AppTabs
        initial={tab}
        aria-label={messages.ariaLabel}
        tabs={MAIN_CHARACTERISTICS.map((name) => (
          <TabName name={name} key={name} />
        ))}
        content={MAIN_CHARACTERISTICS.map((name) => (
          <TabContent name={name} users={props[name]} key={name} />
        ))}
      />
    </Container>
  )
}

export default RatingModule
