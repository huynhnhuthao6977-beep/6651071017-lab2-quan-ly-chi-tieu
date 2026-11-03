import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <p className="text-sm font-bold text-brand-800">404</p>

      <h1 className="mt-2 text-3xl font-bold">
        Không tìm thấy trang
      </h1>

      <p className="mt-3 text-slate-600">
        Vui lòng kiểm tra đường dẫn hoặc quay về danh sách giao dịch.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
      >
        Về danh sách
      </Link>
    </section>
  )
}