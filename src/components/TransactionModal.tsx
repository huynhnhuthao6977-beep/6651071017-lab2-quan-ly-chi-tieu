import { useId } from 'react'
import type { RefObject } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import type { Transaction } from '../types'
import { formatCurrency } from '../utils'

type TransactionModalProps = {
  transaction: Transaction
  dialogRef: RefObject<HTMLDialogElement>
  triggerRef: RefObject<HTMLButtonElement>
}

export default function TransactionModal({
  transaction,
  dialogRef,
  triggerRef,
}: TransactionModalProps) {
  const titleId = useId()
  const descriptionId = useId()

  const isIncome = transaction.type === 'income'
  const displayDate = transaction.date.split('-').reverse().join('/')

  function closeModal() {
    dialogRef.current?.close()
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClose={() => {
        triggerRef.current?.focus()
      }}
      className="m-auto max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto rounded-2xl border-0 bg-white p-0 text-slate-900 shadow-2xl backdrop:bg-slate-900/60"
    >
      <div className="p-5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-brand-800">
              Chi tiết giao dịch
            </p>

            <h2
              id={titleId}
              className="mt-2 break-words text-2xl font-bold"
            >
              {transaction.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Đóng cửa sổ chi tiết giao dịch"
            className="min-h-11 shrink-0 rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold hover:bg-slate-100"
          >
            Đóng
          </button>
        </div>

        <p
          id={descriptionId}
          className="mt-3 text-sm text-slate-600"
        >
          Xem nhanh thông tin. Nhấn Esc hoặc nút Đóng để quay lại.
        </p>

        <div className="mt-6">
          <span
            className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
              isIncome
                ? 'bg-emerald-50 text-emerald-800'
                : 'bg-rose-50 text-rose-800'
            }`}
          >
            {isIncome ? 'Khoản thu' : 'Khoản chi'}
          </span>

          <p
            className={`mt-3 break-words text-3xl font-bold ${
              isIncome ? 'text-emerald-800' : 'text-rose-800'
            }`}
          >
            {isIncome ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-5 border-t border-slate-200 pt-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-600">
              Mã giao dịch
            </dt>
            <dd className="mt-1 break-words font-semibold">
              {transaction.id}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-600">
              Danh mục
            </dt>
            <dd className="mt-1 font-semibold">
              {transaction.category}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-600">
              Ngày giao dịch
            </dt>
            <dd className="mt-1 font-semibold">
              <time dateTime={transaction.date}>
                {displayDate}
              </time>
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
            <dt className="text-sm text-slate-600">
              Ghi chú
            </dt>
            <dd className="mt-1 whitespace-pre-wrap break-words leading-7">
              {transaction.note || 'Không có ghi chú.'}
            </dd>
          </div>
        </dl>

        <div className="mt-7 border-t border-slate-200 pt-5">
          <Link
            to={`/item/${transaction.id}`}
            onClick={closeModal}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brand-700 px-4 py-2 font-semibold text-white hover:bg-brand-800"
          >
            Mở trang chi tiết
          </Link>
        </div>
      </div>
    </dialog>,
    document.body,
  )
}