import { formatAmount, formatAPY, ZERO } from '@funcblock/dapp-sdk'

import { TokenIcon } from '@/components/TokenIcon'

import { Market } from '../../../models/market'

export default function PCAssetRow({
  market,
  onSupply,
  onRepay,
  onWithdraw,
}: {
  market: Market
  onSupply?: (item: Market) => void
  onRepay?: (item: Market) => void
  onWithdraw?: (item: Market) => void
}) {
  const { tokenSymbol: tokenName, tokenDecimal, price = 0 } = market

  const isAppLoading = false
  const balance = ZERO
  const supplyBalance = 0
  const loanBalance = 0

  const canRepay = loanBalance === 0
  const canWithdraw = supplyBalance > 0

  return (
    <div>
      <div className="border-l-2 border-transparent hover:border-l-3 hover:border-brand hover:bg-bg3 flex flex-row justify-between items-center px-8 py-4">
        <div className="w-20 lg:w-36 flex flex-row justify-start items-center">
          <TokenIcon symbol={market?.tokenSymbol} className="hidden lg:block mr-1" />
          <div className="text-left">
            <div>{tokenName}</div>
            <div className="text-xs opacity-50">${formatAmount(price, 0, 2)}</div>
          </div>
        </div>
        <Column
          className={formatAmount(balance, tokenDecimal, 4) === '0.00' ? `opacity-40` : ''}
          title={`${formatAmount(balance, tokenDecimal)}`}
        />
        <Column
          className={`${formatAmount(supplyBalance, tokenDecimal, 4) === '0.00' && 'opacity-40'} ${
            supplyBalance > 0 && 'text-$fi'
          }`}
          title={`${formatAmount(supplyBalance, tokenDecimal)}`}
          subtitle={supplyBalance > 0 ? `$${formatAmount(supplyBalance * price, tokenDecimal, 2)}` : undefined}
        />
        <Column title={`${isAppLoading ? '-' : formatAPY(market?.supplyAPY)}%`} />
        <Column
          className={`${formatAmount(-loanBalance, tokenDecimal, 4) === '0.00' && 'opacity-40'} ${
            loanBalance > 0 && 'text-$purple'
          }`}
          title={`${formatAmount(-loanBalance, tokenDecimal)}`}
          subtitle={loanBalance > 0 ? `$${formatAmount(loanBalance * price, tokenDecimal, 2)}` : undefined}
        />
        <Column title={`${isAppLoading ? '-' : formatAPY(market?.borrowAPY)}%`} />

        <div className="w-60 flex flex-row justify-end items-center text-xs">
          <button
            className="w-20 rounded px-4 py-2 mr-4 hover:text-fi text-$fi bg-button hover:bg-button-h"
            onClick={() => {
              onSupply?.(market)
            }}
          >
            Supply
          </button>
          {canRepay ? (
            <button
              className="w-20 rounded px-4 py-2 text-$purple bg-button hover:bg-button-h"
              onClick={() => {
                onRepay?.(market)
              }}
            >
              Repay
            </button>
          ) : (
            <button
              className={`w-20 rounded px-4 py-2 hover:text-on-fi text-$fi bg-button hover:bg-button-h ${
                canWithdraw ? '' : 'opacity-0'
              }`}
              onClick={() => {
                onWithdraw?.(market)
              }}
            >
              Withdraw
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

function Column({ title, subtitle, className }: { title: string; subtitle?: string; className?: string }) {
  return (
    <div className={`flex-1 flex flex-col justify-center items-stretch text-right`}>
      <div className={className}>{title}</div>
      <div className="text-xs opacity-60">{subtitle}</div>
    </div>
  )
}
