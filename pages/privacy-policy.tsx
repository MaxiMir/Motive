import { GetServerSideProps } from 'next'
import { Layout } from 'app/layout'
import { PrivacyPolicyPage } from 'pages/privacy-policy'
import { useMeta } from 'entities/page'

function PrivacyPolicyRoute() {
  const meta = useMeta('privacy-policy')

  return (
    <Layout title={meta.title} description={meta.description}>
      <PrivacyPolicyPage />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {},
  }
}

export default PrivacyPolicyRoute
