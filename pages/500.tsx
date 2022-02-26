import Layout from 'layout'

export default function Page500(): JSX.Element {
  return <Layout title="500: Sorry, something went wrong..." statusCode={500} />
}
