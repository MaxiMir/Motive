import React from 'react'
import Image from 'next/image'
import { PhotoProps } from 'react-photo-album'
import { Box } from '@mui/material'
import useLocale from 'hooks/useLocale'
import i18n from './i18n'

type GalleryPhotoProps = PhotoProps & {
  wrapperProps?: React.HTMLAttributes<HTMLDivElement>
  onClick?: (index: number) => void
}

export default function GalleryPhoto({ photo, layout, imageProps, wrapperProps, onClick }: GalleryPhotoProps) {
  const { locale } = useLocale()
  const { ariaLabel } = i18n[locale]
  const { width, height } = photo
  const { src, alt, title, style, sizes, className } = imageProps
  const { style: wrapperStyle, ...restWrapperProps } = wrapperProps || {}

  const onClickHandler = () => onClick?.(layout.index)

  return (
    <Box
      aria-label={onClick ? ariaLabel : undefined}
      sx={{
        width: style.width,
        padding: style.padding,
        marginBottom: style.marginBottom,
        cursor: onClick && 'pointer',
        borderRadius: 1,
        overflow: 'hidden',
        ...wrapperStyle,
      }}
      {...restWrapperProps}
    >
      <Image
        src={src}
        alt={alt}
        title={title}
        sizes={sizes}
        width={width}
        height={height}
        className={className}
        onClick={onClickHandler}
      />
    </Box>
  )
}
