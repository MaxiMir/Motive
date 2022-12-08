import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import PageFeature from '@features/page'
import TopOfTheDayModule, { useMetaTags } from '@modules/top-of-the-day'

function TopOfTheDayPage() {
  const metaTags = useMetaTags()

  return (
    <PageFeature title={metaTags.title}>
      <TopOfTheDayModule />
    </PageFeature>
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
