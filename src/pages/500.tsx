import Page from '@modules/page'
import Error from '@components/Error'
import useMetaTags from '@hooks/useMetaTags'

function Page500() {
  const metaTags = useMetaTags('500')

  return (
    <Page {...metaTags}>
      <Error statusCode={500} />
    </Page>
  )
}

export default Page500
