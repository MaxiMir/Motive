import useSWR, { SWRResponse } from 'swr'
import { FavoritesPage, User } from 'dto'
import usePartialMutate from 'hooks/usePartialMutate'
import PageService from 'services/PageService'

const SWR_KEY = 'FAVORITES'

type UseFavoritesPage = [SWRResponse<FavoritesPage>, (user: User[]) => void]

export default function useFavoritesPage(fallbackData: FavoritesPage): UseFavoritesPage {
  const swr = useSWR(SWR_KEY, PageService.getFavorites, { fallbackData })
  const mutate = usePartialMutate(SWR_KEY)

  const mutateFavorites = (users: User[]) => {
    mutate({ ...swr.data, content: users }, false)
  }

  return [swr, mutateFavorites]
}
