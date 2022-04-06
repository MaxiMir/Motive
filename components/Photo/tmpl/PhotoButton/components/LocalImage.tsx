import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@mui/styles'

const CircularProgress = dynamic(() => import('@mui/material/CircularProgress'))

interface LocalImageProps {
  file: File
}

// TODO HEIC images https://itnext.io/tackling-iphone-or-ipad-images-support-in-browser-8e3e64e9aaa1
export default function LocalImage({ file }: LocalImageProps): JSX.Element {
  const classes = useStyles()
  const [source, setSource] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => setSource(reader.result as string)

    reader.readAsDataURL(file)
  }, [file])

  return (
    <>
      {!source ? (
        <CircularProgress size="0.9rem" color="primary" />
      ) : (
        <img src={source} alt="" className={classes.image} />
      )}
    </>
  )
}

const useStyles = makeStyles({
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
})
