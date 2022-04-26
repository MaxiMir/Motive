import { Skeleton } from '@mui/material'

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps) {
  return (
    <>
      {[...new Array(count)].map((_, key) => (
        <Skeleton animation="wave" variant="rectangular" height={36.5} key={key} />
      ))}
    </>
  )
}
