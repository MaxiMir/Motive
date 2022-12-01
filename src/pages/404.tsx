import { useIntl } from 'react-intl'
import Error from 'src/pages/_error'
import Layout from '@layout'

function Page404() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.404.title' })

  return (
    <Layout title={title}>
      <Error statusCode={404} />
    </Layout>
  )
}

export default Page404
