import { Typography } from '@mui/material'
import { UserDto } from '@modules/user'
import { MAIN_CHARACTERISTICS, MainCharacteristicName } from '@modules/characteristic'
import Tabs from '@ui/Tabs'
import Container from '@ui/Container'
import { useMessages } from './hooks/useMessages'
import TabName from './components/TabName'
import TabContent from './components/TabContent'

interface RatingViewProps extends Record<MainCharacteristicName, UserDto[]> {
  tab: number
}

function RatingView({ tab, ...props }: RatingViewProps) {
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

export default RatingView
