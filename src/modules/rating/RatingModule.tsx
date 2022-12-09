import { useIntl } from 'react-intl'
import { Container, Box } from '@mui/material'
import { UserDto } from '@features/user'
import { MAIN_CHARACTERISTICS, MainCharacteristicName } from '@features/characteristic'
import AppHeader from '@ui/AppHeader'
import AppTabs from '@ui/AppTabs'
import TabName from './components/TabName'
import TabContent from './components/TabContent'

interface RatingModuleProps extends Record<MainCharacteristicName, UserDto[]> {
  tab: number
}

function RatingModule({ tab, ...props }: RatingModuleProps) {
  const { formatMessage } = useIntl()
  const header = formatMessage({ id: 'page.rating.header' })
  const ariaLabel = formatMessage({ id: 'page.rating.aria-label' })

  return (
    <>
      <Container fixed sx={{ mt: 3 }}>
        <AppHeader name="completed">{header}</AppHeader>
      </Container>
      <Box display="flex" flexDirection="column" gap={2} mt={4} mb={3}>
        <AppTabs
          initial={tab}
          ariaLabel={ariaLabel}
          tabs={MAIN_CHARACTERISTICS.map((name) => (
            <TabName name={name} emoji={name} key={name} />
          ))}
          content={MAIN_CHARACTERISTICS.map((name) => (
            <TabContent name={name} users={props[name]} key={name} />
          ))}
        />
      </Box>
    </>
  )
}

export default RatingModule
