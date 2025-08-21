type ModalDescriptionProps = {
  text: string
}

export const ModalDescription = ({ text }: ModalDescriptionProps) => {
  return <p className="text-preset-4 text-grey-500">{text}</p>
}
