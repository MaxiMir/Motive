import dynamic from 'next/dynamic'
import { HashtagChipProps } from './tmpl/HashtagChip'
import { HashtagGradientProps } from './tmpl/HashtagGradient'

const HashtagChip = dynamic(() => import('./tmpl/HashtagChip'))
const HashtagGradient = dynamic(() => import('./tmpl/HashtagGradient'))

export default function Hashtag(props: HashtagChipProps | HashtagGradientProps): JSX.Element {
  switch (props.tmpl) {
    case 'chip':
      return <HashtagChip {...props} />
    case 'gradient':
      return <HashtagGradient {...props} />
  }
}
