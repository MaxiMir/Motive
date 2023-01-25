import fetcher from '@shared/api/fetcher'
import { GoalStageDto } from '@entities/goal/model/dto'

export const updateStage = ({ id, ...data }: GoalStageDto): Promise<void> => {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
