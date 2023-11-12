import { GetServerSideProps } from 'next'
import { Layout } from 'app/layout'
import { ContactPage } from 'pages/contact'
import { useMeta } from 'entities/page'

function ContactRoute() {
  const meta = useMeta('contact')

  return (
    <Layout title={meta.title} description={meta.description}>
      <ContactPage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default ContactRoute
