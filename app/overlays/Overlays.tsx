import { type PropsWithChildren, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

export const Overlays = ({ children }: PropsWithChildren) => {
  const [mountElement, setMountElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const element = document.getElementById('modal-root')

    if (element) setMountElement(element)
  }, [])

  return mountElement ? createPortal(children, mountElement) : null
}
