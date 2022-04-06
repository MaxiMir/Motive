import AppBox from 'components/UI/AppBox'
import Hashtag from 'components/Hashtag'

interface HashtagsProps {
  hashtags: string[]
}

export default function Hashtags({ hashtags }: HashtagsProps): JSX.Element {
  return (
    <AppBox flexWrap="wrap" gap={1}>
      {hashtags?.map((hashtag) => (
        <Hashtag tmpl="chip" name={hashtag} key={hashtag} />
      ))}
    </AppBox>
  )
}
