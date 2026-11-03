import { Link } from 'react-router-dom'
import { initialTransactions } from '../data/transactions'
import { formatCurrency } from '../utils'

export default function ListPage() {
  const firstTransaction = initialTransactions[0]

  return (
    <section aria-labelledby="list-title">
      <p className="text-sm font-semibold uppercase tracking-wider text-brand-700">
        Tài chính mỗi ngày
      </p>

      <h1
        id="list-title"
        className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
      >
        Danh sách giao dịch
      </h1>

      <p className="mt-3 leading-7 text-slate-600">
        Đã chuẩn bị {initialTransactions.length} giao dịch mẫu.
        Danh sách đầy đủ sẽ được bổ sung ở bước tiếp theo.
      </p>

      {firstTransaction ? (
        <article className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold">
            {firstTransaction.title}
          </h2>

          <p className="mt-3 text-2xl font-bold text-brand-800">
            {formatCurrency(firstTransaction.amount)}
          </p>

          <p className="mt-2 text-slate-600">
            {firstTransaction.category}
          </p>

          <Link
            to={`/item/${firstTransaction.id}`}
            className="mt-5 inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
          >
            Xem chi tiết
          </Link>
        </article>
      ) : (
        <p className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          Chưa có giao dịch.
        </p>
      )}
    </section>
  )
}