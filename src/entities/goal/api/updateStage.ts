import { DayCharacteristicUpdateDto } from '@shared/api/day'
import { fetcher } from '@shared/config'

export const updateStage = ({ id, ...data }: DayCharacteristicUpdateDto): Promise<void> => {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
