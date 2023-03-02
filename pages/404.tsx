import { Layout } from 'app/layout'
import { ErrorPage } from 'pages/error'
import { useMeta } from 'entities/page'

function Page404() {
  const meta = useMeta('404')

  return (
    <Layout {...meta}>
      <ErrorPage header={meta.title} />
    </Layout>
  )
}

export default Page404
