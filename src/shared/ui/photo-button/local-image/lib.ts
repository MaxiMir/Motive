import { useEffect, useState } from 'react'

export function useReadImage(file: File) {
  const [source, setSource] = useState<string>()

  useEffect(() => {
    const reader = new FileReader()
    reader.onload = () => setSource(reader.result as string)
    reader.readAsDataURL(file)
  }, [file])

  return source
}
