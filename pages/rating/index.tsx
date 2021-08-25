import { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { QueryClient, useQuery } from 'react-query'
import { dehydrate } from 'react-query/hydration'
import Axios from 'lib/axios'
import { Container } from '@material-ui/core'
import ROUTE from 'route'
import { Characteristic, RatingPage, User } from 'dto'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppEmoji from 'components/UI/AppEmoji'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'
import AppTypography from 'components/UI/AppTypography'
import TabNames from './TabNames'

const TABS: Characteristic[] = ['motivation', 'creativity', 'support']

const queryFn = async () => (await Axios.get(ROUTE.RATING)).data

export default function Rating(): JSX.Element {
  const { data, status } = useQuery<RatingPage>('rating', queryFn)
  const { meta, motivation, creativity, support, client } = (data as RatingPage) || {}
  const { query } = useRouter()

  return (
    <Layout client={client} status={status} {...meta}>
      <Container fixed>
        <AppHeader name="completed">Rating</AppHeader>
      </Container>
      <AppBox flexDirection="column" spacing={2} mt={4}>
        <AppTabs
          tabs={TABS.map((type) => (
            <AppBox alignItems="center" spacing={1} key={type}>
              <AppEmoji name={type} variant="h6" />
              <AppTypography style={{ textTransform: 'none' }}>{type}</AppTypography>
            </AppBox>
          ))}
          content={[motivation, creativity, support].map(({ list, characteristic }) => (
            <Fragment key={characteristic}>
              <TabNames />
              <AppList<User>
                elements={list}
                keyGetter={(el) => el.id}
                render={(el, index) => <UserCard type="rating" {...el} characteristic={characteristic} index={index} />}
              />
            </Fragment>
          ))}
          initial={!query.tab ? undefined : +query.tab}
          ariaLabel="rating by characteristics"
        />
      </AppBox>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('rating', queryFn)

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}
