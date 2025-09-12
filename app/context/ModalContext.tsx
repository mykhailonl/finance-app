import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react'

import type { ModalState } from '~/types/ModalTypes'

export interface ModalContextType {
  modalState: ModalState
  openModal: (state: ModalState) => void
  closeModal: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalState, setModalState] = useState<ModalState>(null)

  const openModal = useCallback((state: ModalState) => {
    setModalState(state)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModalState(null)
    document.body.style.overflow = ''
  }, [])

  return (
    <ModalContext.Provider value={{ modalState, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  )
}
