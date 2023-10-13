import { formatAmount } from '@funcblock/dapp-sdk'

import TotalBorrow from '@/assets/images/market/total_borrow.svg'
import TotalSupply from '@/assets/images/market/total_supply.svg'
import { MOCK_DATA as markets } from '@/mocks/markets'
import { Market } from '@/models/market'

import { MarketModal } from './components/MarketModal'
import { MarketRow } from './components/MarketRow'

const Markets = () => {
  const [modalShow, setModalShow] = useState(false)

  // todo useModal
  const [currentMarket, setCurrentMarket] = useState<Market>()
  const [type, setType] = useState<'supply' | 'borrow'>('supply')
  const supplyHandler = useCallback((info: Market) => {
    setCurrentMarket(info)
    setModalShow(true)
    setType('supply')
  }, [])

  const borrowHandler = useCallback((info: Market) => {
    setCurrentMarket(info)
    setModalShow(true)
    setType('borrow')
  }, [])

  return (
    <div className="max-w-7xl mx-auto lt-sm:px-4">
      <div className="mb-3 lg:mb-6 flex flex-col lg:flex-row justify-between text-center">
        <div className="flex-1 bg-bg2 rounded shadow px-2 py-4 lg:py-8 lg:mr-3 flex flex-row justify-center items-center">
          <div>
            <div className="mb-4 text-lg">Total Supply</div>
            <div className="text-2xl text-$fi">${formatAmount(0, 0, 0)}</div>
          </div>
        </div>
        <div className="flex-1 bg-bg2 rounded shadow px-2 py-4 lg:py-8 mt-3 lg:mt-0 lg:ml-3 flex flex-row justify-center items-center">
          <div>
            <div className="mb-4 text-lg">Total Borrow</div>
            <div className="text-2xl text-$purple">${formatAmount(0, 0, 0)}</div>
          </div>
        </div>
      </div>

      <div className="rounded shadow overflow-hidden lg:bg-bg2 text-sm">
        <div className="bg-bg3 flex flex-row py-4 px-8 rounded hidden lg:flex">
          <div className="w-48">Asset</div>
          <div className="flex-1 text-right">Total Supply</div>
          <div className="flex-1 text-right">Supply APY</div>
          <div className="flex-1 text-right">Total Borrowed</div>
          <div className="flex-1 text-right">Borrow APY</div>
          <div className="flex-1 text-right">Available Liquidity</div>
          <div className="w-60 text-right">&nbsp;</div>
        </div>
        {markets.map((market) => (
          <MarketRow key={market.reserve} market={market} onSupply={supplyHandler} onBorrow={borrowHandler} />
        ))}
      </div>

      <MarketModal
        key={type}
        visible={modalShow}
        onClose={setModalShow}
        metaInfo={{
          type,
          market: currentMarket,
        }}
      />
    </div>
  )
}

export default Markets
