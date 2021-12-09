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
import TabNames from './components/TabNames'

export default function Rating({ fallbackData }: PageSWR<RatingPage>): JSX.Element {
  const { query } = useRouter()
  const { data, error } = useSWR('Rating', PageService.getRating, { fallbackData })
  const { meta, content } = data || {}

  return (
    <Layout {...meta} error={error}>
      {content && (
        <>
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
              content={(['motivation', 'creativity', 'support'] as MainCharacteristic[]).map((characteristicName) => (
                <Fragment key={characteristicName}>
                  <TabNames />
                  <AppList<User>
                    elements={content[characteristicName]}
                    keyGetter={(el) => el.id}
                    render={(user, index) => (
                      <UserCard type="rating" {...user} characteristicName={characteristicName} index={index} />
                    )}
                  />
                </Fragment>
              ))}
              initial={!query.tab ? undefined : +query.tab}
              ariaLabel="rating by characteristics"
            />
          </AppBox>
        </>
      )}
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
