import { parse } from 'express-useragent'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
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

export default DonateRoute
