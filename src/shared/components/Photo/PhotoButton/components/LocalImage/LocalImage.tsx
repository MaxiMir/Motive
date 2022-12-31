import React from 'react'
import dynamic from 'next/dynamic'
import { useReadImage } from './hooks/useReadImage'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const Img = dynamic(() => import('./components/Img'))

interface LocalImageProps {
  file: File
}

function LocalImage({ file }: LocalImageProps) {
  const src = useReadImage(file)

  return <>{!src ? <CircularProgress size={14.5} color="warning" /> : <Img src={src} />}</>
}

export default LocalImage
