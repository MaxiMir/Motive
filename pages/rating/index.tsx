import { Fragment } from 'react'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Container } from '@material-ui/core'
import { PageSWR, RatingPage, User, MainCharacteristic } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppEmoji from 'components/UI/AppEmoji'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'
import AppTypography from 'components/UI/AppTypography'
import TabNames from './TabNames'

export default function Rating({ fallbackData }: PageSWR<RatingPage>): JSX.Element {
  const { query } = useRouter()
  const { data, error } = useSWR('Rating', PageService.getRating, { fallbackData })
  const { meta, motivation, creativity, support, client } = (data as RatingPage) || {}

  return (
    <Layout client={client} error={error} {...meta}>
      <Container fixed>
        <AppHeader name="completed">Rating</AppHeader>
      </Container>
      <AppBox flexDirection="column" spacing={2} mt={4}>
        <AppTabs
          tabs={(['motivation', 'creativity', 'support'] as MainCharacteristic[]).map((type) => (
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
                keyGetter={(el) => el.nickname}
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
  const data = await PageService.getRating()

  return {
    props: {
      fallbackData: data,
    },
  }
}
