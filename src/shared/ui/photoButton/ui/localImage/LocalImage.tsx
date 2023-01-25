import { styled } from '@mui/system'
import dynamic from 'next/dynamic'
import { useReadImage } from './lib/hooks/useReadImage'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface LocalImageProps {
  file: File
}

function LocalImage({ file }: LocalImageProps) {
  const src = useReadImage(file)

  return (
    <>{!src ? <CircularProgress size={14.5} color="warning" /> : <ImgNative src={src} alt="" />}</>
  )
}

const ImgNative = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  borderRadius: 4,
})

export default LocalImage
