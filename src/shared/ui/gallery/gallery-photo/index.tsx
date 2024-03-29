import { RenderPhotoProps } from 'react-photo-album'
import Image from 'shared/ui/image'

export function GalleryPhoto({
  imageProps: { src, alt, title, sizes, className, onClick },
  wrapperStyle,
}: RenderPhotoProps) {
  return (
    <div style={wrapperStyle}>
      <div
        style={{
          display: 'block',
          position: 'relative',
          width: '100%',
          height: '100%',
          cursor: 'pointer',
        }}
      >
        <Image
          fill
          src={src}
          alt={alt}
          title={title}
          sizes={sizes}
          className={className}
          onClick={onClick}
        />
      </div>
    </div>
  )
}
