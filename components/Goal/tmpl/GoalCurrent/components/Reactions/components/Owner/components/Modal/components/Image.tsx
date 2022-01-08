import { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core'

interface ImageProps {
  file: File
}

export default function Image({ file }: ImageProps): JSX.Element {
  const classes = useStyles()
  const [image, setImage] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()

    reader.onloadend = () => setImage(reader.result as string)

    reader.readAsDataURL(file)
  }, [file])

  return <>{image && <img src={image} alt={file.name} className={classes.root} />}</>
}

const useStyles = makeStyles({
  root: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 4,
  },
})
