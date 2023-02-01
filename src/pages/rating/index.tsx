import { Typography } from '@mui/material'
import { MAIN_CHARACTERISTICS, MainCharacteristicName, UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import Tabs from 'shared/ui/Tabs'
import { useMessages } from './lib'
import { TabContent } from './tabContent'
import { TabName } from './tabName'

interface RatingPageProps extends Record<MainCharacteristicName, UserDto[]> {
  tab: number
}

export function RatingPage({ tab, ...props }: RatingPageProps) {
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
