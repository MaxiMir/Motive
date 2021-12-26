import { UserPageDto } from 'dto'
import { createGenericContext } from 'context/createGenericContext'

export const UserPageContext = createGenericContext<UserPageDto>()
