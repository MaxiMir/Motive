import { useRouter } from 'next/router'

export const useRatingTab = () => {
  const { query } = useRouter()
  const parsedTab = Math.abs(Number(query?.tab))

  return !parsedTab || parsedTab > 2 ? 0 : parsedTab
}
