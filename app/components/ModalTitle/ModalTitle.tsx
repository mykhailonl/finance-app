import { useModal } from '~/hooks/useModal'
import { iconComponents } from '~/types/IconType'

export const ModalTitle = ({ title }: { title: string }) => {
  const { closeModal } = useModal()
  const IconClose = iconComponents['closeModal']

  return (
    <div className="flex items-center justify-between self-stretch">
      <h2 className="text-preset-2 md:text-preset-1 text-grey-900">{title}</h2>

      <IconClose
        className="h-6 w-6 cursor-custom text-grey-500 hover:text-grey-900"
        onClick={closeModal}
      />
    </div>
  )
}
