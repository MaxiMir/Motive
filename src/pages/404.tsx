import Page from '@modules/page'
import Error from '@components/Error'
import useMetaTags from '@hooks/useMetaTags'

function Page404() {
  const metaTags = useMetaTags('404')

  return (
    <Page {...metaTags}>
      <Error statusCode={404} />
    </Page>
  )
}

export default Page404
