import { Link } from 'react-router-dom'
import type { Transaction } from '../types'
import { formatCurrency, truncateText } from '../utils'

type TransactionCardProps = {
  transaction: Transaction
  onEdit: (transaction: Transaction) => void
  onDelete: (transaction: Transaction) => void
}

export default function TransactionCard({
  transaction,
  onEdit,
  onDelete,
}: TransactionCardProps) {
  const isIncome = transaction.type === 'income'
  const displayDate = transaction.date.split('-').reverse().join('/')

  return (
    <article className="flex min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isIncome
              ? 'bg-emerald-50 text-emerald-800'
              : 'bg-rose-50 text-rose-800'
          }`}
        >
          {isIncome ? 'Khoản thu' : 'Khoản chi'}
        </span>

        <time
          dateTime={transaction.date}
          className="text-sm text-slate-600"
        >
          {displayDate}
        </time>
      </div>

      <h3 className="mt-4 break-words text-lg font-bold">
        {transaction.title}
      </h3>

      <p
        className={`mt-3 break-words text-2xl font-bold ${
          isIncome ? 'text-emerald-800' : 'text-rose-800'
        }`}
      >
        {isIncome ? '+' : '-'}
        {formatCurrency(transaction.amount)}
      </p>

      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="inline text-slate-600">Danh mục: </dt>
          <dd className="inline font-medium">
            {transaction.category}
          </dd>
        </div>

        <div>
          <dt className="inline text-slate-600">Thanh toán: </dt>
          <dd className="inline font-medium">
            {transaction.paymentMethod}
          </dd>
        </div>
      </dl>

      <p className="mt-3 break-words text-sm leading-6 text-slate-600">
        {truncateText(transaction.note, 80) || 'Không có ghi chú.'}
      </p>

      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        <Link
          to={`/item/${transaction.id}`}
          aria-label={`Xem chi tiết: ${transaction.title}`}
          className="inline-flex min-h-11 items-center justify-center rounded-lg border border-brand-700 px-4 py-2 text-sm font-semibold text-brand-800 hover:bg-brand-50"
        >
          Xem chi tiết
        </Link>

        <button
          type="button"
          onClick={() => onEdit(transaction)}
          aria-label={`Sửa giao dịch: ${transaction.title}`}
          className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
        >
          Sửa
        </button>

        <button
          type="button"
          onClick={() => onDelete(transaction)}
          aria-label={`Xóa giao dịch: ${transaction.title}`}
          className="min-h-11 rounded-lg border border-rose-300 px-4 py-2 text-sm font-semibold text-rose-800 hover:bg-rose-50"
        >
          Xóa
        </button>
      </div>
    </article>
  )
}