import cn from 'classnames'

type Props = {
  styles?: string
  basic?: boolean
}

export const Divider = ({ styles, basic = true }: Props) => {
  return (
    <div
      className={cn(
        basic ? 'bg-grey-100 self-stretch h-[1px]' : 'w-1 h-full rounded-lg',
        styles
      )}
    />
  )
}
