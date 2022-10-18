import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { dehydrate, QueryClient } from 'react-query'
import { getSession } from 'next-auth/react'
import { AxiosRequestHeaders } from 'axios'
import { RATING } from 'route'
import useLocale from 'hooks/useLocale'
import PageService from 'services/PageService'
import Layout from 'layout'
import Rating from 'views/RatingView'
import useRatingPage from 'views/RatingView/hook'

const i18n = {
  en: {
    getTitle(tab: number) {
      const name = getName()

      function getName() {
        switch (tab) {
          case 1:
            return 'creativity'
          case 2:
            return 'support'
          default:
            return 'motivation'
        }
      }

      return `Rating users by ${name}`
    },
    description: 'Rating the most motivating, creative, and supportive users 🥷',
  },
  ru: {
    getTitle(tab: number) {
      const name = getName()

      function getName() {
        switch (tab) {
          case 1:
            return 'креативности'
          case 2:
            return 'поддержке'
          default:
            return 'мотивации'
        }
      }

      return `Рейтинг пользователей по ${name}`
    },
    description: 'Рейтинг самых мотивирующих, творческих и поддерживающих пользователей 🥷',
  },
  uk: {
    getTitle(tab: number) {
      const name = getName()

      function getName() {
        switch (tab) {
          case 1:
            return 'креативності'
          case 2:
            return 'підтримки'
          default:
            return 'мотивацією'
        }
      }

      return `Рейтинг користувачів з ${name}`
    },
    description: 'Рейтинг найбільш мотивуючих, творчих та підтримуючих користувачів 🥷',
  },
}

export default function RatingPage() {
  const { locale } = useLocale()
  const { query } = useRouter()
  const { data } = useRatingPage()
  const { getTitle, description } = i18n[locale]
  const tab = !query.tab ? 0 : +query.tab
  const title = getTitle(tab)

  return (
    <Layout title={title} description={description}>
      {data?.content && <Rating {...data.content} locale={locale} tab={tab} />}
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const queryClient = new QueryClient()
  const session = await getSession(ctx)
  const headers = ctx.req.headers as AxiosRequestHeaders
  await queryClient.prefetchQuery(RATING, () => PageService.get(RATING, { headers }))

  return {
    props: {
      session,
      dehydratedState: dehydrate(queryClient),
    },
  }
}
