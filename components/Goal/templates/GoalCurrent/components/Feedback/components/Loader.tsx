import { Skeleton } from '@material-ui/lab'

export default function Loader(): JSX.Element {
  return (
    <>
      <Skeleton animation="wave" variant="text" height={24} />
      <Skeleton animation="wave" width={60} height={29} />
      <Skeleton animation="wave" variant="rect" height={100} style={{ borderRadius: 8 }} />
    </>
  )
}
