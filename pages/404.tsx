import Layout from 'layout'
import ErrorView from 'views/ErrorView'
import useStorageClient from 'hooks/useStorageClient'

export default function Page404(): JSX.Element {
  const client = useStorageClient()

  return (
    <Layout title="404: This page could not be found" client={client}>
      <ErrorView title="Page Not Found" code={404} />
    </Layout>
  )
}
