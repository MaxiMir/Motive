import { DayCharacteristicUpdateDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const updateStage = ({ id, ...data }: DayCharacteristicUpdateDto): Promise<void> => {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
