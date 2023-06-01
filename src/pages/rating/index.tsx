import { Typography } from '@mui/material'
import { useIntl } from 'react-intl'
import { useRouter } from 'next/router'
import { MAIN_CHARACTERISTICS, MainCharacteristicName, UserDto } from 'shared/api'
import Container from 'shared/ui/Container'
import Tabs from 'shared/ui/Tabs'
import { TabContent } from './tabContent'
import { TabName } from './tabName'

type RatingPageProps = Record<MainCharacteristicName, UserDto[]>

export function RatingPage(props: RatingPageProps) {
  const { formatMessage } = useIntl()
  const { query } = useRouter()
  const parsedTab = Math.abs(Number(query?.tab))
  const tab = !parsedTab || parsedTab > 2 ? 0 : parsedTab
  const header = formatMessage({ id: 'page.rating.header' })
  const ariaLabel = formatMessage({ id: 'page.rating.aria-label' })

  return (
    <Container>
      <Typography variant="h1" sx={{ mb: 3 }}>
        {header}
      </Typography>
      <Tabs
        initial={tab}
        aria-label={ariaLabel}
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
