import { Typography } from '@mui/material'
import { UserDto } from '@features/user'
import { MAIN_CHARACTERISTICS, MainCharacteristicName } from '@features/characteristic'
import AppTabs from '@ui/AppTabs'
import AppContainer from '@ui/AppContainer'
import { useMessages } from './hooks/useMessages'
import TabName from './components/TabName'
import TabContent from './components/TabContent'

interface RatingModuleProps extends Record<MainCharacteristicName, UserDto[]> {
  tab: number
}

function RatingModule({ tab, ...props }: RatingModuleProps) {
  const messages = useMessages()

  return (
    <AppContainer>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
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
    </AppContainer>
  )
}

export default RatingModule
