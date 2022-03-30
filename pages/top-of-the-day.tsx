import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { Container } from '@material-ui/core'
import AppTitle from 'components/UI/AppTitle'
import AppTypography from 'components/UI/AppTypography'
import AppBox from 'components/UI/AppBox'

export default function SearchPage(): JSX.Element {
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Top of the day`} statusCode={200}>
      <Container fixed>
        <AppTitle name="web" mb={4}>
          Top of the day
        </AppTitle>
        <AppBox alignItems="center" justifyContent="center" flex={1} height="80vh">
          <AppTypography variant="h5" style={{ color: 'gray' }}>
            In development
          </AppTypography>
        </AppBox>
      </Container>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}
