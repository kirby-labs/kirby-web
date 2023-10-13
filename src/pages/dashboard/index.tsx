import { formatAPY } from '@funcblock/dapp-sdk'
import { FileText } from 'lucide-react'

import BorrowImg from '@/assets/images/market/borrow.svg'
import SupplyImg from '@/assets/images/market/supply.svg'
import { MOCK_DATA as markets } from '@/mocks/markets'
import { Market } from '@/models/market'

import { CurrentAmountPanel } from './components/AmountCard'
import { AssetModal } from './components/AssetModal'
import AssetRow from './components/AssetRow'
import { HistoryModal } from './components/HistoryModal'

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto lt-sm:px-4">
      <Content />
    </div>
  )
}

export default Dashboard

function Content() {
  const [modalShow, setModalShow] = useState(false)
  const [currentMarket, setCurrentMarket] = useState<Market>()
  const [type, setType] = useState<'supply' | 'borrow'>('supply')
  const supplyHandler = useCallback((info: Market) => {
    setCurrentMarket(info)
    setModalShow(true)
    setType('supply')
  }, [])

  const repayHandler = useCallback((info: Market) => {
    setCurrentMarket(info)
    setModalShow(true)
    setType('borrow')
  }, [])

  const withdrawHandler = useCallback((info: Market) => {
    setCurrentMarket(info)
    setModalShow(true)
    setType('borrow')
  }, [])

  const bgColor = 0.7 > 0.95 ? 'bg-red' : 0.7 > 0.8 ? 'bg-yellow' : 'bg-green'
  const textColor = 0.7 > 0.95 ? 'text-red' : 0.7 > 0.8 ? 'text-yellow' : 'text-green'

  // history
  const [historyShow, setHistoryShow] = useState(false)

  if (false) {
    return (
      <div className="mt-20 flex flex-col justify-center items-center">
        <div className="mb-8">Please connect wallet before start</div>
        <Button>Connect</Button>
      </div>
    )
  }

  return (
    <div className="mt-4">
      <div className="flex flex-row">
        <CurrentAmountPanel title="Supply Balance" img={SupplyImg} amount={'0.00'} />
        <div className="flex-1 bg-bg2 shadow rounded mx-0 lg:mx-6 px-6 py-6 flex flex-row items-center justify-between divide-x">
          <div className="flex-1 pr-8 lg:pr-0 h-full flex flex-col justify-between items-center">
            <div className="text-lg opacity-50 mb-1">NET APY</div>
            <div className={`text-2xl mb-1`}>{formatAPY('12')}%</div>
            <div className="opacity-50 text-xs">Daily income predict: $0</div>
          </div>

          <div className="w-1/2 h-full flex flex-col justify-between items-start text-sm pl-8">
            <div className="flex flex-row justify-center items-center">
              <div className="mr-1">
                <span className="opacity-50">Borrow Limit Used:</span>
                <span className={`${textColor}`}>{formatAPY(0)}%</span>
              </div>
              {/* <BorrowLimitTip /> */}
            </div>

            <div className="flex-row justify-center items-center hidden md:flex">
              {new Array(20).fill(0).map((_, i) => {
                return (
                  <div
                    key={i}
                    className={`bg-bg4 h-4 mr-1 w-2 ${1 * 20 > i + 0.05 ? bgColor : ''}`}
                    style={{ borderRadius: '2px', transform: i === 16 ? 'scaleY(1.2)' : '' }}
                  />
                )
              })}
            </div>

            <div className="flex flex-row justify-center items-center">
              <div className="mr-1">
                <span className="opacity-50">Positions:</span> {'-'} / 12
              </div>
              {/* <PositionTip /> */}
            </div>
          </div>
        </div>

        <CurrentAmountPanel title="Borrow Balance" img={BorrowImg} amount={`0.00`} />
      </div>
      <div className="flex flex-row justify-end items-center my-2">
        <button
          className="rounded border px-3 py-1 flex flex-row items-center cursor-pointer bg-button hover:bg-button-h"
          onClick={() => {
            console.log('check history')
            // openModal(ApplicationModal.History)
            setHistoryShow(true)
          }}
        >
          <FileText size={16} className="mr-1" />
          History
        </button>
      </div>
      <div className="rounded overflow-hidden">
        <div className="bg-bg3 flex flex-row py-4 px-8 text-grey hidden lg:flex text-right">
          <div className="w-36 text-left">Asset</div>
          <div className="flex-1">Wallet Balance</div>
          <div className="flex-1">My Deposits</div>
          <div className="flex-1">Deposit APY</div>
          <div className="flex-1">My Borrows</div>
          <div className="flex-1">Borrow APY</div>
          <div className="w-60">&nbsp;</div>
        </div>
        <div className="divide-y bg-bg2">
          {markets.map((market) => (
            <AssetRow
              key={market.reserve}
              market={market}
              onSupply={supplyHandler}
              onRepay={repayHandler}
              onWithdraw={withdrawHandler}
            />
          ))}
        </div>
      </div>

      <AssetModal
        visible={modalShow}
        onClose={setModalShow}
        metaInfo={{
          type,
          market: currentMarket,
        }}
      />

      <HistoryModal visible={historyShow} onClose={setHistoryShow} />
    </div>
  )
}
