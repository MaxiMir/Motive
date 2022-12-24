type MakeMapLoader = <T>() => (locale: string, query: () => Promise<T>) => Promise<T>

export const makeMapLoader: MakeMapLoader = () => {
  const langMap = new Map()

  return (locale, query) => {
    if (!langMap.has(locale)) {
      langMap.set(locale, query())
    }

    return langMap.get(locale)
  }
}
