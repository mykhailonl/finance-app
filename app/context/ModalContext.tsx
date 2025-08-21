import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useState,
} from 'react'

import type { ModalContextType, ModalData, ModalType } from '~/types/ModalType'

// eslint-disable-next-line react-refresh/only-export-components
export const ModalContext = createContext<ModalContextType | undefined>(
  undefined
)

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [modalType, setModalType] = useState<ModalType | null>(null)
  const [modalData, setModalData] = useState<ModalData | null>(null)

  // useEffect(() => {
  //   return () => {
  //     document.body.style.overflow = ''
  //   }
  // }, [])

  const openModal = useCallback((type: ModalType, data?: ModalData) => {
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
