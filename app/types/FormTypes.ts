import type { AvatarListType } from '~/constants/people'
import type {
  PersonName,
  TransactionCategory,
  TransactionType,
} from '~/types/index'

export type AvatarValue = PersonName | null

export type FormFieldConfig<T> = {
  value: T
  onChange: (value: T) => void
  onBlur?: () => void
  error?: string | null
}

export type AvatarListProps = {
  options: AvatarListType
  selectedPerson: FormFieldConfig<AvatarValue>
}

export type TransactionBasicFieldProps = {
  date: FormFieldConfig<string>
  time: FormFieldConfig<string>
  name: FormFieldConfig<string>
  transactionType: FormFieldConfig<TransactionType>
  transactionCategory: FormFieldConfig<TransactionCategory>
  amount: FormFieldConfig<string>
}

export type TransactionAdvancedFieldsProps = {
  recurring: FormFieldConfig<boolean>
  selectedAvatar: FormFieldConfig<AvatarValue>
}
