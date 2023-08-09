export function joinToHref(...args: string[]) {
  return `/${args.join('')}`
}

export function parseUrl(url: string) {
  const [origin, params = ''] = url.split('?', 2)
  const searchParams = new URLSearchParams(params)

  return { origin, searchParams }
}

export function getSearchParams(url: string) {
  const { searchParams } = parseUrl(url)

  return Object.fromEntries(searchParams)
}

export function getCurrentSearchParams() {
  return getSearchParams(window.location.search)
}

function toUrl(url: string, searchParams: URLSearchParams) {
  return [url, searchParams].join(!searchParams.toString() ? '' : '?')
}

export function setSearchParams(url: string, params: Record<string, string | number>) {
  const { origin, searchParams } = parseUrl(url)

  Object.entries(params).forEach(([name, value]) => {
    searchParams.set(name, value.toString())
  })

  return toUrl(origin, searchParams)
}

export function getStaticSrc(src: string) {
  return src.includes('https://') ? src : process.env.NEXT_PUBLIC_APP_URL + src
}
