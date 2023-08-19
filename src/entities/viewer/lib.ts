import { useSession } from 'next-auth/react'
import { GoalDto } from 'shared/api'
import { useSignIn } from './model'
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

export type ViewerPart = ReturnType<typeof useViewerPart>

export function useViewerPart(goal: GoalDto, pageOwning: boolean) {
  const viewer = useViewer()
  const goalOwning = goal.owner.id === viewer?.id

  return {
    all: pageOwning && goalOwning,
    page: pageOwning,
    goal: goalOwning,
    member: goal.member,
  }
}

export function useViewerAct<T extends unknown[]>(
  act?: (...args: T) => void,
  callbackUrl?: string,
) {
  const viewer = useViewer()
  const openSignIn = useSignIn((state) => state.openSignIn)

  return (...args: T) => {
    if (!viewer) {
      openSignIn({ callbackUrl: callbackUrl || window?.location.href })
      return
    }

    act?.(...args)
  }
}
