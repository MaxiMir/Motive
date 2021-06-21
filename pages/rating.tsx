import { FC } from 'react'
import Layout from 'layout'
import AppHeader from 'components/UI/AppHeader'
import AppTabs from 'components/UI/AppTabs'
import AppBox from 'components/UI/AppBox'

const Rating: FC = () => (
  <Layout>
    <AppBox flexDirection="column" spacing={3}>
      <AppHeader src="/images/completed.png">Rating</AppHeader>
      <AppTabs
        tabs={[<>Motivating</>, <>Creative</>, <>Supports</>]}
        content={['1', '2', '3']}
        ariaLabel="rating by characteristics"
      />
    </AppBox>
  </Layout>
)

export default Rating
