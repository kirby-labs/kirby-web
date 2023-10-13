import { formatAmount } from '@funcblock/dapp-sdk'
import { ArrowRight } from 'lucide-react'

export default function InfoPanel({ className }: { className?: string }) {
  const sideText = useMemo(() => {
    if ('USD') {
      return `LONG`
    } else {
      return `SHORT`
    }
  }, [])

  const hideInput = false
  const isInputQuote = ['USDC', 'USDT'].includes('USDT')
  const quoteReserve = ''
  const baseReserve = ''
  const quotePerBasePrice = undefined
  const quotePerBaseLiqPrice = undefined

  return (
    <div className={`text-sm ${className}`}>
      <div className="text-sm mb-1 text-fg3">Swap Details</div>
      <div className="border rounded px-4">
        <Row
          title={'Side'}
          value={
            <span className={`p-1 font-bold text-${sideText.includes('LONG') ? 'green' : 'red'}`}>{sideText}</span>
          }
        />
        <Row title={'Price'} value={`${formatAmount(0)} ${`USDT`}`} />
        <Row title="Est. Liquidation Price" value={`${formatAmount(quotePerBaseLiqPrice)} ${`USDT`}`} />
        <Row title={'Price Impact'} value={<span className={'text-yellow'}>{'<0.1'}%</span>} />
        {!hideInput && (
          <>
            <Separator />
            <Row
              title="Borrow"
              value={
                <div className="text-right">
                  <div className="text-purple-l">
                    -{formatAmount(0)} {'USDT'}
                  </div>
                  <div className="opacity-40 text-xs">-${formatAmount(0)}</div>
                </div>
              }
            />
            <Row
              title={'Receive (estimated)'}
              value={
                <div className="text-right">
                  <div className="text-fi">
                    +{formatAmount(0, 4)} {'BTC'}
                  </div>
                  <div className="opacity-40 text-xs">+${formatAmount(0, 4)}</div>
                </div>
              }
            />
            <Row title="Leverage" value={`${formatAmount(0, 0, 2)}x`} />
          </>
        )}
      </div>
    </div>
  )
}

interface IRowProps {
  title: any
  value: any
  previewValue?: any
  theme?: 'primary' | 'secondary'
}

export function Row({ title, value, previewValue, theme }: IRowProps) {
  return (
    <div className="flex flex-row justify-between items-start my-2">
      <div className="text-fg2">{title}</div>
      <div className="flex flex-row justify-center items-center">
        <div>{value}</div>
        {previewValue && previewValue !== value && (
          <>
            <ArrowRight size={15} className={`mx-4 text-${theme}`} style={{ paddingBottom: '1px' }} />
            {previewValue}
          </>
        )}
      </div>
    </div>
  )
}
