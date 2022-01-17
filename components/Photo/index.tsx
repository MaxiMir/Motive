import dynamic from 'next/dynamic'
import { PhotoButtonProps } from './tmpl/PhotoButton'
import { PhotoInputProps } from './tmpl/PhotoInput'

const PhotoButton = dynamic(() => import('./tmpl/PhotoButton'))
const PhotoInput = dynamic(() => import('./tmpl/PhotoInput'))

export default function Photo(props: PhotoButtonProps | PhotoInputProps): JSX.Element {
  switch (props.tmpl) {
    case 'button':
      return <PhotoButton {...props} />
    case 'input':
      return <PhotoInput {...props} />
  }
}
