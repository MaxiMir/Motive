import { useIntl } from 'react-intl'
import Error from 'src/pages/_error'
import Layout from '@layout'

function Page500() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.500.title' })

  return (
    <Layout title={title}>
      <Error statusCode={500} />
    </Layout>
  )
}

export default Page500
