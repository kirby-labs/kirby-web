import dayjs from 'dayjs'
import React from 'react'

export function FeedSourceOnChain({ wallet }: { wallet: string }) {
  return (
    <div className="px-10 mb-4 pt-5 pb-6 bg-white rounded shadow [&_a]:hover:underline">
      <div className="flex flex-row justify-between items-center mb-2">
        <div className="text-lg font-bold">Activities on Solana</div>
        <div className="text-text2 text-sm">Last Update: {dayjs().format('YYYY-MM-DD HH:mm')}</div>
      </div>
      <div className="text-text1 text-sm">
        All on-chain activities of wallet address <span className="text-primary">{wallet}</span>
      </div>
      <div className="text-text2 text-sm mt-2">
        <a
          className="underline"
          href={`https://solscan.io/account/${wallet}?cluster=devnet`}
          target={'_blank'}
        >{`https://solscan.io/account/${wallet}?cluster=devnet`}</a>
      </div>
    </div>
  )
}
