import { ClientDto, UserBaseDto } from 'dto'

export const checkOnOwner = (owner: UserBaseDto, client?: ClientDto): boolean => owner.id === client?.id
