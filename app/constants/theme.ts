export type ThemeColor =
  | 'green' | 'yellow' | 'cyan' | 'navy' | 'red' | 'purple'
  | 'light-purple' | 'turquoise' | 'brown' | 'magenta'
  | 'blue' | 'navy-grey' | 'army-green' | 'gold' | 'orange'

export const THEME_TO_TW_CLASS: Record<ThemeColor, string> = {
  green: 'bg-green',
  yellow: 'bg-yellow',
  cyan: 'bg-cyan',
  navy: 'bg-navy',
  red: 'bg-red',
  purple: 'bg-purple',
  'light-purple': 'bg-light-purple',
  turquoise: 'bg-turquoise',
  brown: 'bg-brown',
  magenta: 'bg-magenta',
  blue: 'bg-blue',
  'navy-grey': 'bg-navy-grey',
  'army-green': 'bg-army-green',
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
  turquoise: '#597C7C',
  brown: '#93674F',
  magenta: '#934F6F',
  blue: '#3F82B2',
  'navy-grey': '#97A0AC',
  'army-green': '#7F9161',
  gold: '#CAB361',
  orange: '#BE6C49',
}
