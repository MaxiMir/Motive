import dynamic from 'next/dynamic'
import { ModalAuthProps } from './templates/ModalAuth'

const ModalAuth = dynamic(() => import('./templates/ModalAuth'))

export default function Modal(props: ModalAuthProps): JSX.Element {
  switch (props.type) {
    case 'auth':
      return <ModalAuth {...props} />
    default:
      return <></>
  }
}
