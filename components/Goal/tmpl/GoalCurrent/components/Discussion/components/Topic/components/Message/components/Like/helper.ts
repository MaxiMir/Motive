import { MessageDto, UserBaseDto } from 'dto'

export const checkOnOwner = (message: MessageDto, client?: UserBaseDto): boolean => message.user.id === client?.id
