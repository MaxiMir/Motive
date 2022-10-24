import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import Layout from 'layout'
import ContactView from './components/ContactView'

export default function ContactPage() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.contact.title' })
  const description = formatMessage({ id: 'page.contact.description' })

  return (
    <Layout title={title} description={description}>
      <ContactView />
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
