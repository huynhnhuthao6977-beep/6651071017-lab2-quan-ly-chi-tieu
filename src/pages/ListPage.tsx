import { useState } from 'react'
import SummaryCard from '../components/SummaryCard'
import TransactionCard from '../components/TransactionCard'
import TransactionFilters from '../components/TransactionFilters'
import type { FilterValues } from '../components/TransactionFilters'
import TransactionForm from '../components/TransactionForm'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils'

type ListPageProps = {
  transactions: Transaction[]
  onAdd: (transaction: Omit<Transaction, 'id'>) => void
}

function createEmptyFilters(): FilterValues {
  return {
    keyword: '',
    type: '',
    category: '',
    fromDate: '',
    toDate: '',
    minAmount: '',
    maxAmount: '',
  }
}

function normalizeText(value: string): string {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim()
}

function validateFilters(filters: FilterValues): string {
  if (
    filters.fromDate &&
    filters.toDate &&
    filters.fromDate > filters.toDate
  ) {
    return 'Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc.'
  }

  for (const value of [filters.minAmount, filters.maxAmount]) {
    if (
      value !== '' &&
      (!Number.isFinite(Number(value)) || Number(value) < 0)
    ) {
      return 'Số tiền lọc phải là số hợp lệ và không âm.'
    }
  }

  if (
    filters.minAmount !== '' &&
    filters.maxAmount !== '' &&
    Number(filters.minAmount) > Number(filters.maxAmount)
  ) {
    return 'Số tiền tối thiểu phải nhỏ hơn hoặc bằng số tiền tối đa.'
  }

  return ''
}

export default function ListPage({
  transactions,
  onAdd,
}: ListPageProps) {
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [message, setMessage] = useState('')
  const [filters, setFilters] = useState<FilterValues>(
    createEmptyFilters,
  )

  const filterError = validateFilters(filters)
  const keyword = normalizeText(filters.keyword)

  const totalIncome = transactions.reduce(
    (total, transaction) =>
      transaction.type === 'income'
        ? total + transaction.amount
        : total,
    0,
  )

  const totalExpense = transactions.reduce(
    (total, transaction) =>
      transaction.type === 'expense'
        ? total + transaction.amount
        : total,
    0,
  )

  const balance = totalIncome - totalExpense

  // filter tạo mảng mới, nên sort không thay đổi dữ liệu từ props.
  const filteredTransactions = transactions
    .filter((transaction) => {
      if (filterError) {
        return false
      }

      const searchableText = normalizeText(
        `${transaction.title} ${transaction.note}`,
      )

      return (
        searchableText.includes(keyword) &&
        (filters.type === '' ||
          transaction.type === filters.type) &&
        (filters.category === '' ||
          transaction.category === filters.category) &&
        (filters.fromDate === '' ||
          transaction.date >= filters.fromDate) &&
        (filters.toDate === '' ||
          transaction.date <= filters.toDate) &&
        (filters.minAmount === '' ||
          transaction.amount >= Number(filters.minAmount)) &&
        (filters.maxAmount === '' ||
          transaction.amount <= Number(filters.maxAmount))
      )
    })
    .sort(
      (first, second) =>
        second.date.localeCompare(first.date) ||
        first.id.localeCompare(second.id),
    )

  function resetFilters(): void {
    setFilters(createEmptyFilters())
  }

  function handleAddTransaction(
    draft: Omit<Transaction, 'id'>,
  ): void {
    onAdd(draft)

    // Xóa bộ lọc để giao dịch vừa thêm không bị ẩn.
    resetFilters()
    setIsFormOpen(false)
    setMessage('Đã thêm giao dịch thành công.')
  }

  return (
    <>
      <section aria-labelledby="page-title">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
          Tài chính mỗi ngày
        </p>

        <h1
          id="page-title"
          className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
        >
          Theo dõi chi tiêu, chủ động kế hoạch
        </h1>

        <p className="mt-3 max-w-2xl leading-7 text-slate-600">
          Ghi lại các khoản thu và chi để biết tiền đến từ đâu,
          được sử dụng vào việc gì và còn lại bao nhiêu.
        </p>
      </section>

      <section
        aria-label="Tổng quan toàn bộ giao dịch"
        className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <SummaryCard
          title="Tổng thu"
          value={formatCurrency(totalIncome)}
          description="Tổng thu của toàn bộ giao dịch"
          tone="income"
        />

        <SummaryCard
          title="Tổng chi"
          value={formatCurrency(totalExpense)}
          description="Tổng chi của toàn bộ giao dịch"
          tone="expense"
        />

        <SummaryCard
          title="Số dư"
          value={formatCurrency(balance)}
          description="Tổng thu trừ tổng chi trong sổ"
          tone="balance"
        />
      </section>

      <div className="mt-8">
        <button
          type="button"
          aria-expanded={isFormOpen}
          aria-controls="transaction-form-container"
          onClick={() => {
            setIsFormOpen((current) => !current)
            setMessage('')
          }}
          className="min-h-11 rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-800"
        >
          {isFormOpen ? 'Đóng form' : 'Thêm giao dịch'}
        </button>

        <p
          role="status"
          className="mt-3 text-sm font-medium text-brand-800"
        >
          {message}
        </p>
      </div>

      <div
        id="transaction-form-container"
        hidden={!isFormOpen}
      >
        {isFormOpen && (
          <TransactionForm
            onSave={handleAddTransaction}
            onCancel={() => setIsFormOpen(false)}
          />
        )}
      </div>

      <TransactionFilters
        filters={filters}
        error={filterError}
        onChange={setFilters}
        onReset={resetFilters}
      />

      <section
        aria-labelledby="transactions-title"
        className="mt-10"
      >
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <h2
            id="transactions-title"
            className="text-2xl font-bold"
          >
            Danh sách giao dịch
          </h2>

          <p role="status" className="text-sm text-slate-600">
            Hiển thị {filteredTransactions.length}/{transactions.length}
            {' '}giao dịch · Mới nhất trước
          </p>
        </div>

        {filteredTransactions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <p className="font-semibold">
              {transactions.length === 0
                ? 'Chưa có giao dịch'
                : filterError
                  ? 'Bộ lọc chưa hợp lệ'
                  : 'Không có giao dịch phù hợp'}
            </p>

            <p className="mt-2 text-sm text-slate-600">
              {transactions.length === 0
                ? 'Nhấn “Thêm giao dịch” để bắt đầu ghi chép.'
                : filterError
                  ? 'Kiểm tra lại khoảng ngày và khoảng tiền.'
                  : 'Thử thay đổi từ khóa hoặc xóa các điều kiện lọc.'}
            </p>

            {transactions.length > 0 && (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-4 min-h-11 rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
              >
                Xóa bộ lọc
              </button>
            )}
          </div>
        )}
      </section>
    </>
  )
}