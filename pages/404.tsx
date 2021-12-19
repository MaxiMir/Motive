import Layout from 'layout'
import Error from 'views/Error'

export default function Page404(): JSX.Element {
  return (
    <Layout title="404: This page could not be found">
      <Error title="Page Not Found" code={404} />
    </Layout>
  )
}
