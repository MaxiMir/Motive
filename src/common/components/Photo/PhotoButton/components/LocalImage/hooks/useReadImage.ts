import { useEffect, useState } from 'react'

const useReadImage = (file: File): string | undefined => {
  const [source, setSource] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = () => setSource(reader.result as string)
    reader.readAsDataURL(file)
  }, [file])

  return source
}

export default useReadImage
