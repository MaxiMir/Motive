import { useIsFetching } from 'react-query'
import dynamic from 'next/dynamic'

const Loader = dynamic(() => import('./ui').then((m) => m.Loader))

function ShowUpdate() {
  const fetchingNumber = useIsFetching({ queryKey: ['page'] })
  const renderLoader = fetchingNumber > 0

  return <>{renderLoader && <Loader />}</>
}

export default ShowUpdate
