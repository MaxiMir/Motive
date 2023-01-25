import fetcher from '@shared/config/fetcher'
import { GoalStageDto } from '@shared/api/goal'

export const updateStage = ({ id, ...data }: GoalStageDto): Promise<void> => {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
