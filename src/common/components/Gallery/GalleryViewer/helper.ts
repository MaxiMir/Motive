import { PhotoDto } from '@dto'
import { getUrlWithHost } from '@helpers/url'

export const getPhotosWithSource = (photos: PhotoDto[]): PhotoDto[] =>
  photos.map((item) => ({ ...item, src: getUrlWithHost(item.src) }))
