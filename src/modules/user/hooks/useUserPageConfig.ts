import { useRouter } from 'next/router'

const useUserPageConfig = () => {
  const { query, asPath } = useRouter()
  const id = Array.isArray(query.id) ? query.id[0] : query.id

  return { key: id || 'detail', asPath }
}

export default useUserPageConfig
