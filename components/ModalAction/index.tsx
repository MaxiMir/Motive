import dynamic from 'next/dynamic'
import { SubmitProps } from './tmpl/Submit'
import { CloseProps } from './tmpl/Close'

const Submit = dynamic(() => import('./tmpl/Submit'))
const Close = dynamic(() => import('./tmpl/Close'))

export default function ModalAction(props: SubmitProps | CloseProps): JSX.Element {
  switch (props.tmpl) {
    case 'submit':
      return <Submit {...props} />
    case 'close':
      return <Close {...props} />
    default:
      return <></>
  }
}
