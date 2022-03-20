import { getRandomSort } from 'helpers/prepare'

const GRADIENTS = [
  'linear-gradient(to top left, rgba(16, 114, 236, 0.3) 0%, rgb(16, 114, 236) 100%)',
  'linear-gradient(to top left, rgba(39, 133, 106, 0.3) 0%, rgb(39, 133, 106) 100%)',
  'linear-gradient(to top left, rgba(212, 0, 255, 0.3) 0%, rgb(212, 0, 255) 100%)',
  'linear-gradient(to top left, rgba(232, 16, 91, 0.3) 0%, rgb(232, 16, 91) 100%)',
  'linear-gradient(to top left, rgba(104, 197, 227, 0.3), rgb(104, 197, 227) 100%)',
  'linear-gradient(to top left, rgba(119, 119, 119, 0.3) 0%, rgb(119, 119, 119) 100%)',
  'linear-gradient(to top left, rgba(255, 39, 39, 0.3) 0%, rgb(255, 39, 39) 100%)',
  'linear-gradient(to top left, rgba(156, 240, 224, 0.3) 0%, rgb(156, 240, 224) 100%)',
  'linear-gradient(to top left, rgba(29, 49, 100, 0.3) 0%, rgb(29, 49, 100) 100%)',
  'linear-gradient(to top left, rgba(141, 104, 171, 0.3) 0%, rgb(141, 104, 171) 100%)',
  'linear-gradient(to top left, rgba(236, 255, 229, 0.3) 0%, rgb(236, 255, 229) 100%)',
  'linear-gradient(to top left, rgba(140, 25, 50, 0.3) 0%, rgb(140, 25, 50) 100%)',
]

export const getGradients = (): string[] => getRandomSort(GRADIENTS)
