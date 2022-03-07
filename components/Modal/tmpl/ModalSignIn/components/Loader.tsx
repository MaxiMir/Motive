import { Skeleton } from '@material-ui/lab'

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps): JSX.Element {
  return (
    <>
      {[...new Array(count)].map((_, key) => (
        <Skeleton animation="wave" variant="rect" height={36.5} key={key} />
      ))}
    </>
  )
}
