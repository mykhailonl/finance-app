import type { PersonName } from '~/types'

export const peopleAvatars: Record<PersonName, string> = {
  Emma: '/assets/images/avatars/emma-richardson.jpg',
  Daniel: '/assets/images/avatars/daniel-carter.jpg',
  Ella: '/assets/images/avatars/ella-phillips.jpg',
  Ethan: '/assets/images/avatars/ethan-clark.jpg',
  Harper: '/assets/images/avatars/harper-edwards.jpg',
  James: '/assets/images/avatars/james-thompson.jpg',
  Liam: '/assets/images/avatars/liam-hughes.jpg',
  Lily: '/assets/images/avatars/lily-ramirez.jpg',
  Mason: '/assets/images/avatars/mason-martinez.jpg',
  Rina: '/assets/images/avatars/rina-sato.jpg',
  Sebastian: '/assets/images/avatars/sebastian-cook.jpg',
  Sofia: '/assets/images/avatars/sofia-peterson.jpg',
  Sun: '/assets/images/avatars/sun-park.jpg',
  William: '/assets/images/avatars/william-harris.jpg',
  Yuna: '/assets/images/avatars/yuna-kim.jpg',
}

export type AvatarType = {
  name: PersonName
  src: string
}
export type AvatarListType = AvatarType[]

export const AVATAR_ICON_OPTIONS: AvatarListType = (
  Object.entries(peopleAvatars) as [PersonName, string][]
).map(([name, src]) => ({ name, src }))
