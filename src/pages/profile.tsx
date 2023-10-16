import { useWallet } from '@solana/wallet-adapter-react'
import { Spin } from 'antd'
import React from 'react'

import { FeedSource } from '@/components/user/FeedSource'
import { FeedSourceOnChain } from '@/components/user/FeedSourceOnChain'
import { ProfileCard } from '@/components/user/ProfileCard'
import { useUser } from '@/hooks/useUser'

export default function () {
  const { publicKey } = useWallet()
  const { user, feeds } = useUser(publicKey?.toString())

  if (!user) {
    return (
      <div className="max-w-6xl mx-auto flex flex-row items-center justify-center h-60">
        <Spin spinning={true} />
      </div>
    )
  }

  return (
    <div className="pb-8">
      <div className="max-w-6xl mx-auto flex flex-row items-start">
        <ProfileCard user={user} />
        <div className="flex-1 ml-10">
          <FeedSourceOnChain wallet={user.wallet} />
          {feeds?.map((i) => (
            <FeedSource key={i.xml} feed={i} />
          ))}
        </div>
      </div>
    </div>
  )
}
