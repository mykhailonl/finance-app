import { AvatarList } from '~/components/AvatarList'
import { Switch } from '~/components/Switch'
import { AVATAR_ICON_OPTIONS } from '~/constants/people'
import type { TransactionAdvancedFieldsProps } from '~/types/FormTypes'

export const TransactionAdvancedFields = ({
  recurring,
  selectedAvatar,
}: TransactionAdvancedFieldsProps) => {
  return (
    <>
      <Switch
        label="Recurring"
        description="Mark as repeating transaction"
        value={recurring.value}
        onClick={recurring.onChange}
      />

      <AvatarList
        selectedPerson={{
          value: selectedAvatar.value,
          onChange: selectedAvatar.onChange,
        }}
        options={AVATAR_ICON_OPTIONS}
      />
    </>
  )
}
