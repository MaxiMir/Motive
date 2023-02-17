import { Device } from './dto'

export const checkOnMobile = (device?: Device): boolean => {
  return ['feature phone', 'smartphone', 'phablet'].includes(device || '')
}
