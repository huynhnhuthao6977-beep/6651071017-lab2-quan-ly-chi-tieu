export type TransactionType = 'income' | 'expense'

export type PaymentMethod =
  | 'Tiền mặt'
  | 'Chuyển khoản'
  | 'Ví điện tử'

export type TransactionCategory =
  | 'Lương làm thêm'
  | 'Gia đình hỗ trợ'
  | 'Học bổng'
  | 'Thu nhập khác'
  | 'Ăn uống'
  | 'Di chuyển'
  | 'Học tập'
  | 'Nhà ở'
  | 'Mua sắm'
  | 'Giải trí'
  | 'Sức khỏe'

export interface Transaction {
  id: string
  title: string
  type: TransactionType
  amount: number
  category: TransactionCategory
  date: string
  paymentMethod: PaymentMethod
  note: string
}