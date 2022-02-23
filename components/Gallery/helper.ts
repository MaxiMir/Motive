import { PhotoDto, PhotoWithSourceDto } from 'dto'
import { getImageUrl } from 'helpers/url'

export const getPhotosWithSource = (photos: PhotoDto[]): PhotoWithSourceDto[] =>
  photos.map((item) => {
    const imageUrl = getImageUrl(item.src)

    return { ...item, src: imageUrl, source: imageUrl }
  })
