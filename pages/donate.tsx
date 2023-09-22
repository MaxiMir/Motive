import { GetServerSideProps } from 'next'
import { Layout } from 'app/layout'
import { DonatePage } from 'pages/donate'
import { useMeta } from 'entities/page'

function DonateRoute() {
  const meta = useMeta('contact')

  return (
    <Layout title={meta.title} description={meta.description}>
      <DonatePage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default DonateRoute
