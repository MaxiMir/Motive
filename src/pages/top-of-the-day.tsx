import Layout from 'src/common/layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { TopOfTheDay } from '@modules/top-of-the-day'

export default function TopOfTheDayPage() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.top.title' })

  return (
    <Layout title={title}>
      <TopOfTheDay />
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
