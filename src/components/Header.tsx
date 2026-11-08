import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-5 sm:px-6">
        <Link
          to="/"
          aria-label="Sổ Chi Tiêu — về danh sách giao dịch"
          className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg"
        >
          <span
            aria-hidden="true"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-700 text-lg font-bold text-white"
          >
            S
          </span>

          <div className="min-w-0">
            <p className="break-words text-lg font-bold text-slate-900">
              Sổ Chi Tiêu
            </p>

            <p className="text-sm text-slate-600">
              Quản lý tài chính cá nhân
            </p>
          </div>
        </Link>

        <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
          MSSV: 6651071017
        </span>
      </div>
    </header>
  )
}