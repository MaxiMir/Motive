export default function useFavorite(id: string): [() => void, () => void] {
  const onAdd = () => {
    console.log('onAdd', id)
  }

  const onRemove = () => {
    console.log('onRemove', id)
  }

  return [onAdd, onRemove]
}
