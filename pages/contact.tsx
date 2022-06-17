import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/react'
import useLocale from 'hooks/useLocale'
import Layout from 'layout'
import ContactView from 'views/ContactView'

const i18n = {
  en: {
    title: 'Contact us',
    description: 'Contact us ✉️. Support us 🪙',
  },
  ru: {
    title: 'Контакты',
    description: 'Связаться с нами ✉️. Поддержать нас 🪙',
  },
  uk: {
    title: 'Контакти',
    description: "Зв'язатися з нами ✉️. Підтримати нас 🪙",
  },
}

export default function ContactPage() {
  const { locale } = useLocale()
  const { title, description } = i18n[locale]

  return (
    <Layout title={title} description={description}>
      <ContactView locale={locale} />
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
