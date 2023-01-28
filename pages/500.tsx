import { Layout } from '@app/ui'
import Error from 'widgets/error'
import { useMetaTags } from 'shared/lib/hooks'

function Page500() {
  const metaTags = useMetaTags('500')

  return (
    <Layout {...metaTags}>
      <Error statusCode={500} />
    </Layout>
  )
}

export default Page500
