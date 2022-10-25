import { PhotoDto } from 'src/common/dto'
import { getUrlWithHost } from 'src/common/helpers/url'

export const getPhotosWithSource = (photos: PhotoDto[]): PhotoDto[] =>
  photos.map((item) => ({ ...item, src: getUrlWithHost(item.src) }))
