import dynamic from 'next/dynamic'
import { ModalActionSubmitProps } from './tmpl/ModalActionSubmit'
import { ModalActionCloseProps } from './tmpl/ModalActionClose'

const ModalActionSubmit = dynamic(() => import('./tmpl/ModalActionSubmit'))
const ModalActionClose = dynamic(() => import('./tmpl/ModalActionClose'))

export default function ModalAction(props: ModalActionSubmitProps | ModalActionCloseProps): JSX.Element {
  switch (props.tmpl) {
    case 'submit':
      return <ModalActionSubmit {...props} />
    case 'close':
      return <ModalActionClose {...props} />
  }
}
