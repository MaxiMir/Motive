import { MemberDto, UpdateMemberDto } from '@shared/api/dto'
import { fetcher } from '@shared/api/fetcher'

export const updateMember = ({ id, ...data }: UpdateMemberDto): Promise<MemberDto> => {
  return fetcher.patch(`/members/${id}`, data)
}
