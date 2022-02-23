import { Skeleton } from '@material-ui/lab'
import AppBox from 'components/UI/AppBox'

const VISIBLE_QUANTITY = 2

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps): JSX.Element {
  const displayedCount = count > VISIBLE_QUANTITY ? VISIBLE_QUANTITY : count

  return (
    <AppBox flexDirection="column" spacing={2} padding={2}>
      {[...new Array(displayedCount)].map((_, key) => (
        <AppBox flexDirection="column" justifyContent="space-between" flex={1} spacing={3} key={key}>
          <Skeleton animation="wave" width={100} height={16} />
          <Skeleton animation="wave" variant="rect" width="100%" height={200} />
          <AppBox justifyContent="space-between">
            <Skeleton animation="wave" width={50} height={30} />
            <Skeleton animation="wave" width={50} height={30} />
            <Skeleton animation="wave" width={50} height={30} />
            <Skeleton animation="wave" width={50} height={30} />
          </AppBox>
          <Skeleton animation="wave" width={100} height={16} />
        </AppBox>
      ))}
    </AppBox>
  )
}
