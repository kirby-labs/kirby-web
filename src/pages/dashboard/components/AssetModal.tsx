import { formatAmount } from '@funcblock/dapp-sdk'
import BigNumber from 'bignumber.js'
import { useLocalStorage } from 'usehooks-ts'

import { Row } from '@/components/common'
import { ActionType } from '@/constants'
import { useNotification } from '@/hooks/use-notification'
import { USER_DEFAULT_DATA, USER_LOCAL_DATA } from '@/mocks/user-data'
import { Market } from '@/models/market'
import { sleep } from '@/utils/sleep'

export const AssetModal = (props: {
  visible: boolean
  metaInfo?: {
    type: 'supply' | 'borrow'
    market?: Market
  }
  onClose?: (show: boolean) => void
}) => {
  const [userBalance, setUserBalance] = useLocalStorage(USER_LOCAL_DATA, USER_DEFAULT_DATA)

  const { toast } = useNotification()
  const market = useMemo(() => props.metaInfo?.market, [props.metaInfo?.market])
  const [amount, setAmount] = useState<string>()
  const [percent, setPercent] = useState<number>(0)

  // tab
  const tabList = useMemo<Array<'Supply' | 'Withdraw' | 'Borrow' | 'Repay'>>(
    () => (props.metaInfo?.type === 'supply' ? ['Supply', 'Withdraw'] : ['Borrow', 'Repay']),
    [props.metaInfo?.type]
  )
  const [actionType, setActionType] = useState<'Supply' | 'Withdraw' | 'Borrow' | 'Repay'>(tabList[0])

  useEffect(() => {
    setActionType(tabList[0])
  }, [tabList])

  // reset
  useEffect(() => {
    setAmount('')
    setPercent(0)
  }, [actionType, props.visible])

  const percentageName = {
    [ActionType.supply]: 'Wallet Balance Available',
    [ActionType.withdraw]: 'Maximum Withdrawable',
    [ActionType.borrow]: 'Maximum Borrowable',
    [ActionType.repay]: 'Maximum Repayable',
  }[actionType]

  const availableAmount = useMemo(
    () =>
      ({
        [ActionType.supply]: userBalance.balance,
        [ActionType.withdraw]: userBalance.supplyAmount,
        [ActionType.borrow]: userBalance.borrowAmount,
        [ActionType.repay]: userBalance.borrowAmount,
      }[actionType]),
    [actionType, userBalance]
  )

  // actions
  const [loading, setLoading] = useState(false)
  const submitHandler = useCallback(async () => {
    setLoading(true)
    await sleep()
    setLoading(false)
    // modify local data
    if (!amount) return

    if (actionType === 'Supply') {
      setUserBalance({
        ...userBalance,
        balance: BigNumber(userBalance.balance).minus(amount).toString(),
        supplyAmount: BigNumber(userBalance.supplyAmount).plus(amount).toString(),
      })
    } else if (actionType === 'Withdraw') {
      setUserBalance({
        ...userBalance,
        balance: BigNumber(userBalance.balance).plus(amount).toString(),
        supplyAmount: BigNumber(userBalance.supplyAmount).minus(amount).toString(),
      })
    } else if (actionType === 'Borrow') {
      setUserBalance({
        ...userBalance,
        balance: BigNumber(userBalance.balance).plus(amount).toString(),
        borrowAmount: BigNumber(userBalance.borrowAmount).plus(amount).toString(),
      })
    } else if (actionType === 'Repay') {
      setUserBalance({
        ...userBalance,
        balance: BigNumber(userBalance.balance).minus(amount).toString(),
        borrowAmount: BigNumber(userBalance.borrowAmount).minus(amount).toString(),
      })
    }

    toast('info', {
      title: (
        <span className="flex items-center text-base">
          <span className="w-4 h-4 mr-2 text-background bg-fi i-lucide:check-circle"></span>
          Success
        </span>
      ),
      description: 'Succeeded',
      action: 'ok',
      duration: 2400,
    })
    props.onClose?.(false)
  }, [actionType, toast, props, setUserBalance, userBalance, amount])

  // misc
  const currentBalanceName = useMemo(
    () =>
      ({
        supply: 'Currently Supplying',
        borrow: 'Currently Borrowing',
      }[props.metaInfo?.type!]),
    [props.metaInfo?.type]
  )

  const currentBalanceAmount = useMemo(() => {
    if (props.metaInfo?.type === 'borrow') {
      return userBalance.borrowAmount
    } else if (props.metaInfo?.type === 'supply') {
      return userBalance.supplyAmount
    }
  }, [props.metaInfo?.type, userBalance])

  const negative = useMemo(() => (['Withdraw', 'Borrow'].includes(actionType) ? -1 : 1), [actionType])
  const previewBorrowLimitUsed = useMemo(() => (amount ? Number(amount) / 1000 : undefined), [amount])
  const previewBorrowLimit = useMemo(() => (amount ? amount : undefined), [amount])
  const previewCurrentBalance = useMemo(
    () => (amount ? BigNumber(userBalance.balance).minus(BigNumber(amount).times(negative)) : undefined),
    [amount, negative, userBalance.balance]
  )

  // color list
  const arrowClass = useMemo(() => {
    return props.metaInfo?.type === 'supply' ? 'text-$fi' : 'text-$purple'
  }, [props.metaInfo?.type])
  const primaryClass = useMemo(() => {
    return props.metaInfo?.type === 'supply' ? 'bg-$fi text-bg3 hover:bg-$fi' : 'bg-purple text-fg1 hover:bg-$purple'
  }, [props.metaInfo?.type])
  const tabClass = useMemo(() => {
    return props.metaInfo?.type === 'supply' ? '' : 'data-[state=active]:bg-$purple data-[state=active]:text-fg1'
  }, [props.metaInfo?.type])

  return (
    <Dialog open={props.visible} onOpenChange={props?.onClose}>
      <DialogContent className="sm:max-w-[440px] border-none">
        <DialogHeader>
          <DialogTitle>
            <div className="flex justify-between items-center pr-8">
              <span>{market?.tokenName}</span>
              <div>
                <Tabs defaultValue={tabList[0]} value={actionType} onValueChange={(e) => setActionType(e as 'Supply')}>
                  <TabsList className="grid w-full grid-cols-2 p-0 bg-bg1">
                    {tabList.map((item) => (
                      <TabsTrigger key={item} value={item} className={`h-9 ${tabClass}`}>
                        {item}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <div className="pt-4">
          <div className="flex justify-between items-center h-10 pr-3 bg-bg1 rounded">
            <Input
              className="h-full !border-none !shadow-[none] !outline-none !bg-transparent !text-lg"
              value={amount}
              onChange={(e) => {
                if (!/^\d*(?:.\d*)?$/.test(e.target.value)) {
                  return
                }
                setAmount(e.target.value.replace(/[^(\d|.)]/g, ''))
                setPercent(0)
              }}
            />
            <span className="text-lg">{market?.tokenSymbol}</span>
          </div>
          <div className="opacity-50 mt-2 mb-1 text-sm">
            {percentageName}: {formatAmount(availableAmount, 0)} {market?.tokenSymbol}
          </div>

          <div className="flex flex-row justify-between items-center text-center bg-bg1 rounded">
            {[25, 50, 75, 100].map((i) => (
              <div
                key={i}
                className={`select-none cursor-pointer flex-1 py-2 rounded ${percent === i ? primaryClass : ''}`}
                onClick={() => {
                  setPercent(i)
                  setAmount(BigNumber(i).div(100).times(availableAmount).toString())
                }}
              >
                {i}%
              </div>
            ))}
          </div>

          <div className="mt-4 px-2 border rounded text-sm">
            <Row
              title={`${props.metaInfo?.type.replace(/\w/, ($1) => $1.toUpperCase())} APY`}
              value={`0.12%`}
              arrowClass={arrowClass}
            />
            <Separator />
            <Row
              title="Wallet Balance"
              value={`${formatAmount(userBalance.balance, 0)} ${market?.tokenSymbol}`}
              previewValue={
                previewCurrentBalance !== undefined &&
                `${formatAmount(previewCurrentBalance, 0)} ${market?.tokenSymbol}`
              }
              arrowClass={arrowClass}
            />
            <Row
              title={currentBalanceName}
              value={`${formatAmount(currentBalanceAmount, 0)} ${market?.tokenSymbol}`}
              previewValue={
                previewCurrentBalance !== undefined &&
                `$${formatAmount(
                  BigNumber(currentBalanceAmount || 0).plus(amount ? BigNumber(amount).times(negative) : 0),
                  0
                )} ${market?.tokenSymbol}`
              }
              arrowClass={arrowClass}
            />
            <Separator />
            <Row
              title="Borrow Limit"
              value={`$${formatAmount(0)}`}
              previewValue={
                previewBorrowLimit !== undefined && `$${formatAmount(BigNumber(previewBorrowLimit).times(28000))}`
              }
              arrowClass={arrowClass}
            />
            <Row
              title="Borrow Limit Used"
              value={`${formatAmount(0)}%`}
              previewValue={previewBorrowLimitUsed !== undefined && `${formatAmount(previewBorrowLimitUsed)}%`}
              arrowClass={arrowClass}
            />
          </div>
        </div>
        <DialogFooter>
          <LoadingButton
            className={`w-full h-11 uppercase ${primaryClass}`}
            type="submit"
            loading={loading}
            disabled={!amount}
            onClick={submitHandler}
          >
            Supply
          </LoadingButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
