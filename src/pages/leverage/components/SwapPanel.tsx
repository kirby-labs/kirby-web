import { formatAmount, TEN_POW, ZERO } from '@funcblock/dapp-sdk'
import BigNumber from 'bignumber.js'
import { HelpCircle } from 'lucide-react'
import { HTMLAttributes } from 'react'

import SwapImg from '@/assets/images/leverage/swap.png'
import { TokenIcon } from '@/components/TokenIcon'

export default function SwapPanel({ ...attr }: HTMLAttributes<HTMLDivElement>) {
  const [swapPair, setSwapPair] = useState(['USDT', 'BTC'])

  const [inputAmount, setInputAmount] = useState<BigNumber | undefined>()
  const [text, setText] = useState(
    inputAmount ? (Math.floor(inputAmount.times(100).div(TEN_POW(0)).toNumber() ?? 0) / 100).toString() : ''
  )
  const [percentage, setPercentage] = useState<number>(0)

  useEffect(() => {
    if (true) {
      setInputAmount(new BigNumber(text).times(TEN_POW(0)))
    } else {
      setInputAmount(undefined)
    }
  }, [text, setInputAmount])

  useEffect(() => {
    if (inputAmount === undefined) {
      setText('')
    }
  }, [inputAmount, setText])

  const onSliderChange = useCallback((pct: number) => {
    if (false) {
      return
    }
    const inputDecimal = 10000
    const inputAmount = BigNumber(1000000)
    const roundedNumber = Math.floor(inputAmount.times(inputDecimal).div(TEN_POW(0)).toNumber() ?? 0)
    setText((roundedNumber / inputDecimal).toString() ?? '')
    setPercentage(pct)
  }, [])

  const onInputChange = useCallback(
    (text: string) => {
      setText(text)

      if (true) {
        const inputAmount = new BigNumber(text).times(TEN_POW(0))
        setPercentage(inputAmount.div(1).toNumber())
      }
    },
    [setText, setPercentage]
  )

  return (
    <>
      {/* // input */}
      <div {...attr}>
        <div className="flex flex-row items-center justify-between mb-1">
          <div className="text-fg3">Borrow</div>
          <a
            href="#"
            target="_blank"
            rel="noreferrer"
            className="flex flex-row items-center text-xs text-fg3 hover:text-fg1"
          >
            <HelpCircle size={16} style={{ marginRight: '2px' }} /> Tutorial
          </a>
        </div>

        <div className="flex flex-row items-stretch justify-between text-base">
          <div className="w-40 px-4 mr-4 flex flex-row items-center bg-bg3 rounded">
            <TokenIcon symbol={swapPair[0]} size={22} className="mr-2" />
            <div>{swapPair[0]}</div>
          </div>
          <div className="bg-bg1 rounded w-56">
            <Input
              value={text}
              onChange={(e) => onInputChange(e.target.value)}
              className="!border-none !shadow-[none] !outline-none text-base bg-bg1"
            />
          </div>
        </div>

        <div className="mt-4">
          <Slider min={0} max={1} step={0.01} value={[percentage]} onValueChange={(e) => onSliderChange(e[0])} />
        </div>
      </div>
      {/* // output */}
      <div {...attr}>
        <div className="flex flex-row items-center justify-start mb-1">
          <div className="text-fg3">Receive</div>
          <img
            src={SwapImg}
            className="px-2 h-4 cursor-pointer"
            onClick={() => {
              setSwapPair([swapPair[1], swapPair[0]])
            }}
            alt=""
          />
        </div>

        <div className="flex flex-row items-stretch justify-between text-base">
          <div className="w-40 px-4 mr-4 flex flex-row items-center bg-bg3 rounded">
            <TokenIcon symbol={swapPair[1]} size={22} className="mr-2" />
            <div>{swapPair[1]}</div>
          </div>
          <div className="bg-bg3 rounded w-56">
            <Input
              readOnly
              value={formatAmount(0)}
              className="!border-none !shadow-[none] !outline-none bg-bg3 text-base"
            />
          </div>
        </div>
      </div>
    </>
  )
}
