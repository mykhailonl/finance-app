import { Avatar } from '~/components/Avatar'
import { CategoryIcon } from '~/components/CategoryIcon'
import { peopleAvatars } from '~/constants/people'
import type { TransactionAvatarProps } from '~/types/TransactionTypes'

export const TransactionAvatar = ({
  transaction,
  size = 40,
  styles,
}: TransactionAvatarProps) => {
  if (transaction.avatar_person) {
    return (
      <Avatar
        src={peopleAvatars[transaction.avatar_person]}
        alt={transaction.avatar_person}
        styles={styles}
      />
    )
  }

  return (
    <CategoryIcon category={transaction.category} size={size} styles={styles} />
  )
}
