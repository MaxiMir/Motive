import Layout from '@app/ui/Layout'
import useMetaTags from '@hooks/useMetaTags'
import Error from '@components/Error'

function Page404() {
  const metaTags = useMetaTags('404')

  return (
    <Layout {...metaTags}>
      <Error statusCode={404} />
    </Layout>
  )
}

export default Page404
