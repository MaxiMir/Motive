import dynamic from 'next/dynamic'
import { ModalAuthProps } from './tmpl/ModalAuth'

const ModalAuth = dynamic(() => import('./tmpl/ModalAuth'))

export default function Modal(props: ModalAuthProps): JSX.Element {
  switch (props.tmpl) {
    case 'auth':
      return <ModalAuth {...props} />
    default:
      return <></>
  }
}
