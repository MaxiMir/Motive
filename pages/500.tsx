import { Layout } from 'app/layout'
import { ErrorPage } from 'pages/error'
import { useMeta } from 'entities/page'

function Page500() {
  const meta = useMeta('500')

  return (
    <Layout {...meta}>
      <ErrorPage header={meta.title} />
    </Layout>
  )
}

export default Page500
