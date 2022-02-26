import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getProviders } from 'next-auth/react'
import { Container } from '@material-ui/core'
import { PageProps } from 'dto'
import AppTitle from 'components/UI/AppTitle'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

export default function SearchPage({ providers }: PageProps): JSX.Element {
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Search`} providers={providers} statusCode={200}>
      <Container fixed>
        <AppTitle name="runs for days" mb={4}>
          Search
        </AppTitle>
        <AppBox alignItems="center" justifyContent="center" flex={1} height="80vh">
          <AppTypography variant="h5">In the process...</AppTypography>
        </AppBox>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
