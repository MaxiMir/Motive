import { useMutation } from 'react-query'
import { useViewer } from 'entities/viewer'
import { incrementDayViews } from 'shared/api'

export function useIncreaseViews(ownerId: number, dayId: number) {
  const viewer = useViewer()
  const enabled = viewer && viewer?.id !== ownerId

  return useMutation(() => (!enabled ? Promise.resolve() : incrementDayViews(dayId)))
}
