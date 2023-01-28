import { Layout } from 'app/layout'
import { ErrorPage } from 'pages/error'
import { useMetaTags } from 'entities/page'

function Page500() {
  const metaTags = useMetaTags('500')

  return (
    <Layout {...metaTags}>
      <ErrorPage statusCode={500} header={metaTags.title} />
    </Layout>
  )
}

export default Page500
