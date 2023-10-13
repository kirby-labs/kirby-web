import { formatAmount } from '@funcblock/dapp-sdk'

import { TokenIcon } from '../../../components/TokenIcon'

export default function PairsList() {
  return (
    <div className="w-64 bg-bg2 rounded divide-y text-sm">
      <div className="flex flex-row items-center justify-between px-4 py-3 text-sm text-fg3">
        <div>Pair</div>
        <div>Price</div>
      </div>
      <PairRow />
    </div>
  )
}

function PairRow() {
  return (
    <div
      className={`hover:bg-bg3 cursor-pointer flex flex-row items-center justify-between px-4 py-4`}
      onClick={() => {
        console.log(`onClick`)
      }}
    >
      <div className="flex flex-row items-center">
        <TokenIcon symbol={`BTC`} className="mr-2" />
        <div>{`BTC`}</div>
      </div>
      <div className="text-fg2">${formatAmount(123.12)}</div>
    </div>
  )
}
