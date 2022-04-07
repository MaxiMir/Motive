import { Skeleton } from '@mui/material'
import AppBox from 'components/UI/AppBox'

const VISIBLE_QUANTITY = 6

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps): JSX.Element {
  const displayedCount = count > VISIBLE_QUANTITY ? VISIBLE_QUANTITY : count

  return (
    <AppBox flexDirection="column" gap={2} flex={1}>
      {[...new Array(displayedCount)].map((_, key) => (
        <AppBox gap={1} height={60} key={key}>
          <Skeleton animation="wave" variant="circular" width={55} height={55} />
          <AppBox flexDirection="column" justifyContent="space-between" flex={1}>
            <Skeleton animation="wave" width={100} height={16} />
            <AppBox justifyContent="space-between">
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
              <Skeleton animation="wave" width={50} height={30} />
            </AppBox>
          </AppBox>
        </AppBox>
      ))}
    </AppBox>
  )
}
