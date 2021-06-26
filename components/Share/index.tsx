import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ShareMenu = dynamic(() => import('./ShareMenu'))

interface ShareProps {
  title: string
  href: string
  onClose: () => void
}

const Share = ({ title, href, onClose }: ShareProps) => {
  const [withMenu, setWithMenu] = useState(false)
  const url = process.env.NEXT_PUBLIC_SERVER_BASE_URL + href

  const onCloseMenu = () => {
    setWithMenu(false)
    onClose()
  }

  useEffect(() => {
    if (!navigator.share) {
      setWithMenu(true)
      return
    }

    navigator.share({ title, url }).catch(onClose)
  }, [onClose, title, url])

  return (
    <>
      {withMenu && <ShareMenu title={title} url={url} onClose={onCloseMenu} />}
    </>
  )
}

export default Share

// TODO https://shivamethical.medium.com/creating-web-page-preview-while-sharing-url-via-social-applications-like-whats-app-fb-cd2e19b11bf2
