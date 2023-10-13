import { formatAmount } from '@funcblock/dapp-sdk'

export function CurrentAmountPanel({ title, img, amount }: { title: string; img: string; amount: string }) {
  return (
    <div className="w-1/4 bg-bg2 shadow rounded px-6 py-6 text-left hidden md:block">
      <div className="text-xl">{title}</div>
      <div className="flex flex-row justify-between items-end mt-4">
        <img src={img} alt="" className="h-14" />
        <div className="text-xl">${formatAmount(amount)}</div>
      </div>
    </div>
  )
}
