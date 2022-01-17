import dynamic from 'next/dynamic'
import { VideoPreviewProps } from './tmpl/VideoPreview'
import { VideoInputProps } from './tmpl/VideoInput'

const VideoPreview = dynamic(() => import('./tmpl/VideoPreview'))
const VideoInput = dynamic(() => import('./tmpl/VideoInput'))

export default function Video(props: VideoPreviewProps | VideoInputProps): JSX.Element {
  switch (props.tmpl) {
    case 'preview':
      return <VideoPreview {...props} />
    case 'input':
      return <VideoInput {...props} />
  }
}
