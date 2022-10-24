import { useIntl } from 'react-intl'
import { Container, Box } from '@mui/material'
import { MAIN_CHARACTERISTICS, MainCharacteristicName, UserDto } from 'dto'
import AppHeader from 'components/ui/AppHeader'
import AppTabs from 'components/ui/AppTabs'
import TabName from './components/TabName'
import TabContent from './components/TabContent'

type RatingViewProps = Record<MainCharacteristicName, UserDto[]> & {
  tab: number
}

export default function RatingView({ tab, ...props }: RatingViewProps) {
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
