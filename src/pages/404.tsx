import { useIntl } from 'react-intl'
import Layout from 'src/common/layout'
import Error from 'src/pages/_error'

export default function Page404() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.404.title' })

  return (
    <Layout title={title}>
      <Error statusCode={404} />
    </Layout>
  )
}
