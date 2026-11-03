export default function Header() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-700 text-lg font-bold text-white"
          >
            S
          </span>

          <div>
            <p className="text-lg font-bold text-slate-900">
              Sổ Chi Tiêu
            </p>
            <p className="text-sm text-slate-600">
              Quản lý tài chính cá nhân
            </p>
          </div>
        </div>

        <span className="rounded-full bg-brand-50 px-3 py-1 text-sm font-semibold text-brand-800">
          MSSV: 6651071017
        </span>
      </div>
    </header>
  )
}