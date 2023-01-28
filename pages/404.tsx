import { Layout } from '@app/ui'
import Error from 'widgets/error'
import { useMetaTags } from 'shared/lib/hooks'

function Page404() {
  const metaTags = useMetaTags('404')

  return (
    <Layout {...metaTags}>
      <Error statusCode={404} />
    </Layout>
  )
}

export default Page404
