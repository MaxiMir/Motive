import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getProviders, getSession } from 'next-auth/react'
import { Container } from '@material-ui/core'
import AppTitle from 'components/UI/AppTitle'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

export default function SearchPage(): JSX.Element {
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Search`} statusCode={200}>
      <Container fixed>
        <AppTitle name="search" mb={4}>
          Search
        </AppTitle>
        <AppBox alignItems="center" justifyContent="center" flex={1} height="80vh">
          <AppTypography variant="h5">In the process...</AppTypography>
        </AppBox>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)
  const providers = await getProviders()

  return {
    props: {
      session,
      providers,
    },
  }
}
