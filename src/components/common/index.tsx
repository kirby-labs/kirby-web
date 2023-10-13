import { ArrowRight } from 'lucide-react'

export function Row({
  title,
  value,
  previewValue,
  arrowClass,
}: {
  title: any
  value: any
  previewValue?: any
  arrowClass?: string
}) {
  return (
    <div className="flex flex-row justify-between items-center my-3">
      <div className="opacity-50">{title}</div>
      <div className="flex flex-row justify-center items-center">
        <div>{value}</div>
        {previewValue && previewValue !== value && (
          <>
            <ArrowRight size={15} className={`mx-4 ${arrowClass}`} style={{ paddingBottom: '1px' }} />
            {previewValue}
          </>
        )}
      </div>
    </div>
  )
}
