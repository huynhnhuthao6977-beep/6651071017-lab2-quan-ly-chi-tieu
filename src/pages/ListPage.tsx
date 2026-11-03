import SummaryCard from '../components/SummaryCard'
import TransactionCard from '../components/TransactionCard'
import { initialTransactions } from '../data/transactions'
import { formatCurrency } from '../utils'

export default function ListPage() {
  const transactions = initialTransactions

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

  // Sao chép trước khi sắp xếp để giữ nguyên dữ liệu nguồn.
  const sortedTransactions = [...transactions].sort(
    (first, second) =>
      second.date.localeCompare(first.date) ||
      first.id.localeCompare(second.id),
  )

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

          <p className="text-sm text-slate-600">
            {transactions.length} giao dịch · Mới nhất trước
          </p>
        </div>

        {sortedTransactions.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedTransactions.map((transaction) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center">
            <p className="font-semibold">Chưa có giao dịch</p>

            <p className="mt-2 text-sm text-slate-600">
              Các khoản thu và chi sẽ xuất hiện tại đây.
            </p>
          </div>
        )}
      </section>
    </>
  )
}