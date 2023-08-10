import { useSession } from 'next-auth/react'
import { GoalDto, MemberDto } from 'shared/api'
import { Viewer } from './types'

export function useViewer(): Viewer | undefined {
  const { data, status } = useSession()
  const user = data?.user as Viewer | undefined

  return status !== 'authenticated' || !user
    ? undefined
    : {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        avatar: user.avatar,
      }
}

export interface ViewerPart {
  page: boolean
  goal: boolean
  member?: MemberDto
}

export function useViewerPart(goal: GoalDto, viewerPage: boolean): ViewerPart {
  const viewer = useViewer()

  return {
    page: viewerPage,
    goal: goal.owner.id === viewer?.id,
    member: goal.member,
  }
}
