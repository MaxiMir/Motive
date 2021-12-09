import { Container } from '@material-ui/core'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'

interface ErrorProps {
  title: string
  code: number
}

export default function Error({ title, code }: ErrorProps): JSX.Element {
  return (
    <Container fixed>
      <AppBox alignItems="center" justifyContent="center" height="80vh">
        <AppBox flexDirection="column" alignItems="center" justifyContent="space-between">
          <AppTypography component="h1" variant="h1">
            {title}
          </AppTypography>
          <AppTypography style={{ fontSize: '14em' }}>{code}</AppTypography>
          <AppTypography style={{ fontSize: '14em' }}>
            <AppEmoji name="error" onlyEmoji />
          </AppTypography>
        </AppBox>
      </AppBox>
    </Container>
  )
}
