import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import useLocale from 'hooks/useLocale'
import Layout from 'layout'
import ContactView from 'views/ContactView'

const i18n = {
  en: {
    title: 'Contact us',
  },
  ru: {
    title: 'Контакты',
  },
}

export default function ContactPage(): JSX.Element {
  const { locale } = useLocale()
  const { title } = i18n[locale]

  return (
    <Layout title={title}>
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
