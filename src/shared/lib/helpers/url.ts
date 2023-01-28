type SearchParamsEntries = Record<string, string | number>

export const parseUrl = (url: string) => {
  const [origin, params = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(params)

  return { origin, searchParams }
}

export const getCurrentSearchParams = (): Record<string, string> => {
  return getSearchParams(window.location.search)
}

export const getSearchParams = (url: string): Record<string, string> => {
  const { searchParams } = parseUrl(url)

  return Object.fromEntries(searchParams)
}

export const setSearchParams = (url: string, params: SearchParamsEntries): string => {
  const { origin, searchParams } = parseUrl(url)

  Object.entries(params).forEach(([name, value]) => {
    searchParams.set(name, value.toString())
  })

  return toUrl(origin, searchParams)
}

const toUrl = (url: string, searchParams: URLSearchParams): string => {
  return [url, searchParams].join(!searchParams.toString() ? '' : '?')
}

export const getImageSrc = (src: string): string => {
  return src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src
}
