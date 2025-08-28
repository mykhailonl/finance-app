import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react'

import type {
  ModalContextType,
  ModalData,
  ModalTypes,
} from '~/types/ModalTypes'

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalType, setModalType] = useState<ModalTypes | null>(null)
  const [modalData, setModalData] = useState<ModalData | null>(null)

  const openModal = useCallback((type: ModalTypes, data?: ModalData) => {
    if (data) {
      setModalData(data)
    }

    setModalType(type)

    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setModalType(null)
    setModalData(null)

    document.body.style.overflow = ''
  }, [])

  const value = {
    modalType,
    modalData,
    openModal,
    closeModal,
  }

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}
