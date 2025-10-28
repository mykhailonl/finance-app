import type { PersonName } from '~/types'

const BASENAME = '/finance-app'

export const peopleAvatars: Record<PersonName, string> = {
  Emma: `${BASENAME}/assets/images/avatars/emma-richardson.jpg`,
  Daniel: `${BASENAME}/assets/images/avatars/daniel-carter.jpg`,
  Ella: `${BASENAME}/assets/images/avatars/ella-phillips.jpg`,
  Ethan: `${BASENAME}/assets/images/avatars/ethan-clark.jpg`,
  Harper: `${BASENAME}/assets/images/avatars/harper-edwards.jpg`,
  James: `${BASENAME}/assets/images/avatars/james-thompson.jpg`,
  Liam: `${BASENAME}/assets/images/avatars/liam-hughes.jpg`,
  Lily: `${BASENAME}/assets/images/avatars/lily-ramirez.jpg`,
  Mason: `${BASENAME}/assets/images/avatars/mason-martinez.jpg`,
  Rina: `${BASENAME}/assets/images/avatars/rina-sato.jpg`,
  Sebastian: `${BASENAME}/assets/images/avatars/sebastian-cook.jpg`,
  Sofia: `${BASENAME}/assets/images/avatars/sofia-peterson.jpg`,
  Sun: `${BASENAME}/assets/images/avatars/sun-park.jpg`,
  William: `${BASENAME}/assets/images/avatars/william-harris.jpg`,
  Yuna: `${BASENAME}/assets/images/avatars/yuna-kim.jpg`,
}

export type AvatarType = {
  name: PersonName
  src: string
}
export type AvatarListType = AvatarType[]

export const AVATAR_ICON_OPTIONS: AvatarListType = (
  Object.entries(peopleAvatars) as [PersonName, string][]
).map(([name, src]) => ({ name, src }))
