import dynamic from 'next/dynamic'
import { useViewer } from 'entities/viewer'

const Unauthorized = dynamic(() => import('./unauthorized'))
const User = dynamic(() => import('./user'))

function OpenProfile() {
  const viewer = useViewer()

  return <>{!viewer ? <Unauthorized /> : <User user={viewer} />}</>
}

export default OpenProfile
