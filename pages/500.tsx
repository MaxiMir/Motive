import Layout from 'layout'
import Error from 'views/Error'

export default function Page500(): JSX.Element {
  return (
    <Layout title="500: Internal Server Error">
      <Error title="Something went wrong..." code={500} />
    </Layout>
  )
}
