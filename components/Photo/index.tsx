import dynamic from 'next/dynamic'
import { PhotoInputProps } from './tmpl/PhotoInput'
import { PhotoButtonProps } from './tmpl/PhotoButton'

const PhotoInput = dynamic(() => import('./tmpl/PhotoInput'))
const PhotoButton = dynamic(() => import('./tmpl/PhotoButton'))

export default function Photo(props: PhotoButtonProps | PhotoInputProps): JSX.Element {
  switch (props.tmpl) {
    case 'input':
      return <PhotoInput {...props} />
    case 'button':
      return <PhotoButton {...props} />
  }
}
