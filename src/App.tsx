import Header from './components/Header'
import SummaryCard from './components/SummaryCard'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:p-3 focus:text-brand-800"
      >
        Chuyển đến nội dung chính
      </a>

      <Header />

      <main
        id="main-content"
        className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6"
      >
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
          aria-label="Tổng quan thu chi"
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <SummaryCard
            title="Tổng thu"
            value="0 ₫"
            description="Tổng số tiền nhận được"
            tone="income"
          />

          <SummaryCard
            title="Tổng chi"
            value="0 ₫"
            description="Tổng số tiền đã sử dụng"
            tone="expense"
          />

          <SummaryCard
            title="Số dư"
            value="0 ₫"
            description="Chênh lệch giữa tổng thu và tổng chi"
            tone="balance"
          />
        </section>

        <section
          aria-labelledby="transactions-title"
          className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
        >
          <div className="border-b border-slate-200 pb-4">
            <h2
              id="transactions-title"
              className="text-xl font-bold"
            >
              Danh sách giao dịch
            </h2>

            <p className="mt-1 text-sm text-slate-600">
              Các khoản thu và chi của bạn sẽ xuất hiện tại đây.
            </p>
          </div>

          <div className="px-2 py-14 text-center">
            <p className="font-semibold text-slate-800">
              Chưa có giao dịch
            </p>

            <p className="mt-2 text-sm text-slate-600">
              Bắt đầu ghi chép để theo dõi tài chính của bạn.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-600">
        Sổ Chi Tiêu · Thực hành thiết kế web · 6651071017
      </footer>
    </div>
  )
}