import Layout from '@layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import { TopOfTheDayModule } from '@modules/top-of-the-day'

export default function TopOfTheDayPage() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.top.title' })

  return (
    <Layout title={title}>
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