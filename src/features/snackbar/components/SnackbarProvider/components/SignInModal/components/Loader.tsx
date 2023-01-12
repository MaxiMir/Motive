import { Skeleton } from '@mui/material'

interface LoaderProps {
  count: number
}

function Loader({ count }: LoaderProps) {
  const list = [...new Array(count)]

  return (
    <>
      {list.map((_, key) => (
        <Skeleton animation="wave" variant="rectangular" height={36.5} key={key} />
      ))}
    </>
  )
}

export default Loader
