import { useState } from 'react'

export default function useFavorite(id: string, initial: boolean): [boolean, () => void] {
  const [isFavorite, setIsFavorite] = useState(initial)

  const onChange = () => {
    const newState = !isFavorite

    setIsFavorite(newState)
    console.log('useFavorite', id)
  }

  return [isFavorite, onChange]
}
