import cn from 'classnames'

type AvatarProps = {
  src: string | null
  alt: string
  styles?: string
}

export const Avatar = ({ src = '', alt, styles }: AvatarProps) => {
  return (
    <div
      className={cn(
        'rounded-full bg-beige-100 bg-cover bg-center bg-no-repeat w-8 h-8 md:w-10 md:h-10',
        styles
      )}
      style={{ backgroundImage: `url(${src})` }}
      role="img"
      aria-label={alt}
    />
  )
}
