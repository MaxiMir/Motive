import produce from 'immer'
import { MainCharacteristic, UserCharacteristicDto } from 'dto'

const RADIUS = 175
const DIAMETER = Math.round(Math.PI * RADIUS * 2)
const DASHARRAY = 1100

interface CircleItemInit {
  name: MainCharacteristic
  size: number
  strokeWidth: number
  strokeWidthBg: number
}

const CIRCLE_ITEMS: CircleItemInit[] = [
  {
    name: MainCharacteristic.MOTIVATION,
    size: 98,
    strokeWidth: 15,
    strokeWidthBg: 24,
  },
  {
    name: MainCharacteristic.SUPPORT,
    size: 112,
    strokeWidth: 13,
    strokeWidthBg: 23,
  },
  {
    name: MainCharacteristic.CREATIVITY,
    size: 126,
    strokeWidth: 12,
    strokeWidthBg: 19,
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

export const getCircleItems = (characteristic: UserCharacteristicDto): CircleItem[] => {
  const items = CIRCLE_ITEMS.map((item) => ({
    ...item,
    radius: RADIUS,
    dasharray: DASHARRAY,
    offset: getOffset(characteristic[item.name]),
  }))
  const withSort = items.every((item) => item.offset < DASHARRAY)

  return !withSort ? items : produce(items, (draft) => draft.sort((i1, i2) => i1.offset - i2.offset))
}
