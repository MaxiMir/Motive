import { Container } from '@material-ui/core'
import Layout from 'layout'
import AppBox from 'components/UI/AppBox'
import AppTypography from 'components/UI/AppTypography'
import AppEmoji from 'components/UI/AppEmoji'

export default function Custom404(): JSX.Element {
  return (
    <Layout title="404: This page could not be found" error={false}>
      <Container fixed>
        <AppBox alignItems="center" justifyContent="center" height="80vh">
          <AppBox flexDirection="column" alignItems="center" justifyContent="space-between">
            <AppTypography component="h1" variant="h1">
              Page Not Found
            </AppTypography>
            <AppTypography style={{ fontSize: '14em' }}>404</AppTypography>
            <AppTypography style={{ fontSize: '14em' }}>
              <AppEmoji name="error" onlyEmoji />
            </AppTypography>
          </AppBox>
        </AppBox>
      </Container>
    </Layout>
  )
}
