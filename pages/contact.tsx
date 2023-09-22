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

export default ContactRoute
