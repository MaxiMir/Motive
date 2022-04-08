import { styled } from '@mui/system'

interface ImgProps {
  src: string
}

export default function Img({ src }: ImgProps): JSX.Element {
  return <ImgNative src={src} alt="" />
}

const ImgNative = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 4,
})
