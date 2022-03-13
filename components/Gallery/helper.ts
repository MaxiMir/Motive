import { PhotoDto } from 'dto'
import { getImageUrl } from 'helpers/url'

export const getPhotosWithSource = (photos: PhotoDto[]): PhotoDto[] =>
  photos.map((item) => ({ ...item, src: getImageUrl(item.src) }))
