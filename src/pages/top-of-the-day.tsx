import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import TopOfTheDayModule, { useMetaTags } from '@modules/top-of-the-day'
import Layout from '@layout'

function TopOfTheDayPage() {
  const metaTags = useMetaTags()

  return (
    <Layout title={metaTags.title}>
      <TopOfTheDayModule />
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

export default TopOfTheDayPage
