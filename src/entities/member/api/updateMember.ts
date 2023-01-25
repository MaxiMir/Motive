import { MemberDto, UpdateMemberDto } from '@shared/api/member'
import { fetcher } from '@shared/config'

export const updateMember = ({ id, ...data }: UpdateMemberDto): Promise<MemberDto> => {
  return fetcher.patch(`/members/${id}`, data)
}
