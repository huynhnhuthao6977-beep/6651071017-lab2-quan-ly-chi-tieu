import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { initialTransactions } from './data/transactions'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'
import type { Transaction } from './types'

export default function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(
    () => [...initialTransactions],
  )

  function handleAddTransaction(
    values: Omit<Transaction, 'id'>,
  ): void {
    const newTransaction: Transaction = {
      ...values,
      id: crypto.randomUUID(),
    }

    // Dùng state hiện tại để tránh mất dữ liệu khi cập nhật liên tiếp.
    setTransactions((current) => [
      newTransaction,
      ...current,
    ])
  }

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
        <Routes>
          <Route
            path="/"
            element={
              <ListPage
                transactions={transactions}
                onAdd={handleAddTransaction}
              />
            }
          />

          <Route
            path="/item/:id"
            element={
              <DetailPage transactions={transactions} />
            }
          />

          <Route
            path="*"
            element={
              <section className="rounded-2xl border border-slate-200 bg-white p-6">
                <h1 className="text-2xl font-bold">
                  Không tìm thấy trang
                </h1>

                <p className="mt-3 text-slate-600">
                  Đường dẫn bạn truy cập không tồn tại.
                </p>

                <Link
                  to="/"
                  className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
                >
                  Về danh sách
                </Link>
              </section>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-5 text-center text-sm text-slate-600">
          Sổ Chi Tiêu · MSSV: 6651071017
        </div>
      </footer>
    </div>
  )
}