import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { Container } from '@material-ui/core'
import { PageSWR, RatingPage, MainCharacteristicName } from 'dto'
import PageService from 'services/PageService'
import Layout from 'layout'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import TabContent from './components/TabContent'
import TabName from './components/TabName'

const TAB_NAMES: MainCharacteristicName[] = ['motivation', 'creativity', 'support']

export default function Rating({ fallbackData }: PageSWR<RatingPage>): JSX.Element {
  const { query } = useRouter()
  const { data, error } = useSWR('Rating', PageService.getRating, { fallbackData })

  return (
    <Layout {...data?.meta} error={error}>
      {data?.content && (
        <>
          <Container fixed>
            <AppHeader name="completed">Rating</AppHeader>
          </Container>
          <AppBox flexDirection="column" spacing={2} mt={4}>
            <AppTabs
              tabs={TAB_NAMES.map((name) => (
                <TabName name={name} key={name} />
              ))}
              content={TAB_NAMES.map((name) => (
                <TabContent name={name} users={data.content[name]} key={name} />
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
