import fetcher from '@shared/api/fetcher'
import { MemberDto, UpdateMemberDto } from '@app/model/member'

export const updateMember = ({ id, ...data }: UpdateMemberDto): Promise<MemberDto> => {
  return fetcher.patch(`/members/${id}`, data)
}
