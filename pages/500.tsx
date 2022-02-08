import Layout from 'layout'
import useStorageClient from 'hooks/useStorageClient'

export default function Page500(): JSX.Element {
  const client = useStorageClient()

  return <Layout title="500: Sorry, something went wrong..." client={client} statusCode={500} />
}
