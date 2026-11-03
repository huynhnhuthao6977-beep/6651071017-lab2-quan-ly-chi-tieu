import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import DetailPage from './pages/DetailPage'
import ListPage from './pages/ListPage'
import NotFoundPage from './pages/NotFoundPage'
import { loadTransactions, saveTransactions } from './storage'
import type { Transaction } from './types'

type InitialState = {
  transactions: Transaction[]
  error: string
}

function loadInitialState(): InitialState {
  try {
    return {
      transactions: loadTransactions(),
      error: '',
    }
  } catch {
    return {
      transactions: [],
      error:
        'Không thể đọc dữ liệu đã lưu. Vui lòng kiểm tra quyền lưu trữ hoặc dữ liệu trong trình duyệt.',
    }
  }
}

export default function App() {
  const [initialState] = useState<InitialState>(loadInitialState)

  const [transactions, setTransactions] = useState<Transaction[]>(
    initialState.transactions,
  )

  const [storageError, setStorageError] = useState('')

  function persistTransactions(next: Transaction[]): boolean {
    try {
      // Lưu thành công trước khi cập nhật giao diện.
      saveTransactions(next)
      setTransactions(next)
      setStorageError('')
      return true
    } catch {
      setStorageError(
        'Không thể lưu thay đổi. Vui lòng kiểm tra dung lượng hoặc quyền lưu trữ của trình duyệt rồi thử lại.',
      )
      return false
    }
  }

  function addTransaction(
    draft: Omit<Transaction, 'id'>,
  ): boolean {
    const newTransaction: Transaction = {
      ...draft,
      id: crypto.randomUUID(),
    }

    return persistTransactions([
      newTransaction,
      ...transactions,
    ])
  }

  function updateTransaction(
    updated: Transaction,
  ): boolean {
    if (!transactions.some((item) => item.id === updated.id)) {
      setStorageError('Không tìm thấy giao dịch cần sửa.')
      return false
    }

    return persistTransactions(
      transactions.map((item) =>
        item.id === updated.id ? updated : item,
      ),
    )
  }

  function deleteTransaction(id: string): boolean {
    if (!transactions.some((item) => item.id === id)) {
      setStorageError('Không tìm thấy giao dịch cần xóa.')
      return false
    }

    return persistTransactions(
      transactions.filter((item) => item.id !== id),
    )
  }

  if (initialState.error) {
    return (
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-2xl font-bold">
          Chưa thể mở sổ chi tiêu
        </h1>

        <p role="alert" className="mt-4 text-rose-800">
          {initialState.error}
        </p>

        <p className="mt-3 text-slate-600">
          Ứng dụng đã dừng ghi dữ liệu để giữ nguyên nội dung
          đang lưu.
        </p>
      </main>
    )
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
        {storageError && (
          <p
            role="alert"
            className="mb-6 rounded-lg bg-rose-50 p-4 text-rose-800"
          >
            {storageError}
          </p>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <ListPage
                transactions={transactions}
                onAddTransaction={addTransaction}
                onUpdateTransaction={updateTransaction}
                onDeleteTransaction={deleteTransaction}
              />
            }
          />

          <Route
            path="/item/:id"
            element={
              <DetailPage transactions={transactions} />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200 bg-white px-4 py-5 text-center text-sm text-slate-600">
        Sổ Chi Tiêu · Thực hành thiết kế web · 6651071017
      </footer>
    </div>
  )
}