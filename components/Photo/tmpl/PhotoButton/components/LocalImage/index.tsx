import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const Img = dynamic(() => import('./components/Img'))

interface LocalImageProps {
  file: File
}

// TODO HEIC images https://itnext.io/tackling-iphone-or-ipad-images-support-in-browser-8e3e64e9aaa1
export default function LocalImage({ file }: LocalImageProps): JSX.Element {
  const [source, setSource] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => setSource(reader.result as string)

    reader.readAsDataURL(file)
  }, [file])

  return <>{!source ? <CircularProgress size="0.9rem" color="primary" /> : <Img src={source} />}</>
}
