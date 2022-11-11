export const makeMapLoader = <T>() => {
  const langMap = new Map<string, Promise<T>>()

  return (locale: string, query: () => Promise<T>) => {
    if (!langMap.has(locale)) {
      langMap.set(locale, query())
    }

    return langMap.get(locale) as Promise<T>
  }
}
