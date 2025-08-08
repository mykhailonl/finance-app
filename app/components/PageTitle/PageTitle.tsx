import cn from 'classnames'

type PageTitleProps = {
  title: string
  styles?: {
    containerStyles?: string
    titleStyles?: string
  }
}

export const PageTitle = ({ title, styles }: PageTitleProps) => {
  return (
    <div className={cn('md:py-2', styles?.containerStyles)}>
      <h1 className={cn('text-preset-1', styles?.titleStyles)}>{title}</h1>
    </div>
  )
}
