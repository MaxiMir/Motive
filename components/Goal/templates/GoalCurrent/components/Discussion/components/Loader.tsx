import { Skeleton } from '@material-ui/lab'
import AppBox from 'components/UI/AppBox'

interface LoaderProps {
  count: number
}

export default function Loader({ count }: LoaderProps): JSX.Element {
  return (
    <>
      <AppBox spacing={2} alignItems="flex-end" mb={2}>
        <Skeleton animation="wave" variant="circle" width={40} height={40} />
        <Skeleton animation="wave" width="calc(100% - 112px)" height={3} />
      </AppBox>
      {[...new Array(count)].map((_, key) => (
        <AppBox spacing={2} key={key}>
          <Skeleton animation="wave" variant="circle" width={40} height={40} />
          <AppBox flexDirection="column" spacing={1} flex={1}>
            <Skeleton animation="wave" width={60} height={16} />
            <Skeleton animation="wave" width="100%" height={32} />
            <AppBox spacing={2}>
              <Skeleton animation="wave" width={16} />
              <Skeleton animation="wave" width={16} />
            </AppBox>
          </AppBox>
        </AppBox>
      ))}
    </>
  )
}
