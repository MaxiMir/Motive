import { useIntl } from 'react-intl'
import PageFeature from '@features/page'
import Error from 'src/pages/_error'

function Page500() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.500.title' })

  return (
    <PageFeature title={title}>
      <Error statusCode={500} />
    </PageFeature>
  )
}

export default Page500
