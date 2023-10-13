import { formatAmount, formatAPY } from '@funcblock/dapp-sdk'

import { TokenIcon } from '@/components/TokenIcon'
import { Market } from '@/models/market'

export function MarketRow(props: {
  market: Market
  onSupply?: (item: Market) => void
  onBorrow?: (item: Market) => void
}) {
  const { market } = props
  const symbol = market.tokenSymbol
  const price = market.price
  const decimal = market.tokenDecimal

  return (
    <div>
      <div
        className={`px-8 py-4 flex flex-row justify-between items-center border-l-3 border-transparent hover:border-brand hover:bg-bg3 lt-md:hidden`}
      >
        <div className="w-48 flex flex-row justify-start items-center">
          <TokenIcon symbol={symbol} className="mr-2" />
          <div>
            <div className="flex flex-row items-center">
              <div>{market.tokenSymbol}</div>
            </div>
            <div className="text-xs opacity-50">{market.tokenName}</div>
          </div>
        </div>

        <div className="flex-1 text-right">
          <div>
            {formatAmount(market.totalSupplied, decimal)} {symbol}
          </div>
          <div className="text-xs opacity-50">{`$${formatAmount(
            (market.totalSupplied ?? 0) * (price ?? 0),
            decimal,
            0
          )}`}</div>
        </div>
        <div className="flex-1 text-right text-$fi">{formatAPY(market.supplyAPY)}%</div>

        <div className="flex-1 text-right">
          <div>
            {formatAmount(market.totalBorrowed, decimal)} {symbol}
          </div>
          <div className="text-xs opacity-50">{`$${formatAmount(
            (market.totalBorrowed ?? 0) * (price ?? 0),
            decimal,
            0
          )}`}</div>
        </div>
        <div className="flex-1 text-right text-$purple">{formatAPY(market.borrowAPY)}%</div>

        <div className="flex-1 text-right">
          <div>
            {formatAmount(market.availableLiquidity, decimal)} {symbol}
          </div>
          <div className="text-xs opacity-50">{`$${formatAmount(
            (market.availableLiquidity ?? 0) * (price ?? 0),
            decimal,
            0
          )}`}</div>
        </div>

        <div className="w-60 flex flex-row justify-end items-center">
          <button
            className="text-xs bg-bg1 text-$fi rounded px-4 py-2 mr-4 hover:bg-button-h"
            onClick={() => {
              props.onSupply?.(market)
            }}
          >
            Supply
          </button>
          <button
            className="text-xs bg-bg1 text-$purple rounded px-4 py-2 hover:bg-button-h"
            onClick={() => {
              props.onBorrow?.(market)
            }}
          >
            Borrow
          </button>
        </div>
      </div>

      <div className="shadow rounded mb-3 py-4 px-6 bg-bg2 md:hidden">
        <div className="flex flex-row justify-between items-center mb-2 border-b pb-2">
          <div className="flex flex-row justify-start items-center">
            <TokenIcon symbol={market.tokenSymbol} className="mr-1" />
            <div>
              <div>{market.tokenName}</div>
              <div className="text-xs opacity-50">{`$${formatAmount(price)}`}</div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-xs opacity-50">Available Liquidity</div>
            <div>
              {formatAmount(market.availableLiquidity, decimal)} {market.tokenName}
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mb-2">
          <div className="">
            <div className="text-xs opacity-50">Total Supply</div>
            <div>
              {formatAmount(market.totalSupplied, decimal)} {market.tokenName}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-50">Supply APY</div>
            <div>{formatAPY(market.supplyAPY)}%</div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mb-2">
          <div className="">
            <div className="text-xs opacity-50">Total Borrowed</div>
            <div>
              {formatAmount(market.totalBorrowed, decimal)} {market.tokenName}
            </div>
          </div>
          <div className="text-right">
            <div className="text-xs opacity-50">Borrow APY</div>
            <div>{formatAPY(market.borrowAPY)}%</div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mb-2">
          <button
            className="text-xs border border-fi rounded px-4 py-2 mr-4 hover:bg-fi"
            onClick={() => {
              props.onSupply?.(market)
            }}
          >
            Supply
          </button>
          <button
            className="text-xs border border-purple rounded px-4 py-2 hover:bg-purple"
            onClick={() => {
              props.onBorrow?.(market)
            }}
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  )
}
