import { FC } from 'react'
import { Layout } from 'layout'
import { AppLink } from 'components/UI/AppLink'

const Profile: FC = () => {
  return (
    <Layout>
      <AppLink href="/" title="main">
        Back
      </AppLink>
    </Layout>
  )
}

export default Profile
