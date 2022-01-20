import { GetServerSideProps } from 'next'
import PageService from 'services/PageService'

export default function UserFollowers(): JSX.Element {
  return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  if (ctx.req.url?.includes('_next')) {
    return {
      props: {
        fallbackData: null,
      },
    }
  }

  const fallbackData = await PageService.getUser(ctx.req.url || '')

  if (!fallbackData.content) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      fallbackData,
    },
  }
}
