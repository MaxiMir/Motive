import { useIntl } from 'react-intl'
import PageFeature from '@features/page'
import Error from 'src/pages/_error'

function Page404() {
  const { formatMessage } = useIntl()
  const title = formatMessage({ id: 'page.404.title' })

  return (
    <PageFeature title={title}>
      <Error statusCode={404} />
    </PageFeature>
  )
}

export default Page404
