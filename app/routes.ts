import {
  index,
  layout,
  route,
  type RouteConfig,
} from '@react-router/dev/routes'

export default [
  layout('./routes/layout.tsx', [
    index('routes/home.tsx'),

    route('transactions', './routes/transactions.tsx'),
    route('budgets', './routes/budgets.tsx'),
    route('pots', './routes/pots.tsx'),
  ]),
] satisfies RouteConfig
