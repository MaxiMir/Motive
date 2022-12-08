import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import ContactModule from '@modules/contact'
import PageFeature from '@features/page'
import useMetaTags from '@hooks/useMetaTags'

function ContactPage() {
  const metaTags = useMetaTags('contact')

  return (
    <PageFeature title={metaTags.title} description={metaTags.description}>
      <ContactModule />
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
