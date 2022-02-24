import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { getProviders } from 'next-auth/react'
import { Provider } from 'next-auth/providers'
import Layout from 'layout'
import SignInView from 'views/SignInView'

interface SignInProps {
  providers: Provider[]
}

export default function SignIn({ providers }: SignInProps): JSX.Element {
  const { query } = useRouter()

  return (
    <Layout title={`${process.env.NEXT_PUBLIC_APP_NAME} • Sign in`} statusCode={200}>
      <SignInView providers={providers} query={query} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders()
  return {
    props: { providers },
  }
}
