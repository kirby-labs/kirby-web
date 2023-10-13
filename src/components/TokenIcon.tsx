import { useEffect, useState } from 'react'

export const TokenIcon = (props: {
  symbol?: string
  style?: React.CSSProperties
  size?: number
  className?: string
}) => {
  const symbol = props.symbol
  const imgList = symbol
    ? [`/tokens/${symbol?.toLowerCase()}.png`, `/tokens/${symbol?.toLowerCase()}.svg`, `/tokens/default.svg`]
    : [`/tokens/default.svg`]
  const size = props.size || 24

  const [index, setIndex] = useState(0)
  useEffect(() => setIndex(0), [symbol])

  return (
    <img
      src={imgList[index]}
      alt={`${symbol} Icon`}
      className={`rounded-full ${props.className}`}
      style={{ height: size, width: size, ...props.style }}
      onError={() => setIndex(index + 1)}
    />
  )
}
