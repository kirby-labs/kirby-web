import { NoData } from '@/components/common/NoData'

export const HistoryModal = (props: { visible: boolean; onClose?: (show: boolean) => void }) => {
  return (
    <div>
      <Dialog open={props.visible} onOpenChange={props?.onClose}>
        <DialogContent className="sm:max-w-[620px] border-none">
          <div className="flex flex-row justify-center items-center">
            <div className="font-bold text-xl">Transaction History</div>
          </div>
          <div className="grid grid-cols-12 font-600">
            <div className="col-span-3">Timestamp</div>
            <div className="col-span-3">Action</div>
            <div className="col-span-3">Token Changes</div>
          </div>
          <Separator />
          <div className="min-h-30">
            <NoData className="mt-10" />
          </div>
          <Separator />
        </DialogContent>
      </Dialog>
    </div>
  )
}
