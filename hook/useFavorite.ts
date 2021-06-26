export const useFavorite = (id: string) => {
  const onAdd = () => {
    console.log('onAdd', id)
  }

  const onRemove = () => {
    console.log('onRemove', id)
  }

  return [onAdd, onRemove]
}
