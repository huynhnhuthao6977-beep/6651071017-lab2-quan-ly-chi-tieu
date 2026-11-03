import { useState } from 'react'
import type { FormEvent } from 'react'
import {
  expenseCategories,
  incomeCategories,
  paymentMethods,
} from '../data/transactions'
import type { Transaction, TransactionType } from '../types'

type TransactionFormProps = {
  initialValue?: Transaction | undefined
  onSave: (transaction: Omit<Transaction, 'id'>) => void
  onCancel: () => void
}

const inputClass =
  'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900'

function getToday(): string {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export default function TransactionForm({
  initialValue,
  onSave,
  onCancel,
}: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>(
    initialValue?.type ?? 'expense',
  )

  const [error, setError] = useState('')

  const categories =
    type === 'income' ? incomeCategories : expenseCategories

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = String(data.get('title') ?? '').trim()
    const amountText = String(data.get('amount') ?? '').trim()
    const amount = Number(amountText)
    const date = String(data.get('date') ?? '')
    const note = String(data.get('note') ?? '').trim()

    const category = categories.find(
      (item) => item === data.get('category'),
    )

    const paymentMethod = paymentMethods.find(
      (item) => item === data.get('paymentMethod'),
    )

    if (title.length < 3 || title.length > 100) {
      setError('Tên giao dịch phải có từ 3 đến 100 ký tự.')
      return
    }

    if (
      amountText === '' ||
      !Number.isSafeInteger(amount) ||
      amount <= 0
    ) {
      setError('Số tiền phải là số nguyên dương trong giới hạn an toàn.')
      return
    }

    const parsedDate = new Date(`${date}T00:00:00Z`)

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      !Number.isFinite(parsedDate.getTime()) ||
      parsedDate.toISOString().slice(0, 10) !== date
    ) {
      setError('Vui lòng chọn ngày giao dịch hợp lệ.')
      return
    }

    if (!category || !paymentMethod) {
      setError('Vui lòng chọn danh mục và phương thức thanh toán hợp lệ.')
      return
    }

    if (note.length > 500) {
      setError('Ghi chú không được vượt quá 500 ký tự.')
      return
    }

    setError('')

    onSave({
      title,
      type,
      amount,
      category,
      date,
      paymentMethod,
      note,
    })
  }

  return (
    <section
      aria-labelledby="form-title"
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <h2 id="form-title" className="text-xl font-bold">
        {initialValue ? 'Sửa giao dịch' : 'Thêm giao dịch'}
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Các trường có dấu * là bắt buộc. Số tiền tính bằng VND.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-5"
        aria-describedby={error ? 'transaction-form-error' : undefined}
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="min-w-0 text-sm font-medium sm:col-span-2">
            Tên giao dịch *
            <input
              name="title"
              type="text"
              required
              minLength={3}
              maxLength={100}
              defaultValue={initialValue?.title ?? ''}
              placeholder="Ví dụ: Ăn trưa tại căn tin"
              className={inputClass}
            />
          </label>

          <label className="min-w-0 text-sm font-medium">
            Loại giao dịch *
            <select
              name="type"
              value={type}
              onChange={(event) => {
                const value = event.target.value

                if (value === 'income' || value === 'expense') {
                  setType(value)
                  setError('')
                }
              }}
              className={inputClass}
            >
              <option value="expense">Khoản chi</option>
              <option value="income">Khoản thu</option>
            </select>
          </label>

          <label className="min-w-0 text-sm font-medium">
            Số tiền (VND) *
            <input
              name="amount"
              type="number"
              required
              min="1"
              max={Number.MAX_SAFE_INTEGER}
              step="1"
              defaultValue={initialValue?.amount ?? ''}
              className={inputClass}
            />
          </label>

          <label className="min-w-0 text-sm font-medium">
            Danh mục *
            <select
              key={type}
              name="category"
              required
              defaultValue={
                initialValue?.type === type
                  ? initialValue.category
                  : ''
              }
              className={inputClass}
            >
              <option value="" disabled>
                Chọn danh mục
              </option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="min-w-0 text-sm font-medium">
            Ngày giao dịch *
            <input
              name="date"
              type="date"
              required
              defaultValue={initialValue?.date ?? getToday()}
              className={inputClass}
            />
          </label>

          <label className="min-w-0 text-sm font-medium">
            Phương thức thanh toán *
            <select
              name="paymentMethod"
              required
              defaultValue={
                initialValue?.paymentMethod ?? 'Tiền mặt'
              }
              className={inputClass}
            >
              {paymentMethods.map((method) => (
                <option key={method} value={method}>
                  {method}
                </option>
              ))}
            </select>
          </label>

          <label className="min-w-0 text-sm font-medium sm:col-span-2">
            Ghi chú
            <textarea
              name="note"
              rows={3}
              maxLength={500}
              defaultValue={initialValue?.note ?? ''}
              placeholder="Tối đa 500 ký tự"
              className={inputClass}
            />
          </label>
        </div>

        {error && (
          <p
            id="transaction-form-error"
            role="alert"
            className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-800"
          >
            {error}
          </p>
        )}

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="submit"
            className="min-h-11 rounded-lg bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-800"
          >
            {initialValue ? 'Lưu thay đổi' : 'Lưu giao dịch'}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="min-h-11 rounded-lg border border-slate-300 px-5 py-2 font-semibold hover:bg-slate-100"
          >
            Hủy
          </button>
        </div>
      </form>
    </section>
  )
}