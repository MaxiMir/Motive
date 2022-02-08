import { Container } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'

interface CustomErrorProps {
  statusCode?: number
}

export default function CustomError({ statusCode = 500 }: CustomErrorProps): JSX.Element {
  const title = statusCode === 404 ? 'Page Not Found' : 'Something went wrong...'

  return (
    <Container fixed>
      <AppBox alignItems="center" justifyContent="center" height="100vh">
        <AppBox flexDirection="column" alignItems="center" justifyContent="space-between">
          <AppTypography component="h1" variant="h4">
            {title}
          </AppTypography>
          <AppTypography style={{ fontSize: '10em' }}>{statusCode}</AppTypography>
          <AppTypography style={{ fontSize: '10em' }}>
            <AppEmoji name="error" onlyEmoji />
          </AppTypography>
        </AppBox>
      </AppBox>
    </Container>
  )
}
