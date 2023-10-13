const NoData: React.FC<JSX.IntrinsicElements['div'] & { desc?: string }> = (props) => (
  <div className={`flex-col-center gap-y-1 text-fg1 ${props.className}`}>
    <span className="flex w-5 h-5 i-mingcute:wind-fill"></span>
    <span className="text-sm">{props.desc || 'No Records'}</span>
  </div>
)

export { NoData }
