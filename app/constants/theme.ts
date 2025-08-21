import type { ColorOption, DropdownOptions } from '~/types/DropdownType'

export type ThemeColor =
  | 'green'
  | 'yellow'
  | 'cyan'
  | 'navy'
  | 'red'
  | 'purple'
  | 'light-purple'
  | 'light purple'
  | 'turquoise'
  | 'brown'
  | 'magenta'
  | 'blue'
  | 'navy-grey'
  | 'navy grey'
  | 'army-green'
  | 'army green'
  | 'gold'
  | 'orange'

export const THEME_TO_TW_CLASS: Record<ThemeColor, string> = {
  green: 'bg-green',
  yellow: 'bg-yellow',
  cyan: 'bg-cyan',
  navy: 'bg-navy',
  red: 'bg-red',
  purple: 'bg-purple',
  'light-purple': 'bg-light-purple',
  'light purple': 'bg-light-purple',
  turquoise: 'bg-turquoise',
  brown: 'bg-brown',
  magenta: 'bg-magenta',
  blue: 'bg-blue',
  'navy-grey': 'bg-navy-grey',
  'navy grey': 'bg-navy-grey',
  'army-green': 'bg-army-green',
  'army green': 'bg-army-green',
  gold: 'bg-gold',
  orange: 'bg-orange',
}

export const THEME_TO_HEX: Record<ThemeColor, string> = {
  green: '#277C78',
  yellow: '#F2CDAC',
  cyan: '#82C9D7',
  navy: '#626070',
  red: '#C94736',
  purple: '#826CB0',
  'light-purple': '#AF81BA',
  'light purple': '#AF81BA',
  turquoise: '#597C7C',
  brown: '#93674F',
  magenta: '#934F6F',
  blue: '#3F82B2',
  'navy-grey': '#97A0AC',
  'navy grey': '#97A0AC',
  'army-green': '#7F9161',
  'army green': '#7F9161',
  gold: '#CAB361',
  orange: '#BE6C49',
}

export const THEME_TO_TW_TEXT: Record<ThemeColor, string> = {
  green: 'text-green',
  yellow: 'text-yellow',
  cyan: 'text-cyan',
  navy: 'text-navy',
  red: 'text-red',
  purple: 'text-purple',
  'light-purple': 'text-light-purple',
  'light purple': 'text-light-purple',
  turquoise: 'text-turquoise',
  brown: 'text-brown',
  magenta: 'text-magenta',
  blue: 'text-blue',
  'navy-grey': 'text-navy-grey',
  'navy grey': 'text-navy-grey',
  'army-green': 'text-army-green',
  'army green': 'text-army-green',
  gold: 'text-gold',
  orange: 'text-orange',
}

export const COLOR_OPTIONS: DropdownOptions<ColorOption> = [
  { value: 'green', label: 'Green' },
  { value: 'yellow', label: 'Yellow' },
  { value: 'cyan', label: 'Cyan' },
  { value: 'navy', label: 'Navy' },
  { value: 'red', label: 'Red' },
  { value: 'purple', label: 'Purple' },
  { value: 'light-purple', label: 'Light purple' },
  { value: 'turquoise', label: 'Turquoise' },
  { value: 'brown', label: 'Brown' },
  { value: 'magenta', label: 'Magenta' },
  { value: 'blue', label: 'Blue' },
  { value: 'navy-grey', label: 'Navy grey' },
  { value: 'army-green', label: 'Army green' },
  { value: 'gold', label: 'Gold' },
  { value: 'orange', label: 'Orange' },
]

export const COLOR_VALUE_TO_LABEL: Record<ColorOption, string> = {
  green: 'Green',
  yellow: 'Yellow',
  cyan: 'Cyan',
  navy: 'Navy',
  red: 'Red',
  purple: 'Purple',
  'light-purple': 'Light purple',
  'light purple': 'Light purple',
  turquoise: 'Turquoise',
  brown: 'Brown',
  magenta: 'Magenta',
  blue: 'Blue',
  'navy-grey': 'Navy grey',
  'navy grey': 'Navy grey',
  'army-green': 'Army green',
  'army green': 'Army green',
  gold: 'Gold',
  orange: 'Orange',
}
