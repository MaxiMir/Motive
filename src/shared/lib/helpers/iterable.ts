type MapLoader<T> = (key: string, query: () => Promise<T>) => Promise<T>

export function makeMapLoader<T>(): MapLoader<T> {
  const langMap = new Map()

  return (key, query) => {
    if (!langMap.has(key)) {
      langMap.set(key, query())
    }

    return langMap.get(key)
  }
}

export function range(count: number) {
  return Array.from(Array(count).keys()).map((k) => k + 1)
}
