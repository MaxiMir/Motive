import { GetServerSideProps } from 'next'
import Axios from 'lib/axios'
import { Typography } from '@material-ui/core'
import { ROUTE } from 'route'
import { Characteristic, RatingPage, User } from 'dto'
import Layout from 'layout'
import UserCard from 'components/UserCard'
import AppCharacteristic from 'components/UI/AppCharacteristic'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'
import AppList from 'components/UI/AppList'

const TABS: Characteristic[] = ['motivation', 'creativity', 'support']

const Rating = ({ motivation, creativity, support }: RatingPage) => (
  <Layout>
    <AppBox flexDirection="column" spacing={3}>
      <AppHeader src="/images/completed.png">Rating</AppHeader>
      <AppTabs
        tabs={TABS.map((type, index) => (
          <AppBox alignItems="center" spacing={1} key={index}>
            <AppCharacteristic name={type} variant="h6" />
            <Typography style={{ textTransform: 'none' }}>{type}</Typography>
          </AppBox>
        ))}
        content={[motivation, creativity, support].map(
          ({ list, type }, index) => (
            <AppList<User>
              elements={list}
              spacing={4}
              render={(el, index) => (
                <UserCard {...el} type={type} index={index} view="rating" />
              )}
              key={index}
            />
          ),
        )}
        ariaLabel="rating by characteristics"
      />
    </AppBox>
  </Layout>
)

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await Axios.get(ROUTE.RATING)

  return { props: data }
}

export default Rating
