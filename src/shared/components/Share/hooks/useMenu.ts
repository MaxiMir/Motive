import { Dispatch, SetStateAction, useEffect, useState } from 'react'

type UseMenuResult = [boolean, Dispatch<SetStateAction<boolean>>]

export const useMenu = (url: string, title: string): UseMenuResult => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!navigator.share) {
      setOpen(true)
      return
    }

    navigator.share({ title, url }).catch(() => false)
  }, [title, url])

  return [open, setOpen]
}
