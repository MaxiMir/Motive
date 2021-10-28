import { useState } from 'react'
import { Discussion } from 'dto'
import DayService from 'services/DayService'

export default function GoalCardDiscussionContent(): JSX.Element {
  const [content, setContent] = useState<Discussion>()
  console.log(content, setContent, DayService.getDiscussion)
  return <>1111</>
}
