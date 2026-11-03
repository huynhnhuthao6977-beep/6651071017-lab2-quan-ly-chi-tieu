type SummaryCardProps = {
  title: string
  value: string
  description: string
  tone: 'income' | 'expense' | 'balance'
}

const toneClasses = {
  income: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  expense: 'border-rose-200 bg-rose-50 text-rose-800',
  balance: 'border-slate-200 bg-white text-slate-900',
}

export default function SummaryCard({
  title,
  value,
  description,
  tone,
}: SummaryCardProps) {
  return (
    <article className={`rounded-2xl border p-6 ${toneClasses[tone]}`}>
      <h2 className="text-sm font-semibold">{title}</h2>

      <p className="mt-3 break-words text-3xl font-bold">
        {value}
      </p>

      <p className="mt-2 text-sm">{description}</p>
    </article>
  )
}