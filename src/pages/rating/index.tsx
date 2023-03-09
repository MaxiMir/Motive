import { Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { MAIN_CHARACTERISTICS, MainCharacteristicName, UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import Tabs from 'shared/ui/Tabs'
import { useMessages } from './lib'
import { TabContent } from './tabContent'
import { TabName } from './tabName'

type RatingPageProps = Record<MainCharacteristicName, UserDto[]>

export function RatingPage(props: RatingPageProps) {
  const messages = useMessages()
  const { query } = useRouter()
  const parsedTab = Math.abs(Number(query?.tab))
  const tab = !parsedTab || parsedTab > 2 ? 0 : parsedTab

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
        content={MAIN_CHARACTERISTICS.map((name) => {
          const { [name]: users } = props

          return <TabContent name={name} users={users} key={name} />
        })}
      />
    </Container>
  )
}
