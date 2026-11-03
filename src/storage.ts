import {
  expenseCategories,
  incomeCategories,
  initialTransactions,
  paymentMethods,
} from './data/transactions'
import type { Transaction } from './types'

const STORAGE_KEY = '6651071017-lab2-transactions'

function isTransaction(value: unknown): value is Transaction {
  if (typeof value !== 'object' || value === null) {
    return false
  }

  if (
    !('id' in value) ||
    typeof value.id !== 'string' ||
    value.id.trim() === '' ||
    !('title' in value) ||
    typeof value.title !== 'string' ||
    value.title.trim().length < 3 ||
    value.title.length > 100 ||
    !('type' in value) ||
    (value.type !== 'income' && value.type !== 'expense') ||
    !('amount' in value) ||
    typeof value.amount !== 'number' ||
    !Number.isSafeInteger(value.amount) ||
    value.amount <= 0 ||
    !('category' in value) ||
    !('paymentMethod' in value) ||
    !('date' in value) ||
    typeof value.date !== 'string' ||
    !('note' in value) ||
    typeof value.note !== 'string' ||
    value.note.length > 500
  ) {
    return false
  }

  const categories =
    value.type === 'income' ? incomeCategories : expenseCategories

  const validCategory = categories.some(
    (category) => category === value.category,
  )

  const validPaymentMethod = paymentMethods.some(
    (method) => method === value.paymentMethod,
  )

  const parsedDate = new Date(`${value.date}T00:00:00Z`)

  const validDate =
    /^\d{4}-\d{2}-\d{2}$/.test(value.date) &&
    Number.isFinite(parsedDate.getTime()) &&
    parsedDate.toISOString().slice(0, 10) === value.date

  return validCategory && validPaymentMethod && validDate
}

export function loadTransactions(): Transaction[] {
  const stored = localStorage.getItem(STORAGE_KEY)

  // Chỉ dùng dữ liệu mẫu khi chưa từng lưu, kể cả khi danh sách đã lưu rỗng.
  if (stored === null) {
    return [...initialTransactions]
  }

  const parsed: unknown = JSON.parse(stored)

  if (!Array.isArray(parsed)) {
    throw new Error('Dữ liệu đã lưu không phải danh sách giao dịch.')
  }

  const items: unknown[] = parsed

  if (!items.every(isTransaction)) {
    throw new Error('Dữ liệu giao dịch đã lưu không hợp lệ.')
  }

  const uniqueIds = new Set(items.map((item) => item.id))

  if (uniqueIds.size !== items.length) {
    throw new Error('Dữ liệu đã lưu có ID bị trùng.')
  }

  return items
}

export function saveTransactions(
  transactions: Transaction[],
): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
}