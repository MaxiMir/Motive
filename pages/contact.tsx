import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import Layout from 'layout'
import ContactView from 'views/ContactView'

export default function ContactPage(): JSX.Element {
  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Contact us`}>
      <ContactView />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  return {
    props: {
      session,
    },
  }
}
