import dynamic from 'next/dynamic'
import AppBox from 'components/UI/AppBox'
import Reaction from './components/Reaction'

const Reply = dynamic(() => import('./components/Reply'))

interface ReactionsProps {
  like: number
  dislike: number
  onClick?: () => void
}

export default function Reactions({ like, dislike, onClick }: ReactionsProps): JSX.Element {
  return (
    <AppBox spacing={1} paddingLeft="48px">
      {onClick && <Reply onClick={onClick} />}
      <Reaction type="like" count={like} />
      <Reaction type="dislike" count={dislike} />
    </AppBox>
  )
}
