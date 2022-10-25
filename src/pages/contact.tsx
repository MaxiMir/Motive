import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import { useIntl } from 'react-intl'
import Layout from 'src/common/layout'
import { Contact } from '@modules/contact'

export default function ContactPage() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.contact.title' })
  const description = formatMessage({ id: 'page.contact.description' })

  return (
    <Layout title={title} description={description}>
      <Contact />
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
