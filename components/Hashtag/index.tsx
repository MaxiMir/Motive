import dynamic from 'next/dynamic'
import { HashtagChipProps } from './tmpl/HashtagChip'
import { HashtagSearchProps } from './tmpl/HashtagSearch'

const HashtagChip = dynamic(() => import('./tmpl/HashtagChip'))
const HashtagSearch = dynamic(() => import('./tmpl/HashtagSearch'))

export default function Hashtag(props: HashtagChipProps | HashtagSearchProps): JSX.Element {
  switch (props.tmpl) {
    case 'chip':
      return <HashtagChip {...props} />
    case 'search':
      return <HashtagSearch {...props} />
  }
}
