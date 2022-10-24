import Layout from 'layout'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import TopOfTheDayView from './components/TopOfTheDayView'

export default function TopOfTheDay() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.top.title' })

  return (
    <Layout title={title}>
      <TopOfTheDayView />
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
