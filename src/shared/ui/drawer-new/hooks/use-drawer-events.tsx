import { RefObject, useEffect } from 'react'
import { OPEN_ANIMATION } from '../constants'

interface Options {
  isOpen: boolean
}

export const useDrawerEvents = (drawerRef: RefObject<HTMLDivElement>, { isOpen }: Options) => {
  useEffect(() => {
    if (!isOpen) {
      return () => undefined
    }

    const onAnimationEnd = (e: AnimationEvent) => {
      if (!OPEN_ANIMATION.includes(e.animationName)) return

      document.body.classList.add('overflow-hidden')
    }

    drawerRef.current?.addEventListener('animationend', onAnimationEnd)

    return () => {
      document.body.classList.remove('overflow-hidden')
      drawerRef.current?.removeEventListener('animationend', onAnimationEnd)
    }
  }, [drawerRef, isOpen])
}
