import { getSearchParams, setQueryParams } from 'helpers/url'

export const getServerSideUrl = (url: string): string => {
  const isClient = url?.includes('_next')

  if (!isClient) {
    return url
  }

  const { id, ...params } = getSearchParams(url)

  return setQueryParams(`/${id}`, params)
}
