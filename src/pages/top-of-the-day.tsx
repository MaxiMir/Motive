import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import TopOfTheDayModule, { useMetaTags } from '@modules/top-of-the-day'
import Page from '@features/page'

function TopOfTheDayPage() {
  const metaTags = useMetaTags()

  return (
    <Page title={metaTags.title}>
      <TopOfTheDayModule />
    </Page>
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
