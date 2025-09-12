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
    route('recurring', './routes/recurring.tsx'),
  ]),

  layout('./routes/authLayout.tsx', [
    route('signup', './routes/signup.tsx'),
    route('login', './routes/login.tsx'),
  ]),
] satisfies RouteConfig
