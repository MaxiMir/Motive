import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import useMetaTags from '@hooks/useMetaTags'
import ContactModule from '@modules/contact'
import Layout from '@layout'

function ContactPage() {
  const metaTags = useMetaTags('contact')

  return (
    <Layout title={metaTags.title} description={metaTags.description}>
      <ContactModule />
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

export default ContactPage
