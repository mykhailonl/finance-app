type AvatarProps = {
  src: string,
  alt: string,
}

export const Avatar = ({ src, alt }: AvatarProps) => {
  return (
    <div
      className='rounded-full bg-beige-100 bg-cover bg-center bg-no-repeat w-10 h-10'
      style={{ backgroundImage: `url(${src})` }}
      role="img"
      aria-label={alt}
    />
  )
}
