import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { makeStyles } from '@material-ui/core'

const CircularProgress = dynamic(() => import('@material-ui/core/CircularProgress'))

interface ImageProps {
  file: File
}

// TODO HEIC images https://itnext.io/tackling-iphone-or-ipad-images-support-in-browser-8e3e64e9aaa1
export default function Image({ file }: ImageProps): JSX.Element {
  const classes = useStyles()
  const [image, setImage] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => setImage(reader.result as string)

    reader.readAsDataURL(file)
  }, [file])

  return (
    <>
      {!image ? (
        <CircularProgress size="0.9rem" color="primary" />
      ) : (
        <img src={image} alt={file.name} className={classes.root} />
      )}
    </>
  )
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
})
