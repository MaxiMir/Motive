import { Layout } from 'app/layout'
import { ErrorPage } from 'pages/error'
import { useMetaTags } from 'entities/page'

function Page404() {
  const metaTags = useMetaTags('404')

  return (
    <Layout {...metaTags}>
      <ErrorPage header={metaTags.title} />
    </Layout>
  )
}

export default Page404
