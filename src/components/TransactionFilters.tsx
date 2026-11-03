import {
  expenseCategories,
  incomeCategories,
} from '../data/transactions'

export type FilterValues = {
  keyword: string
  type: string
  category: string
  fromDate: string
  toDate: string
  minAmount: string
  maxAmount: string
}

type TransactionFiltersProps = {
  filters: FilterValues
  error: string
  onChange: (filters: FilterValues) => void
  onReset: () => void
}

const inputClass =
  'mt-2 min-h-11 w-full min-w-0 rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900'

export default function TransactionFilters({
  filters,
  error,
  onChange,
  onReset,
}: TransactionFiltersProps) {
  const categories =
    filters.type === 'income'
      ? incomeCategories
      : filters.type === 'expense'
        ? expenseCategories
        : [...incomeCategories, ...expenseCategories]

  function updateFilter(
    field: keyof FilterValues,
    value: string,
  ) {
    onChange({
      ...filters,
      [field]: value,
      ...(field === 'type' ? { category: '' } : {}),
    })
  }

  return (
    <section
      aria-labelledby="filters-title"
      className="mt-8 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id="filters-title" className="text-lg font-bold">
          Tìm kiếm và lọc
        </h2>

        <button
          type="button"
          onClick={onReset}
          className="min-h-11 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
        >
          Xóa bộ lọc
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="min-w-0 text-sm font-medium">
          Từ khóa
          <input
            type="search"
            value={filters.keyword}
            onChange={(event) =>
              updateFilter('keyword', event.target.value)
            }
            placeholder="Tên hoặc ghi chú giao dịch"
            className={inputClass}
          />
        </label>

        <label className="min-w-0 text-sm font-medium">
          Loại giao dịch
          <select
            value={filters.type}
            onChange={(event) =>
              updateFilter('type', event.target.value)
            }
            className={inputClass}
          >
            <option value="">Tất cả loại</option>
            <option value="income">Khoản thu</option>
            <option value="expense">Khoản chi</option>
          </select>
        </label>

        <label className="min-w-0 text-sm font-medium">
          Danh mục
          <select
            value={filters.category}
            onChange={(event) =>
              updateFilter('category', event.target.value)
            }
            className={inputClass}
          >
            <option value="">Tất cả danh mục</option>

            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="min-w-0 text-sm font-medium">
          Từ ngày
          <input
            type="date"
            value={filters.fromDate}
            onChange={(event) =>
              updateFilter('fromDate', event.target.value)
            }
            className={inputClass}
          />
        </label>

        <label className="min-w-0 text-sm font-medium">
          Đến ngày
          <input
            type="date"
            value={filters.toDate}
            onChange={(event) =>
              updateFilter('toDate', event.target.value)
            }
            className={inputClass}
          />
        </label>

        <label className="min-w-0 text-sm font-medium">
          Số tiền tối thiểu (VND)
          <input
            type="number"
            min="0"
            step="1"
            value={filters.minAmount}
            onChange={(event) =>
              updateFilter('minAmount', event.target.value)
            }
            placeholder="Ví dụ: 30000"
            className={inputClass}
          />
        </label>

        <label className="min-w-0 text-sm font-medium">
          Số tiền tối đa (VND)
          <input
            type="number"
            min="0"
            step="1"
            value={filters.maxAmount}
            onChange={(event) =>
              updateFilter('maxAmount', event.target.value)
            }
            placeholder="Ví dụ: 100000"
            className={inputClass}
          />
        </label>
      </div>

      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg bg-rose-50 p-3 text-sm font-medium text-rose-800"
        >
          {error}
        </p>
      )}
    </section>
  )
}