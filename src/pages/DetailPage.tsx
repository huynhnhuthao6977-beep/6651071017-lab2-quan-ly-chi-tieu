import { Link, useParams } from 'react-router-dom'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils'

type DetailPageProps = {
  transactions: Transaction[]
}

export default function DetailPage({
  transactions,
}: DetailPageProps) {
  const { id } = useParams<{ id: string }>()

    const transaction = transactions.find(
    (item) => item.id === id,
  )

  if (!transaction) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h1 className="text-2xl font-bold">
          Không tìm thấy giao dịch
        </h1>

        <p className="mt-3 text-slate-600">
          Giao dịch không tồn tại hoặc đường dẫn không chính xác.
        </p>

        <Link
          to="/"
          className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
        >
          Về danh sách
        </Link>
      </section>
    )
  }

  const isIncome = transaction.type === 'income'
  const displayDate = transaction.date.split('-').reverse().join('/')

  return (
    <section aria-labelledby="detail-title">
      <Link
        to="/"
        className="inline-flex min-h-11 items-center font-semibold text-brand-800 underline underline-offset-4"
      >
        Quay lại danh sách
      </Link>

      <article className="mt-4 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p
          className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
            isIncome
              ? 'bg-emerald-50 text-emerald-800'
              : 'bg-rose-50 text-rose-800'
          }`}
        >
          {isIncome ? 'Khoản thu' : 'Khoản chi'}
        </p>

        <h1
          id="detail-title"
          className="mt-4 break-words text-2xl font-bold sm:text-3xl"
        >
          {transaction.title}
        </h1>

        <p
          className={`mt-4 break-words text-3xl font-bold ${
            isIncome ? 'text-emerald-800' : 'text-rose-800'
          }`}
        >
          {isIncome ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-6 border-t border-slate-200 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-600">Mã giao dịch</dt>
            <dd className="mt-1 font-semibold">{transaction.id}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-600">Danh mục</dt>
            <dd className="mt-1 font-semibold">
              {transaction.category}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-600">Ngày giao dịch</dt>
            <dd className="mt-1 font-semibold">
              <time dateTime={transaction.date}>{displayDate}</time>
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-600">
              Phương thức thanh toán
            </dt>
            <dd className="mt-1 font-semibold">
              {transaction.paymentMethod}
            </dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm text-slate-600">Ghi chú</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words leading-7">
              {transaction.note || 'Không có ghi chú.'}
            </dd>
          </div>
        </dl>
      </article>
    </section>
  )
}