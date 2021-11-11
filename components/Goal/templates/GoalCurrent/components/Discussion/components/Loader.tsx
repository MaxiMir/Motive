import { Skeleton } from '@material-ui/lab'
import AppBox from 'components/UI/AppBox'

export default function Loader(): JSX.Element {
  return (
    <>
      <AppBox spacing={2} alignItems="flex-end" mb={2}>
        <Skeleton animation="wave" variant="circle" width={40} height={40} />
        <Skeleton animation="wave" width="calc(100% - 112px)" height={3} />
      </AppBox>
      <AppBox spacing={2}>
        <Skeleton animation="wave" variant="circle" width={40} height={40} />
        <AppBox flexDirection="column" spacing={1} flexGrow={1}>
          <Skeleton animation="wave" width={60} height={16} />
          <Skeleton animation="wave" width="100%" height={32} />
          <AppBox spacing={2}>
            <Skeleton animation="wave" width={16} />
            <Skeleton animation="wave" width={16} />
          </AppBox>
        </AppBox>
      </AppBox>
    </>
  )
}
