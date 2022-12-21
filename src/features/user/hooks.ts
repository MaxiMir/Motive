import { useMutation } from 'react-query'
import { UserService } from '@features/user/service'

export const useUpdatePhoto = (id: number) =>
  useMutation((file: File) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return UserService.updateAvatar(id, formData)
  })
