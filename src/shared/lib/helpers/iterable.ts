type MapLoader<T> = (locale: string, query: () => Promise<T>) => Promise<T>

export function makeMapLoader<T>(): MapLoader<T> {
  const langMap = new Map()

  return (locale, query) => {
    if (!langMap.has(locale)) {
      langMap.set(locale, query())
    }

    return langMap.get(locale)
  }
}

export function range(count: number) {
  return Array.from(Array(count).keys()).map((k) => k + 1)
}
