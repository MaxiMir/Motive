import { useEffect, useState } from 'react'
import useSnackbar from '@hooks/useSnackbar'

type UseMenu = (
  title: string,
  url: string,
  onCloseShare: () => void,
) => [open: boolean, onClose: () => void]

export const useMenu: UseMenu = (title, url, onCloseShare) => {
  const [open, setOpen] = useState(false)
  const [, closeSnackbar] = useSnackbar()

  const onClose = () => {
    setOpen(false)
    onCloseShare()
  }

  useEffect(() => {
    if (!navigator.share) {
      setOpen(true)
      return
    }

    navigator.share({ title, url }).catch(onCloseShare)
  }, [onCloseShare, title, url])

  useEffect(() => {
    open && closeSnackbar()
  }, [closeSnackbar, open])

  return [open, onClose]
}
