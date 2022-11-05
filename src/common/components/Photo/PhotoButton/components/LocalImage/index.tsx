import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))
const Img = dynamic(() => import('./components/Img'))

interface LocalImageProps {
  file: File
}

export default function LocalImage({ file }: LocalImageProps) {
  const [source, setSource] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()

    reader.onload = () => setSource(reader.result as string)

    reader.readAsDataURL(file)
  }, [file])

  return <>{!source ? <CircularProgress size="0.9rem" color="warning" /> : <Img src={source} />}</>
}
