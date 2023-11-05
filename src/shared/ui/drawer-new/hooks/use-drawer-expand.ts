import { RefObject, useEffect, useRef } from 'react'
import { HEIGHT_FOR_AUTO_CLOSE } from '../constants'

interface Options {
  isOpen: boolean
  expanderRef: RefObject<HTMLDivElement>
  onClose: () => void
}

export const useDrawerExpand = (
  drawerRef: RefObject<HTMLDivElement>,
  { isOpen, expanderRef, onClose }: Options,
) => {
  const screenYStartRef = useRef(0)
  const screenYRef = useRef(0)
  const screenYEndRef = useRef(0)
  const rafIdRef = useRef<number>()

  useEffect(() => {
    if (!isOpen) {
      return () => undefined
    }

    const onMove = (e: TouchEvent | MouseEvent) => {
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current)
      }

      rafIdRef.current = requestAnimationFrame(() => {
        if (!drawerRef.current) return

        const screenY = e instanceof MouseEvent ? e.screenY : e.changedTouches[0].screenY

        if (!screenYEndRef.current) {
          // При первом перемещении используем высоту элемента:
          const { height } = drawerRef.current.getBoundingClientRect()
          screenYEndRef.current = -height
        }

        const progressY = screenY - screenYStartRef.current + screenYEndRef.current
        screenYRef.current =
          Math.abs(progressY) > window.innerHeight ? -window.innerHeight : progressY // Ограничаем свайп за пределами экрана вверху:
        const topCSS = `${Math.abs(screenYRef.current)}px`
        drawerRef.current.style.top =
          screenYRef.current > 0 ? `calc(100% + ${topCSS})` : `calc(100% - ${topCSS})`
      })
    }

    const onMoveEnd = () => {
      screenYEndRef.current = screenYRef.current
      const { height = 0 } = drawerRef.current?.getBoundingClientRect() || {}

      if (height > HEIGHT_FOR_AUTO_CLOSE) return
      // Автоматически закрываем при минимальной высоте:
      onClose()
    }

    const onTouchStart = (e: TouchEvent) => {
      screenYStartRef.current = e.touches[0].screenY
    }

    const onMouseDown = (e: MouseEvent) => {
      if (!expanderRef.current) return

      screenYStartRef.current = e.screenY
      document.addEventListener('mousemove', onMove, false)
    }

    const onMouseUp = () => {
      onMoveEnd()
      document.removeEventListener('mousemove', onMove)
    }

    document.addEventListener('mouseup', onMouseUp, false)
    expanderRef.current?.addEventListener('touchstart', onTouchStart, false)
    expanderRef.current?.addEventListener('touchend', onMoveEnd, false)
    expanderRef.current?.addEventListener('touchmove', onMove, { passive: true })
    expanderRef.current?.addEventListener('mousedown', onMouseDown, false)

    return () => {
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mousemove', onMove)
      expanderRef.current?.removeEventListener('touchstart', onTouchStart)
      expanderRef.current?.removeEventListener('touchmove', onMove)
      expanderRef.current?.removeEventListener('touchend', onMoveEnd)
      expanderRef.current?.removeEventListener('mousedown', onMouseDown)
    }
  }, [drawerRef, expanderRef, isOpen, onClose])
}
