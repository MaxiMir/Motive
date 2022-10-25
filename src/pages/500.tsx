import { useIntl } from 'react-intl'
import Layout from 'src/common/layout'
import Error from 'src/pages/_error'

export default function Page500() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.500.title' })

  return (
    <Layout title={title}>
      <Error statusCode={500} />
    </Layout>
  )
}
