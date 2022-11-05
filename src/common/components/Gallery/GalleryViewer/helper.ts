import { PhotoDto } from '@dto'
import { getImageSrc } from '@href'

export const getPhotosWithSource = (photos: PhotoDto[]): PhotoDto[] =>
  photos.map((item) => ({ ...item, src: getImageSrc(item.src) }))
