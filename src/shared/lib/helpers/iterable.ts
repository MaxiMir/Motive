type MapLoader<T> = (locale: string, query: () => Promise<T>) => Promise<T>

export const makeMapLoader = <T>(): MapLoader<T> => {
  const langMap = new Map()

  return (locale, query) => {
    if (!langMap.has(locale)) {
      langMap.set(locale, query())
    }

    return langMap.get(locale)
  }
}
