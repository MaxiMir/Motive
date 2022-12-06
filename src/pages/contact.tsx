import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import PageFeature from '@features/page'
import ContactFeature from '@features/contact'
import useMetaTags from '@hooks/useMetaTags'

function ContactPage() {
  const metaTags = useMetaTags('contact')

  return (
    <PageFeature title={metaTags.title} description={metaTags.description}>
      <ContactFeature />
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

export default ContactPage
