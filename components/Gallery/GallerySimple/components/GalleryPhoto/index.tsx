import React from 'react'
import { PhotoProps } from 'react-photo-album'
import { Box } from '@mui/material'
import useLocale from 'hooks/useLocale'
import AppImage from 'components/ui/AppImage'
import i18n from './i18n'

interface GalleryPhotoProps extends PhotoProps {
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
      <AppImage
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
