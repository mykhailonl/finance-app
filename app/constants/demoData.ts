import type {
  Budget,
  BudgetInsert,
  Pot,
  PotInsert,
  Transaction,
  TransactionInsert,
} from '~/types'

export const DEMO_USER_ID = 'demo-user-uuid'

export const INITIAL_DEMO_BUDGETS: BudgetInsert[] = [
  { category: 'Entertainment', maximum: 50.0, theme: 'green' },
  { category: 'Bills', maximum: 750.0, theme: 'cyan' },
  { category: 'Dining Out', maximum: 75.0, theme: 'yellow' },
  { category: 'Personal Care', maximum: 100.0, theme: 'navy' },
]

export const INITIAL_DEMO_POTS: PotInsert[] = [
  { name: 'Savings', target: 2000.0, total: 159.0, theme: 'green' },
  { name: 'Concert Ticket', target: 150.0, total: 110.0, theme: 'navy' },
  { name: 'Gift', target: 450.0, total: 110.0, theme: 'cyan' },
  { name: 'New Laptop', target: 1000.0, total: 120.0, theme: 'yellow' },
  { name: 'Holiday', target: 1440.0, total: 531.0, theme: 'purple' },
]

export const INITIAL_DEMO_TRANSACTIONS: TransactionInsert[] = [
  {
    name: 'Emma Richardson',
    category: 'General',
    amount: 75.5,
    transaction_date: new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Emma',
    recurring: false,
    transaction_type: 'income',
    pot_id: null,
  },
  {
    name: 'Savory Bites Bistro',
    category: 'Dining Out',
    amount: -55.5,
    transaction_date: new Date(
      Date.now() - 5 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Daniel Carter',
    category: 'General',
    amount: -42.3,
    transaction_date: new Date(
      Date.now() - 6 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Daniel',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Urban Services Hub',
    category: 'General',
    amount: -65.0,
    transaction_date: new Date(
      Date.now() - 7 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Liam Hughes',
    category: 'Groceries',
    amount: 65.75,
    transaction_date: new Date(
      Date.now() - 9 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Liam',
    recurring: false,
    transaction_type: 'income',
    pot_id: null,
  },
  {
    name: 'Lily Ramirez',
    category: 'General',
    amount: 50.0,
    transaction_date: new Date(
      Date.now() - 10 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Lily',
    recurring: false,
    transaction_type: 'income',
    pot_id: null,
  },
  {
    name: 'Ethan Clark',
    category: 'Dining Out',
    amount: -32.5,
    transaction_date: new Date(
      Date.now() - 11 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Ethan',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'James Thompson',
    category: 'Entertainment',
    amount: -5.0,
    transaction_date: new Date(
      Date.now() - 13 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'James',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Pixel Playground',
    category: 'Entertainment',
    amount: -10.0,
    transaction_date: new Date(
      Date.now() - 13 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Ella Phillips',
    category: 'Dining Out',
    amount: -45.0,
    transaction_date: new Date(
      Date.now() - 14 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Ella',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Sofia Peterson',
    category: 'Transportation',
    amount: -15.0,
    transaction_date: new Date(
      Date.now() - 16 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Sofia',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Mason Martinez',
    category: 'Lifestyle',
    amount: -35.25,
    transaction_date: new Date(
      Date.now() - 17 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Mason',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Green Plate Eatery',
    category: 'Groceries',
    amount: -78.5,
    transaction_date: new Date(
      Date.now() - 18 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Sebastian Cook',
    category: 'Transportation',
    amount: -22.5,
    transaction_date: new Date(
      Date.now() - 18 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Sebastian',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'William Harris',
    category: 'Personal Care',
    amount: -10.0,
    transaction_date: new Date(
      Date.now() - 19 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'William',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Elevate Education',
    category: 'Education',
    amount: -50.0,
    transaction_date: new Date(
      Date.now() - 20 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Serenity Spa & Wellness',
    category: 'Personal Care',
    amount: -30.0,
    transaction_date: new Date(
      Date.now() - 21 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Spark Electric Solutions',
    category: 'Bills',
    amount: -100.0,
    transaction_date: new Date(
      Date.now() - 22 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Rina Sato',
    category: 'Bills',
    amount: -50.0,
    transaction_date: new Date(
      Date.now() - 22 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Rina',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Swift Ride Share',
    category: 'Transportation',
    amount: -18.75,
    transaction_date: new Date(
      Date.now() - 23 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Aqua Flow Utilities',
    category: 'Bills',
    amount: -100.0,
    transaction_date: new Date(
      Date.now() - 25 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'EcoFuel Energy',
    category: 'Bills',
    amount: -35.0,
    transaction_date: new Date(
      Date.now() - 26 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Yuna Kim',
    category: 'Dining Out',
    amount: -28.5,
    transaction_date: new Date(
      Date.now() - 26 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Yuna',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Flavor Fiesta',
    category: 'Dining Out',
    amount: -42.75,
    transaction_date: new Date(
      Date.now() - 28 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Harper Edwards',
    category: 'Shopping',
    amount: -89.99,
    transaction_date: new Date(
      Date.now() - 29 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: 'Harper',
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Buzz Marketing Group',
    category: 'General',
    amount: 3358.0,
    transaction_date: new Date(
      Date.now() - 29 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'income',
    pot_id: null,
  },
  {
    name: 'TechNova Innovations',
    category: 'Shopping',
    amount: -29.99,
    transaction_date: new Date(
      Date.now() - 30 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'ByteWise',
    category: 'Lifestyle',
    amount: -49.99,
    transaction_date: new Date(
      Date.now() - 32 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Nimbus Data Storage',
    category: 'Bills',
    amount: -9.99,
    transaction_date: new Date(
      Date.now() - 34 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: true,
    transaction_type: 'expense',
    pot_id: null,
  },
  {
    name: 'Main → Savings',
    category: 'Transfer',
    amount: -100.0,
    transaction_date: new Date(
      Date.now() - 3 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'transfer',
    pot_id: 1,
  },
  {
    name: 'Savings → Main',
    category: 'Transfer',
    amount: 50.0,
    transaction_date: new Date(
      Date.now() - 2 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'transfer',
    pot_id: 1,
  },
  {
    name: 'Main → Concert Ticket',
    category: 'Transfer',
    amount: -110.0,
    transaction_date: new Date(
      Date.now() - 12 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'transfer',
    pot_id: 2,
  },
  {
    name: 'Main → Gift',
    category: 'Transfer',
    amount: -110.0,
    transaction_date: new Date(
      Date.now() - 15 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'transfer',
    pot_id: 3,
  },
  {
    name: 'Main → New Laptop',
    category: 'Transfer',
    amount: -120.0,
    transaction_date: new Date(
      Date.now() - 24 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'transfer',
    pot_id: 4,
  },
  {
    name: 'Main → Holiday',
    category: 'Transfer',
    amount: -531.0,
    transaction_date: new Date(
      Date.now() - 27 * 24 * 60 * 60 * 1000
    ).toISOString(),
    avatar_person: null,
    recurring: false,
    transaction_type: 'transfer',
    pot_id: 5,
  },
]

export type DemoDataOverrides = {
  budgets?: (Budget & { id: number })[]
  pots?: (Pot & { id: number })[]
  transactions?: (Transaction & { id: number })[]
}
