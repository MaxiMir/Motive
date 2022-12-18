import Page from '@features/page'
import Error, { useTitle } from '@features/error'

function Page404() {
  const title = useTitle('404')

  return (
    <Page title={title}>
      <Error statusCode={404} />
    </Page>
  )
}

export default Page404
