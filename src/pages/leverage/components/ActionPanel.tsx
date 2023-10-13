import { Loader } from '@/components/common/Loader'

export default function ActionPanel() {
  const [loading, setLoading] = useState(false)

  const errorMessage = useMemo(() => {
    return 'Insufficient Collateral'
  }, [])

  const onSubmit = useCallback(async () => {
    setLoading(true)
    console.log('123')
    setLoading(false)
  }, [setLoading])

  return (
    <Button
      size="lg"
      onClick={onSubmit}
      disabled={errorMessage !== undefined || loading}
      className={`w-full py-2 rounded text-lg mt-6 flex flex-row justify-center items-center bg-brand`}
    >
      {loading && <Loader />}
      {!!errorMessage ? errorMessage : 'Submit'}
    </Button>
  )
}
