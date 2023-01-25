import Layout from '@app/ui/Layout'
import Error from '@widgets/error'
import useMetaTags from '@lib/hooks/useMetaTags'

function Page500() {
  const metaTags = useMetaTags('500')

  return (
    <Layout {...metaTags}>
      <Error statusCode={500} />
    </Layout>
  )
}

export default Page500
