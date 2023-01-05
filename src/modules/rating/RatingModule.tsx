import { Container, Box } from '@mui/material'
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
    <>
      <Container
        fixed
        sx={({ breakpoints }) => ({
          mt: 3,
          [breakpoints.only('xl')]: {
            maxWidth: 900,
          },
        })}
      >
        <AppHeader name="completed">{messages.header}</AppHeader>
      </Container>
      <Box display="flex" flexDirection="column" gap={2} mt={4} mb={3}>
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
      </Box>
    </>
  )
}

export default RatingModule
