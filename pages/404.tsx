import useMetaTags from '@lib/hooks/useMetaTags'
import Layout from '@app/ui/Layout'
import Error from '@widgets/error'

function Page404() {
  const metaTags = useMetaTags('404')

  return (
    <Layout {...metaTags}>
      <Error statusCode={404} />
    </Layout>
  )
}

export default Page404
