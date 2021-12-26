import Layout from 'layout'
import Error from 'views/Error'
import useStorageClient from 'hooks/useStorageClient'

export default function Page500(): JSX.Element {
  const client = useStorageClient()

  return (
    <Layout title="500: Internal Server Error" client={client}>
      <Error title="Something went wrong..." code={500} />
    </Layout>
  )
}
