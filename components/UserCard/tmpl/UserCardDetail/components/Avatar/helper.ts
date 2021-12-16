import produce from 'immer'
import { MainCharacteristicName, UserCharacteristic } from 'dto'

const RADIUS = 175
const DIAMETER = Math.round(Math.PI * RADIUS * 2)
const DASHARRAY = 1100

interface CircleItemInit {
  name: MainCharacteristicName
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

const CIRCLE_ITEMS: CircleItemInit[] = [
  {
    name: 'motivation',
    size: 99,
    strokeWidth: 18,
    strokeWidthBg: 25,
  },
  {
    name: 'creativity',
    size: 126,
    strokeWidth: 15,
    strokeWidthBg: 21,
  },
  {
    name: 'support',
    size: 113,
    strokeWidth: 17,
    strokeWidthBg: 22,
  },
]

const getOffset = (value: number): number => {
  const rest = (value % 1) * 100

  return Math.round(((100 - Math.min(rest, 100)) / 100) * DIAMETER)
}

interface CircleItem extends CircleItemInit {
  radius: number
  offset: number
  dasharray: number
}

export const getCircleItems = (characteristic: UserCharacteristic): CircleItem[] => {
  const items = CIRCLE_ITEMS.map((item) => ({
    ...item,
    radius: RADIUS,
    dasharray: DASHARRAY,
    offset: getOffset(characteristic[item.name]),
  }))
  const withSort = items.every((item) => item.offset < DASHARRAY)

  return !withSort ? items : produce(items, (draft) => draft.sort((i1, i2) => i1.offset - i2.offset))
}
