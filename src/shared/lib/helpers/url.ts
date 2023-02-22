export const joinToHref = (...args: string[]) => `/${args.join('')}`

export const parseUrl = (url: string) => {
  const [origin, params = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(params)

  return { origin, searchParams }
}

export const getSearchParams = (url: string) => {
  const { searchParams } = parseUrl(url)

  return Object.fromEntries(searchParams)
}

export const getCurrentSearchParams = () => getSearchParams(window.location.search)

const toUrl = (url: string, searchParams: URLSearchParams) => {
  return [url, searchParams].join(!searchParams.toString() ? '' : '?')
}

export const setSearchParams = (url: string, params: Record<string, string | number>) => {
  const { origin, searchParams } = parseUrl(url)

  Object.entries(params).forEach(([name, value]) => {
    searchParams.set(name, value.toString())
  })

  return toUrl(origin, searchParams)
}

export const getStaticSrc = (src: string) => {
  return src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src
}
