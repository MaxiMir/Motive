import { Typography } from '@mui/material'
import { MAIN_CHARACTERISTICS, MainCharacteristicName, UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import Tabs from 'shared/ui/Tabs'
import TabContent from './components/TabContent'
import TabName from './components/TabName'
import { useMessages } from './hooks/useMessages'

interface RatingPageProps extends Record<MainCharacteristicName, UserDto[]> {
  tab: number
}

function RatingPage({ tab, ...props }: RatingPageProps) {
  const messages = useMessages()

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {messages.header}
      </Typography>
      <Tabs
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

export default RatingPage
