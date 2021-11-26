import { Skeleton } from '@material-ui/lab'
import AppBox from 'components/UI/AppBox'

interface LoaderProps {
  count: number
  withInput: boolean
}

export default function Loader({ count, withInput }: LoaderProps): JSX.Element {
  return (
    <>
      {withInput && (
        <AppBox spacing={2} alignItems="flex-end" mb={2}>
          <Skeleton animation="wave" variant="circle" width={32} height={32} />
          <Skeleton animation="wave" width="calc(100% - 112px)" height={3} />
          <Skeleton animation="wave" width={24} height={16} />
        </AppBox>
      )}
      {[...new Array(count)].map((_, key) => (
        <AppBox flexDirection="column" spacing={1} flex={1} key={key}>
          <AppBox alignItems="flex-end" spacing={1}>
            <Skeleton animation="wave" variant="circle" width={26} height={26} />
            <Skeleton animation="wave" width={100} height={16} />
            <Skeleton animation="wave" variant="circle" width={21} height={21} />
          </AppBox>
          <AppBox justifyContent="space-between" spacing={2}>
            <Skeleton animation="wave" width="100%" height={32} />
            <Skeleton animation="wave" width={8} height={32} />
          </AppBox>
          <AppBox justifyContent="space-between" alignItems="center">
            <Skeleton animation="wave" width={100} height={15} />
            <AppBox spacing={1}>
              <Skeleton animation="wave" width={16} height={24} />
              <Skeleton animation="wave" width={28} height={24} />
            </AppBox>
          </AppBox>
        </AppBox>
      ))}
    </>
  )
}
