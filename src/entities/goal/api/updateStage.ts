import fetcher from '@shared/api/fetcher'
import { DayCharacteristicUpdateDto } from '@app/model/day'

export const updateStage = ({ id, ...data }: DayCharacteristicUpdateDto): Promise<void> => {
  return fetcher.patch(`/goals/${id}/stage`, data)
}
