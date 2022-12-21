import Page from '@features/page'
import Error, { useTitle } from '@features/error'

function Page500() {
  const title = useTitle('500')

  return (
    <Page title={title}>
      <Error statusCode={500} />
    </Page>
  )
}

export default Page500
