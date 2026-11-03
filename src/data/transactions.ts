import rawData from './data.json'
import type {
  PaymentMethod,
  Transaction,
  TransactionCategory,
  TransactionType,
} from '../types'

export const incomeCategories: TransactionCategory[] = [
  'Lương làm thêm',
  'Gia đình hỗ trợ',
  'Học bổng',
  'Thu nhập khác',
]

export const expenseCategories: TransactionCategory[] = [
  'Ăn uống',
  'Di chuyển',
  'Học tập',
  'Nhà ở',
  'Mua sắm',
  'Giải trí',
  'Sức khỏe',
]

export const paymentMethods: PaymentMethod[] = [
  'Tiền mặt',
  'Chuyển khoản',
  'Ví điện tử',
]

function parseType(value: string): TransactionType {
  if (value === 'income' || value === 'expense') {
    return value
  }

  throw new Error(`Loại giao dịch không hợp lệ: ${value}`)
}

function parseCategory(value: string): TransactionCategory {
  const category = [
    ...incomeCategories,
    ...expenseCategories,
  ].find((item) => item === value)

  if (!category) {
    throw new Error(`Danh mục không hợp lệ: ${value}`)
  }

  return category
}

function parsePaymentMethod(value: string): PaymentMethod {
  const method = paymentMethods.find((item) => item === value)

  if (!method) {
    throw new Error(`Phương thức thanh toán không hợp lệ: ${value}`)
  }

  return method
}

export const initialTransactions: Transaction[] = rawData.map(
  (item) => {
    const type = parseType(item.type)
    const category = parseCategory(item.category)

    const allowedCategories =
      type === 'income' ? incomeCategories : expenseCategories

    if (!allowedCategories.includes(category)) {
      throw new Error(`Danh mục không phù hợp với giao dịch ${item.id}`)
    }

    if (!Number.isFinite(item.amount) || item.amount <= 0) {
      throw new Error(`Số tiền không hợp lệ ở giao dịch ${item.id}`)
    }

    return {
      ...item,
      type,
      category,
      paymentMethod: parsePaymentMethod(item.paymentMethod),
    }
  },
)

const uniqueIds = new Set(initialTransactions.map((item) => item.id))

if (uniqueIds.size !== initialTransactions.length) {
  throw new Error('Dữ liệu mẫu có ID giao dịch bị trùng')
}