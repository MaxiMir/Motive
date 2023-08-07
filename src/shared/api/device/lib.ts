import { Device } from './dto'

export function checkOnMobile(device?: Device): boolean {
  return ['feature phone', 'smartphone', 'phablet'].includes(device || '')
}
