import ActionPanel from './components/ActionPanel'
import InfoPanel from './components/InfoPanel'
import PairsList from './components/PairsList'
import SwapPanel from './components/SwapPanel'

const Leverage = () => {
  return (
    <div className="max-w-7xl mx-auto lt-sm:px-4">
      <div className="container-md mx-auto flex flex-row justify-center items-start mt-10">
        <PairsList />
        <div className="flex flex-row items-start justify-center">
          <div className="bg-bg2 px-8 py-6 rounded ml-8">
            <div className="space-y-4">
              <SwapPanel />
              <InfoPanel />
              <ActionPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Leverage
