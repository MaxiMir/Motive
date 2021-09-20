import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import useSWR, { useSWRConfig } from 'swr'
import { Goal, PageSWR, UserPage } from 'dto'
import PageService from 'services/PageService'
import { scrollToElem } from 'helpers/dom'
import { useSnackbar } from 'hooks/useSnackbar'
import Layout from 'layout'
import UserCard from 'components/UserCard'

export default function UserDetail({ fallbackData }: PageSWR<UserPage>): JSX.Element {
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar()
  const mutateSWR = useSWRConfig().mutate
  const { data, error } = useSWR<UserPage>(router.asPath, () => PageService.getDynamic(router.asPath), {
    fallbackData,
  })
  const { meta, user, client } = (data as UserPage) || {}

  const onAddGoal = async (goal: Goal) => {
    mutateSWR(router.asPath, { ...data, user: { ...user, goals: [...user.goals, goal] } }, false)
    enqueueSnackbar({ message: 'The goal is successfully created', severity: 'success', icon: '💎' })
    setTimeout(() => scrollToElem(`goal-${goal.id}`), 500)
  }

  return (
    <Layout client={client} error={error} {...meta}>
      <UserCard type="detail" client={client} {...user} onAddGoal={onAddGoal} />
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const url = ctx.req.url as string

  const data = await PageService.getDynamic(url)

  return {
    props: {
      fallbackData: data,
    },
  }
}
