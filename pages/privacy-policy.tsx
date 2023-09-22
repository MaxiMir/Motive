import { parse } from 'express-useragent'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { headers } = ctx.req
  const session = await getSession(ctx)
  const userDevice = parse(headers['user-agent'] || '')

  return {
    props: {
      userDevice,
      session,
    },
  }
}

export default PrivacyPolicyRoute
