import React from 'react'
import { PhotoProps } from 'react-photo-album'
import { Box } from '@mui/material'
import AppImage from '@ui/AppImage'
import { useMessages } from './hooks/useMessages'

interface GalleryPhotoProps extends PhotoProps {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>
  onClick: (index: number) => void
}

function GalleryPhoto({
  photo,
  layout,
  imageProps,
  wrapperProps = {},
  onClick,
}: GalleryPhotoProps) {
  const messages = useMessages()
  const { width, height } = photo
  const { src, alt, title, style, sizes, className } = imageProps
  const { style: wrapperStyle, ...restWrapperProps } = wrapperProps

  const onClickHandler = () => onClick?.(layout.index)

  return (
    <Box
      aria-label={messages.ariaLabel}
      sx={{
        width: style.width,
        padding: style.padding,
        marginBottom: style.marginBottom,
        cursor: 'pointer',
        borderRadius: 1,
        overflow: 'hidden',
        ...wrapperStyle,
      }}
      {...restWrapperProps}
    >
      <AppImage
        src={src}
        alt={alt}
        title={title}
        sizes={sizes}
        width={width}
        height={height}
        draggable={false}
        className={className}
        onClick={onClickHandler}
      />
    </Box>
  )
}

export default GalleryPhoto
