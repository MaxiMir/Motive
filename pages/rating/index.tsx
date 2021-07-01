import { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Axios from 'lib/axios'
import { Container, Typography } from '@material-ui/core'
import { ROUTE } from 'route'
import { Characteristic, RatingPage, User } from 'dto'
import Layout from 'layout'
import UserCardRating from 'components/UserCard/UserCardRating'
import AppEmoji from 'components/UI/AppEmoji'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'
import TabNames from './TabNames'

const TABS: Characteristic[] = ['motivation', 'creativity', 'support']

export default function Rating({ meta, motivation, creativity, support }: RatingPage): JSX.Element {
  const { query } = useRouter()

  return (
    <Layout {...meta}>
      <Container fixed>
        <AppHeader name="completed">Rating</AppHeader>
      </Container>
      <AppBox flexDirection="column" spacing={2} mt={4}>
        <AppTabs
          tabs={TABS.map((type) => (
            <AppBox alignItems="center" spacing={1} key={type}>
              <AppEmoji name={type} variant="h6" />
              <Typography style={{ textTransform: 'none' }}>{type}</Typography>
            </AppBox>
          ))}
          content={[motivation, creativity, support].map(({ list, type }) => (
            <Fragment key={type}>
              <TabNames />
              <AppList<User>
                elements={list}
                render={(el, index) => <UserCardRating {...el} type={type} index={index} />}
                keyGetter={(el) => el.id}
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
  const { data } = await Axios.get(ROUTE.RATING)

  return { props: data }
}
