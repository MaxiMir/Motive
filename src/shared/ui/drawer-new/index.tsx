import clsx from 'clsx'
import { ReactNode, useRef } from 'react'
import { Transition } from 'react-transition-group'

import dynamic from 'next/dynamic'
import { CLOSE_ANIMATION, OPEN_ANIMATION } from './constants'
import { useDrawerEvents, useDrawerExpand } from './hooks'

const Backdrop = dynamic(() => import('@mui/material/Backdrop'))

interface DrawerProps {
  isOpen: boolean
  backdrop?: boolean
  initialHeight?: number | string
  children: ReactNode | ReactNode[]
  onClose: () => void
}

export function Drawer({ isOpen, backdrop, initialHeight, children, onClose }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const expanderRef = useRef<HTMLDivElement>(null)
  const initialHeightCSS = typeof initialHeight === 'number' ? `${initialHeight}px` : initialHeight

  useDrawerEvents(drawerRef, { isOpen })
  useDrawerExpand(drawerRef, { isOpen, expanderRef, onClose })

  return (
    <Transition nodeRef={drawerRef} in={isOpen} timeout={350} mountOnEnter unmountOnExit>
      {() => (
        <>
          {backdrop && <Backdrop open onClick={onClose} />}
          <div
            id="next-bottom-sheet"
            data-testid="next-bottom-sheet"
            className={clsx([
              'fixed bottom-0 z-[100] flex max-h-[100dvh] w-full flex-col items-center gap-1 overscroll-none rounded-t-[24px] bg-white shadow',
              isOpen ? OPEN_ANIMATION : CLOSE_ANIMATION,
            ])}
            style={{ top: initialHeightCSS && `calc(100% - ${initialHeightCSS})` }}
            role="dialog"
            tabIndex={-1}
            ref={drawerRef}
          >
            <div
              className="relative mb-1 flex w-full cursor-grabbing justify-center rounded-t-3xl pb-5 pt-1 hover:bg-slate-50"
              ref={expanderRef}
            >
              <div className="h-1 w-8 rounded bg-black opacity-[.35]" />
            </div>
            <div className="h-full w-full overflow-y-scroll px-5 pb-5 scrollbar-hide">
              {children}
            </div>
          </div>
        </>
      )}
    </Transition>
  )
}

export default Drawer
